import ShuffledCard from "./ShuffledCard";

interface SingleCardProp {
  card: ShuffledCard;
  handleChoice: (card: ShuffledCard) => void;
  flipped: boolean;
  disabled: boolean;
}

export default SingleCardProp;
