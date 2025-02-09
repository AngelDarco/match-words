import { memo } from "react";
import type { Card } from "../types";

export default memo(function Card({
  word,
  id,
  isSelected,
  match,
  isActive = undefined,
}: Card) {
  const handlerBackground = () => {
    if (isActive) return "";
    if (isSelected && match === false) {
      return "bg-red-500";
    } else if (isSelected) {
      return "bg-green-500";
    }
    return "";
  };

  return (
    <div
      className={`max-w-36 min-w-36 border rounded-lg p-2 flex align-center justify-center ease-in-out delay-200 cursor-pointer ${
        isActive
          ? "opacity-50 cursor-default"
          : isSelected
          ? ""
          : "hover:bg-gray-500/20"
      } ${handlerBackground()}`}
      id={id}
    >
      {word}
    </div>
  );
});
