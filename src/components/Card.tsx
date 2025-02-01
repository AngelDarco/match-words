interface Card extends React.PropsWithChildren {
  card: string;
  match: boolean | undefined;
  state: string;
}
export default function Card({ card, match, state }: Card) {
  return (
    <div
      className={`max-w-36 min-w-36 border rounded-lg p-2 flex align-center justify-center
      ${
        match
          ? "bg-green-500"
          : match === false
          ? "bg-red-500"
          : state === card
          ? "bg-green-500"
          : ""
      }
      `}
    >
      {card}
    </div>
  );
}
