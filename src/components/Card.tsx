interface Card extends React.PropsWithChildren {
  card: string;
  match: boolean | undefined;
}
export default function Card({ card, match }: Card) {
  const HandlerMatchs = (event: React.MouseEvent<HTMLElement>) => {
    if (match === undefined) {
      const target = event.target as HTMLElement;
      target.classList.toggle("bg-green-500");
    }
  };
  return (
    <div
      className={`max-w-36 min-w-36 border rounded-lg p-2 flex align-center justify-center
      ${match ? "bg-green-500" : match === false ? "bg-red-500" : ""}
      `}
      onClick={HandlerMatchs}
    >
      {card}
    </div>
  );
}
