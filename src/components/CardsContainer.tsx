/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { current, target, match, score } from "../redux/slices/matchs";
import { useEffect, useState } from "react";
import Card from "./Card";
import getData from "../lib/getData";
import { Data } from "../types";
import Debounce from "../lib/Debounce";

export default function CardsContainer() {
  const [data, setData] = useState<Data[]>([]);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.matchWords);

  // get the data from the database
  useEffect(() => {
    (async () => {
      const URL = "database";
      const data = new getData(URL);

      const curr = await data.getCurrentLanguage("en");
      const targ = await data.getTargetLanguage("de");

      if (!curr || !targ) return;
      setData([curr, targ]);
    })();
  }, []);

  // reset match state after 1 second every time a match is found
  useEffect(() => {
    const resetMatch = new Debounce();
    if (state.match !== undefined)
      resetMatch.execute(() => dispatch(match(undefined)));
  }, [state.match]);

  // check if the words match with his traduced word
  useEffect(() => {
    if (state.current.word && state.target.word) {
      const isMatch = state.current.id === state.target.id;

      // Set the match state
      dispatch(match(isMatch));

      // Increment the score
      if (isMatch) dispatch(score());

      // reset values
      const resetTarget = new Debounce();
      const resetCurrent = new Debounce();
      resetTarget.execute(() => dispatch(target({ word: "", id: "" })));
      resetCurrent.execute(() => dispatch(current({ word: "", id: "" })));
    }
  }, [state.current.word, state.target.word]);

  const HandlerMatchs = (event: React.MouseEvent<HTMLElement>) => {
    const targetElement = event.target as HTMLElement;
    if (targetElement === event.currentTarget) return;

    const { id, innerText } = targetElement;
    const containerId = targetElement.parentElement?.id;

    if (!id || !containerId) return;

    const currentContainer = data[0]?.lang === containerId;
    const targetContainer = data[1]?.lang === containerId;

    // create or remove the current word state
    if (currentContainer)
      dispatch(
        current(
          innerText === state.current.word
            ? { word: "", id: "" }
            : { word: innerText, id }
        )
      );

    // create or remove the target word state
    if (targetContainer)
      dispatch(
        target(
          innerText === state.target.word
            ? { word: "", id: "" }
            : { word: innerText, id }
        )
      );
  };

  const currentWords = data[0]?.words || [];
  const targetWords = data[1]?.words || [];

  return (
    <div className="max-w-lg border h-[500px] flex items-center justify-center">
      <section
        className="w-full h-full flex flex-col items-center justify-center gap-2 "
        id={data[0]?.lang}
        onClick={HandlerMatchs}
      >
        {currentWords.map(({ union_id, word }) => (
          <Card
            key={union_id}
            id={union_id}
            word={word}
            isSelected={state.current.word === word}
            match={state.current.word === word && state.match}
          />
        ))}
      </section>

      <section
        className="w-full h-full flex flex-col items-center justify-center gap-2 "
        onClick={HandlerMatchs}
        id={data[1]?.lang}
      >
        {targetWords.map(({ union_id, word }) => (
          <Card
            key={union_id}
            id={union_id}
            word={word}
            isSelected={state.target.word === word}
            match={state.target.word === word && state.match}
          />
        ))}
      </section>
    </div>
  );
}
