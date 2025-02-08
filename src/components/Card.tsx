import { memo } from "react";
import type { Card } from "../types";

export default memo(function Card({ word, id, isSelected, match }: Card) {
  const handlerBackground = () => {
    if (isSelected && match === false) {
      return "bg-red-500";
    } else if (isSelected) {
      return "bg-green-500";
    }
  };

  return (
    <div
      className={`max-w-36 min-w-36 border rounded-lg p-2 flex align-center justify-center
      ${handlerBackground()}`}
      id={id}
    >
      {word}
    </div>
  );
});
