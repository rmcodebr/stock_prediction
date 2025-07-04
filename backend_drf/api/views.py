from django.shortcuts import render
from . serializers import StockPredictionSerilalizer
from rest_framework.views import APIView, Response, status

#
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from datetime import datetime
import os
from django.conf import settings

from .utils import save_plot


class StockPredictionAPIView(APIView):
  def post(self, request):
    serializer = StockPredictionSerilalizer(data=request.data)
    if serializer.is_valid():
      ticker = serializer._validated_data['ticker']

      #Fetch data from yfinance
      now = datetime.now()
      start = datetime(now.year - 10, now.month, now.day)
      end = now
      df = yf.download(ticker, start, end)
      # print(df)
      if df.empty:
        return Response({'error': 'No data found for the given ticket',
                         'status':status.HTTP_404_NOT_FOUND})
      df = df.reset_index()
      # print(df.columns)

      # Generate Basic Plot
      plt.switch_backend('AGG') # Save Image in Backend
      plt.figure(figsize=(12, 5))
      plt.plot(df.Close, label='Closing Price')
      plt.title(f'Closing price of {ticker}')
      plt.xlabel('Days')
      plt.ylabel('Price')
      plt.legend()
      # Save the plot to a file (created a utils file into api app)
      plot_img_path = f'{ticker}_plot.png'
      image_path = os.path.join(settings.MEDIA_ROOT, plot_img_path)
      plt.savefig(image_path)
      plt.close()
      plot_img = settings.MEDIA_URL + plot_img_path

      # 100 Days moving average
      ma100 = df.Close.rolling(100).mean()
      plt.switch_backend('AGG') # Save Image in Backend
      plt.figure(figsize=(12, 5))
      plt.plot(df.Close, label='Closing Price')
      plt.plot(ma100, 'r', label='100 DMA')
      plt.title(f'100 Days Moving Average of {ticker}')
      plt.xlabel('Days')
      plt.ylabel('Price')
      plt.legend()
      # Save the plot to a file
      plot_img_path = f'{ticker}_100_dma.png'
      plot_100_dma = save_plot(plot_img_path)


      # 200 Days moving average
      ma200 = df.Close.rolling(200).mean()
      plt.switch_backend('AGG') # Save Image in Backend
      plt.figure(figsize=(12, 5))
      plt.plot(df.Close, label='Closing Price')
      plt.plot(ma100, 'r', label='100 DMA')
      plt.plot(ma200, 'g', label='200 DMA')
      plt.title(f'200 Days Moving Average of {ticker}')
      plt.xlabel('Days')
      plt.ylabel('Price')
      plt.legend()
      # Save the plot to a file
      plot_img_path = f'{ticker}_200_dma.png'
      plot_200_dma = save_plot(plot_img_path)

      # Splitting data into Training & Tersting datasets
      data_training = pd.DataFrame(df.Close[0:int(len(df)*0.7)])
      data_testing = pd.DataFrame(df.Close[int(len(df)*0.7): int(len(df))])

      # Scaling down the data between 0 and 1
      from sklearn.preprocessing import MinMaxScaler      
      scaler = MinMaxScaler(feature_range=(0,1))
      
      # Load ML Model
      from keras.models import load_model
      model = load_model('stock_preditcion_model.keras')

      # Preparing Test Data
      past_100_days = data_training.tail(100)
      final_df = pd.concat([past_100_days, data_testing], ignore_index=True)

      input_data = scaler.fit_transform(final_df)

      x_test = []
      y_test = []
      for i in range(100, input_data.shape[0]):
        x_test.append(input_data[i-100: i]),
        y_test.append(input_data[i, 0])
      
      x_test, y_test = np.array(x_test), np.array(y_test)

      # Making Predictions
      y_predicted = model.predict(x_test)

      # Revert the scaled prices to original prices
      y_predicted = scaler.inverse_transform(y_predicted.reshape(-1, 1)).flatten()
      y_test = scaler.inverse_transform(y_test.reshape(-1, 1)).flatten()

      print('y_predicted ==> ', y_predicted)
      print('y_test ===> ', y_test)

      # Plot final prediction      
      plt.switch_backend('AGG') # Save Image in Backend
      plt.figure(figsize=(12, 5))
      plt.plot(y_test, label='Original Price')
      plt.plot(y_predicted, 'r', label='Predict Price')      
      plt.title(f'Final Prediction for {ticker}')
      plt.xlabel('Days')
      plt.ylabel('Price')
      plt.legend()
      # Save the plot to a file
      plot_img_path = f'{ticker}_final_prediction.png'
      plot_prediction = save_plot(plot_img_path)

      # Model Evaluation
      from sklearn.metrics import mean_squared_error, r2_score
      
      # Mean Squared Error (MSE)
      mse = mean_squared_error(y_test, y_predicted)
      
      # Root Mean Squared Error (RMSE)
      rmse = np.sqrt(mse)

      # R-Squared
      r2 = r2_score(y_test, y_predicted)

      print(mse)
      print(rmse)
      print(r2)



      return Response({
        'status': 'success',
        'plot_img': plot_img,
        'plot_100_dma': plot_100_dma,
        'plot_200_dma': plot_200_dma,
        'plot_prediction': plot_prediction,
        'mse': mse,
        'rmse': rmse,
        'r2': r2,
      })


