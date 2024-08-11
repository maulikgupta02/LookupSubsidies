import React, { useState } from "react";
import "./Predictioncard.css";
import { CSSTransition } from "react-transition-group";
import Predictioncardmini from "../PredictionCardMini/Predictioncardmini";

const Predictioncard = ({ item }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleArrowClick = () => {
    setIsCardOpen(!isCardOpen);
  };

  return (
    <div className="custom-scroll bg-zinc-700 text-white rounded-lg mt-2 mb-4 ml-2 mr-2 p-3 shadow-white shadow-lg">
      <div className="top flex">
        <div className="left w-1/2">
          <div className="text-[6vh]">{item.name}</div>
          <div className="text-[3vh]">Credibility Score: {item.credibilityScore.toFixed(2)}</div>
        </div>
        <div className="right w-1/2 p-5">
          <div className="text-[2vh]">{item.description}</div>
        </div>
      </div>
      <div className="bottom flex justify-center items-center">
        <img
          src={isCardOpen ? "uparrow.png" : "arrow.png"}
          alt="arrow"
          className="w-[30px]"
          onClick={handleArrowClick}
        />
      </div>
      <CSSTransition
        in={isCardOpen}
        timeout={300}
        classNames="card-transition"
        unmountOnExit
      >
        <div>
          {item.predictions.map((prediction, index) => (
            <Predictioncardmini key={index} prediction={prediction} />
          ))}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Predictioncard;
