import React, { useState } from "react";

const Main = () => {
  const [language, setLanguage] = useState("pt");

  const text = {
    en: `This stock prediction application utilizes machine learning techniques, 
    specifically employing Keras, and LSTM model, integrated within the Django framework. 
    It forecasts future stock prices by analyzing 100-day and 200-day moving averages, 
    essential indicators widely used by stock analysts to inform trading and investment decisions.`,

    pt: `Este aplicativo de previsão de ações utiliza técnicas de aprendizado de máquina, 
    empregando especificamente Keras e o modelo LSTM, integrado ao framework Django. 
    Ele prevê preços futuros de ações analisando médias móveis de 100 e 200 dias, 
    indicadores essenciais amplamente utilizados por analistas de ações para orientar 
    decisões de negociação e investimento.`,
  };

  return (
    <>
      <div className="p-3">
        <div className="p-3 text-justify bg-gray-800 rounded">
          <h1 className="text-light text-center mb-2">Stock Prediction App</h1>
          <p className="">{language === "pt" ? text.pt : text.en}</p>
          <div className="flex justify-center">
            <button
              onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
              className="bg-blue-500 hover:bg-blue-700 font-semibold px-4 rounded"
            >
              {language === "pt" ? "English" : "Português"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
