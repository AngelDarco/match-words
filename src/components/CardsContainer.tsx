import { RootState } from "../redux/store";
import Card from "./Card";
import { useDispatch, useSelector } from "react-redux";
import { word, translation } from "../redux/slices/matchs";
import { useEffect } from "react";

export default function CardsContainer() {
  const words1 = ["Hello", "Bye", "Thanks"];
  const words2 = ["Hallo", "Tschus", "Danke"];

  const state = useSelector((state: RootState) => state.match);
  const dispatch = useDispatch();

  const handlerMatchs = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target === event.currentTarget) return;
    const id = event.currentTarget.id;
    const words = target.innerText;

    if (id === "lang") {
      dispatch(word(words));
    } else dispatch(translation(words));
  };

  useEffect(() => {
    console.log("rendering ...", state);
  }, [state]);

  return (
    <div className="max-w-lg border h-[500px] flex items-center justify-center">
      <section
        className="w-full h-full flex flex-col items-center justify-center gap-2 hover:[&>div]:bg-slate-800 "
        id="lang"
        onClick={handlerMatchs}
      >
        {words1.map((w, i) => (
          <Card key={i} card={w} match={undefined} />
        ))}
      </section>
      <section
        className="w-full h-full flex flex-col items-center justify-center gap-2 hover:[&>div]:bg-slate-800"
        onClick={handlerMatchs}
        id="targ"
      >
        {words2.map((w, i) => (
          <Card key={i} card={w} match={undefined} />
        ))}
      </section>
    </div>
  );
}
