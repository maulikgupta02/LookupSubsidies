import React from "react";

const Predictioncardmini = ({ prediction }) => {
  return (
    <div className="bg-white rounded-lg m-2 p-2 shadow-md text-black">
      <div className="text-[2.8vh]"><span className="font-bold">Stock Info: </span>{prediction.stockInfo}</div>
      <div className="text-[2vh]"><span className="font-bold">Date: </span>{prediction.date}</div>
      <div className="text-[2vh]"><span className="font-bold">Target Value: </span>{prediction.targetValue}</div>
      <div className="text-[2vh]"><span className="font-bold">Advice: </span>{prediction.advice}</div>
    </div>
  );
};

export default Predictioncardmini;
