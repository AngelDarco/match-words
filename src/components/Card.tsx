interface Card extends React.PropsWithChildren {
  card: string;
  match?: boolean;
}
export default function Card({ card, match }: Card) {
  return (
    <div
      className={`max-w-36 min-w-36 border rounded-lg p-2 flex align-center justify-center ${
        match ? "bg-green-800" : match === false ? "bg-red-800" : ""
      }`}
    >
      {card}{" "}
    </div>
  );
}
