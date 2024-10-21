import Card from "./Card";

export default function CardsContainer() {
  const words1 = ["Hello", "Bye", "Thanks"];
  const words2 = ["Hallo", "Tschus", "Danke"];

  const handlerMatchs = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target === event.currentTarget) return;
    const words = (event.target as HTMLElement).innerText;
    console.log(words);
  };

  return (
    <div className="max-w-lg border h-[500px] flex items-center justify-center">
      <section
        className="w-full h-full flex flex-col items-center justify-center gap-2 hover:[&>div]:bg-slate-800 "
        onClick={handlerMatchs}
      >
        {words1.map((w, i) => (
          <Card key={i} card={w} match={undefined} />
        ))}
      </section>
      <section
        className="w-full h-full flex flex-col items-center justify-center gap-2 hover:[&>div]:bg-slate-800"
        onClick={handlerMatchs}
      >
        {words2.map((w, i) => (
          <Card key={i} card={w} match={undefined} />
        ))}
      </section>
    </div>
  );
}
