/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { current, target, match, score } from "../redux/slices/matchs";
import { useEffect, useRef, useState } from "react";
import Card from "./Card";
import getData from "../lib/getData";
import { Data, Word } from "../types";
import Debounce from "../lib/Debounce";

export default function CardsContainer() {
  const [data, setData] = useState<Word[][]>([]);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.matchWords);

  const dataRef = useRef<Data[]>([]);

  // get the data from the database
  useEffect(() => {
    if (data.length === 0)
      (async () => {
        const URL = "database";
        const data = new getData(URL);

        await data.getCurrentLanguage("en").then((curr) => {
          if (dataRef.current) {
            dataRef.current.push(curr);
          }
        });
        await data.getTargetLanguage("de").then((targ) => {
          if (dataRef.current) {
            dataRef.current.push(targ);
          }
        });

        setData(() => {
          const curr = dataRef.current[0].words;
          const targ = dataRef.current[1].words;
          return [curr, targ];
        });
      })();
  }, [state.current.word, state.target.word]);

  useEffect(() => {
    // reset match state after 1 second every time a match is found
    const resetMatch = new Debounce();
    if (state.match !== undefined)
      resetMatch.execute(() => dispatch(match(undefined)));
  }, [state.match]);

  useEffect(() => {
    // check if the words match with his traduced word
    if (state.current.word && state.target.word) {
      const isMatch = state.current.id === state.target.id;

      // Set the match state
      dispatch(match(isMatch));

      // Increment the score
      if (isMatch) {
        dispatch(score());
      }

      // reset values
      const resetTarget = new Debounce();
      const resetCurrent = new Debounce();
      resetTarget.execute(() => dispatch(target({ word: "", id: 0 })));
      resetCurrent.execute(() => dispatch(current({ word: "", id: 0 })));
    }
  }, [state.current.word, state.target.word]);

  const HandlerMatchs = (event: React.MouseEvent<HTMLElement>) => {
    const targetElement = event.target as HTMLElement;
    if (targetElement === event.currentTarget) return;

    const { id, innerText } = targetElement;
    const containerId = targetElement.parentElement?.id;

    if (!id || !containerId) return;

    const currentContainer = dataRef.current[0]?.lang === containerId;
    const targetContainer = dataRef.current[1]?.lang === containerId;

    // create or remove the current word state
    if (currentContainer)
      dispatch(
        current(
          innerText === state.current.word
            ? { word: "", id: 0 }
            : { word: innerText, id }
        )
      );

    // create or remove the target word state
    if (targetContainer)
      dispatch(
        target(
          innerText === state.target.word
            ? { word: "", id: 0 }
            : { word: innerText, id }
        )
      );
  };

  const currentWords = data[0] || [];
  const targetWords = data[1] || [];

  return (
    <div className="max-w-lg border h-[500px] flex items-center justify-center">
      <section
        className="w-full h-full flex flex-col items-center justify-center gap-2 "
        id={dataRef.current[0]?.lang}
        onClick={HandlerMatchs}
      >
        {currentWords.map(({ id, word }) => (
          <Card
            key={id}
            id={id + ""}
            word={word}
            isSelected={state.current.word === word}
            match={state.current.word === word && state.match}
          />
        ))}
      </section>

      <section
        className="w-full h-full flex flex-col items-center justify-center gap-2 "
        onClick={HandlerMatchs}
        id={dataRef.current[1]?.lang}
      >
        {targetWords.map(({ id, word }) => (
          <Card
            key={id}
            id={id + ""}
            word={word}
            isSelected={state.target.word === word}
            match={state.target.word === word && state.match}
          />
        ))}
      </section>
    </div>
  );
}
