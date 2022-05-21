import "./App.css";

import React, { useEffect, useState } from "react";

import Card from "./types/Card";
import Choice from "./types/Choice";
import cardImages from "./common/cardImages";
import ShuffledCard from "./types/ShuffledCard";
import SingleCard from "./components/SingleCard";

const App = (): JSX.Element => {
  const [turns, setTurns] = useState<number>(0);
  const [cards, setCards] = useState<ShuffledCard[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [choiceOne, setChoiceOne] = useState<Choice>(null);
  const [choiceTwo, setChoiceTwo] = useState<Choice>(null);

  //shuffle the cards
  const shuffleCards = (): void => {
    const shuffledCards: ShuffledCard[] = [...cardImages, ...cardImages]
      .sort((): number => Math.random() - 0.5)
      .map(
        (card: Card): ShuffledCard => ({
          ...card,
          id: Math.random()
        })
      );

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle the click event
  const handleChoice = (card: ShuffledCard): void => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //compare the two cards
  useEffect((): void => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards: ShuffledCard[]): ShuffledCard[] => {
          return prevCards.map((card: ShuffledCard): ShuffledCard => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            }
            return card;
          });
        });

        resetTurn();
      } else {
        setTimeout((): void => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  //reset the turns
  const resetTurn = (): void => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns: number): number => prevTurns + 1);
    setDisabled(false);
  };

  //start the game automatically
  useEffect((): void => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>Card Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(
          (card: ShuffledCard): JSX.Element => (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          )
        )}
      </div>

      <p>Turns: {turns}</p>
    </div>
  );
};

export default App;
