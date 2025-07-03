from django.urls import path
from accounts.views import RegisterView, ProtectedView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import StockPredictionAPIView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('protected-view/', ProtectedView.as_view()),

    # Prediction API
    path('predict/', StockPredictionAPIView.as_view(), name='stock_prediction')

]
