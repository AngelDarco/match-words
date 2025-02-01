import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { word, translation, match, score } from "../redux/slices/matchs";
import { useEffect } from "react";
import Card from "./Card";

export default function CardsContainer() {
  const words1 = ["Hello", "Bye", "Thanks"];
  const words2 = ["Hallo", "Tschus", "Hello"];

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.match);

  const HandlerMatchs = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target === event.currentTarget) return;
    const id = event.currentTarget.id;
    const words = target.innerText;

    // select the original words
    if (id === "lang") {
      // add and remove the word from the state, adding a green background
      if (words === state.word) dispatch(word(""));
      else dispatch(word(words));
    }
    // select the traduced words
    else {
      // add and remove the word from the state, adding a green background
      if (words === state.translation) dispatch(translation(""));
      else dispatch(translation(words));
    }
  };

  useEffect(() => {
    // check if the words match with his traduced word
    if (state.word && state.translation) {
      if (state.word === state.translation) dispatch(match(true));
      else dispatch(match(false));
    }

    // reset values
    let id: NodeJS.Timer;
    if (state.match !== undefined) {
      id = setTimeout(() => {
        dispatch(match(undefined));
        dispatch(word(""));
        dispatch(translation(""));

        if (state.match) dispatch(score(state.score + 1));
      }, 1000);
    }

    return () => clearTimeout(id);
  }, [dispatch, state]);

  return (
    <div className="max-w-lg border h-[500px] flex items-center justify-center">
      <section
        className="w-full h-full flex flex-col items-center justify-center gap-2 "
        id="lang"
        onClick={HandlerMatchs}
      >
        {words1.map((w, i) => (
          <Card
            key={i}
            card={w}
            state={state.word}
            match={w === state.word ? state.match : undefined}
          />
        ))}
      </section>
      <section
        className="w-full h-full flex flex-col items-center justify-center gap-2 "
        onClick={HandlerMatchs}
        id="targ"
      >
        {words2.map((w, i) => (
          <Card
            key={i}
            card={w}
            state={state.translation}
            match={w === state.translation ? state.match : undefined}
          />
        ))}
      </section>
    </div>
  );
}
