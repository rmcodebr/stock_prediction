import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../../axiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [plot, setPlot] = useState("");
  const [ma100, setMA100] = useState("");
  const [ma200, setMA200] = useState("");
  const [prediciton, setPrediciton] = useState("");
  const [mse, setMSE] = useState("");
  const [rmse, setRMSE] = useState("");
  const [r2, setR2] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get("/protected-view/");
      } catch (error) {}
    };
    fetchProtectedData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/predict/", {
        ticker: ticker,
      });

      console.log(response);
      console.log(response.data);

      // Set Plots
      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
      const plotURL = `${backendRoot}${response.data.plot_img}`;
      const ma100Url = `${backendRoot}${response.data.plot_100_dma}`;
      const ma200Url = `${backendRoot}${response.data.plot_200_dma}`;
      const predictionUrl = `${backendRoot}${response.data.plot_prediction}`;
      setPlot(plotURL);
      setMA100(ma100Url);
      setMA200(ma200Url);
      setPrediciton(predictionUrl);
      setMSE(response.data.mse);
      setRMSE(response.data.rmse);
      setR2(response.data.r2);

      if (response.data.error) {
        setError(response.data.error);
      }
    } catch (error) {
      console.log("Error in ticker api request to predict", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6"
          action=""
        >
          <div className="">
            <input
              className="text-slate-900 bg-slate-100 placeholder:text-gray-500 placeholder:font-semibold
            rounded p-2"
              type="text"
              placeholder="Enter Stock Ticker"
              onChange={(e) => {
                setTicker(e.target.value);
                setError("");
              }}
              required
            />
            {error && (
              <div className="text-red-600 bg-slate-600 px-2 rounded mt-2">
                {error}
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 text-base rounded cursor-pointer hover:bg-blue-800 inline-block py-1 px-2 shadow-lg"
            >
              {isLoading ? (
                <span>
                  <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                  Please wait...
                </span>
              ) : (
                "See Prediction"
              )}
            </button>
          </div>
        </form>
      </div>
      {prediciton && (
        <div className="space-y-4 bg-slate-900 pb-20">
          {/* Print Prediction Plot */}
          <div className="">
            <div className="p-2">
              {plot && (
                <div className="">
                  <img className="rounded" src={plot} alt="" />
                </div>
              )}
            </div>
          </div>
          {/* Print 100 MA Plot */}
          <div className="">
            <div className="p-2">
              {ma100 && (
                <div className="">
                  <img className="rounded" src={ma100} alt="" />
                </div>
              )}
            </div>
          </div>
          {/* Print 200 MA Plot */}
          <div className="">
            <div className="p-2">
              {ma200 && (
                <div className="">
                  <img className="rounded" src={ma200} alt="" />
                </div>
              )}
            </div>
          </div>
          {/* Print Prediciton Plot */}
          <div className="">
            <div className="p-2">
              {prediciton && (
                <div className="">
                  <img className="rounded" src={prediciton} alt="" />
                </div>
              )}
            </div>
          </div>
          {/* MSE RMSE and R2 */}
          <div className="">
            <div className="p-2">
              <div className="">Model Evaluation</div>
              <p>Mean Squared Error (MSE): {mse}</p>
              <p>Root Mean Squared Error (RMSE): {rmse}</p>
              <p>R-Squared (R2): {r2}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
