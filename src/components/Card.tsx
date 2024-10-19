import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { word, translation } from "../redux/slices/matchs";

interface Card extends React.PropsWithChildren {
  card: string;
  match?: boolean;
}
export default function Card({ card, match }: Card) {
  const matchs = useSelector((state: RootState) => state.match);
  const dispatch = useDispatch();

  const handlerMatches = (e: any) => {
    const words = e.target.innerHTML;
    if (matchs.word === "") {
      dispatch(word(words));
    } else dispatch(translation(words));
  };

  return (
    <div
      className={`max-w-36 min-w-36 border rounded-lg p-2 flex align-center justify-center ${
        match ? "bg-green-800" : match === false ? "bg-red-800" : ""
      }`}
      onClick={handlerMatches}
    >
      {card}{" "}
    </div>
  );
}
