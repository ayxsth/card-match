import "./SingleCard.css";

import React from "react";

import SingleCardProp from "../types/SingleCardProp";

const SingleCard = ({
  card,
  handleChoice,
  flipped,
  disabled
}: SingleCardProp): JSX.Element => {
  const handleClick = () => {
    handleChoice(card);
  };

  return (
    <div>
      <div className="card">
        <div className={`card-wrapper ${flipped ? "flipped" : ""}`}>
          <img className="front" src={card.src} alt="card front" />
          <img
            className="back"
            src="./img/cover.png"
            onClick={() => {
              !disabled && handleClick();
            }}
            alt="card back"
          />
        </div>
      </div>
    </div>
  );
};

export default SingleCard;
