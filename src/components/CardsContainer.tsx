/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  current,
  target,
  match,
  score,
  data,
  updateData,
} from "../redux/slices/matchs";
import { useEffect, useRef } from "react";
import Card from "./Card";
import FetchData from "../lib/FetchData";
import { Data } from "../types";
import Debounce from "../lib/Debounce";

export default function CardsContainer() {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.matchWords);

  const dataRef = useRef<Data[]>([]);

  // get the data from the database
  useEffect(() => {
    if (state.data.length === 0)
      (async () => {
        const URL = "database";
        const db = new FetchData(URL);

        await db.getCurrentLanguage("en").then((curr) => {
          if (dataRef.current) {
            dataRef.current.push(curr);
          }
        });
        await db.getTargetLanguage("de").then((targ) => {
          if (dataRef.current) {
            dataRef.current.push(targ);
          }
        });

        const curr = dataRef.current[0].words;
        const targ = dataRef.current[1].words;

        dispatch(data([curr, targ]));
      })();
  }, [state.current.word, state.target.word]);

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

      // Increment the score and update the data
      const updateDataWithDelay = new Debounce();
      if (isMatch) {
        dispatch(score());
        updateDataWithDelay.execute(() =>
          dispatch(
            updateData({
              ...state,
            })
          )
        );
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
    if (state.lastData[id]) return (targetElement.style.pointerEvents = "none");

    const currentContainer = dataRef.current[0]?.lang === containerId;
    const targetContainer = dataRef.current[1]?.lang === containerId;

    // create or remove the current word state
    if (currentContainer)
      dispatch(
        current(
          innerText === state.current.word
            ? { word: "", id: 0 }
            : { word: innerText, id: +id }
        )
      );

    // create or remove the target word state
    if (targetContainer)
      dispatch(
        target(
          innerText === state.target.word
            ? { word: "", id: 0 }
            : { word: innerText, id: +id }
        )
      );
  };

  const currentWords = state.data[0] || [];
  const targetWords = state.data[1] || [];

  const gameOver =
    currentWords.length > 0 && state.lastData["length"] >= currentWords.length;

  return (
    <>
      {gameOver ? (
        <h1 className="text-3xl font-bold text-center">
          Game Over: {state.score}
        </h1>
      ) : (
        <div className="max-w-lg border h-[500px] flex items-center justify-center">
          <section
            className="w-full h-full flex flex-col items-center justify-center gap-2 "
            id={dataRef.current[0]?.lang}
            onClick={HandlerMatchs}
          >
            {currentWords.map(({ id, word }) => {
              const { word: currentWord } = state.current;
              return (
                <Card
                  key={id}
                  id={id + ""}
                  word={word}
                  isSelected={currentWord === word}
                  match={currentWord === word && state.match}
                  isActive={state.lastData[id]}
                />
              );
            })}
          </section>

          <section
            className="w-full h-full flex flex-col items-center justify-center gap-2 "
            onClick={HandlerMatchs}
            id={dataRef.current[1]?.lang}
          >
            {targetWords.map(({ id, word }) => {
              const { word: targetWord } = state.target;
              return (
                <Card
                  key={id}
                  id={id + ""}
                  word={word}
                  isSelected={targetWord === word}
                  match={targetWord === word && state.match}
                  isActive={state.lastData[id]}
                />
              );
            })}
          </section>
        </div>
      )}
    </>
  );
}
