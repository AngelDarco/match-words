// import { useState } from "react";
import Card from "./Card";

export default function CardsContainer() {
  const words1 = ["Hello", "Bye", "Thanks"];
  const words2 = ["Hallo", "Tschus", "Danke"];
  // const [match, setMatch] = useState<boolean>();

  // useEffect(() => {
  //   if (match === undefined) return;
  //   const id = setTimeout(() => {
  //     setMatch(undefined);
  //   }, 1000);
  //   return () => clearTimeout(id);
  // }, [match]);

  return (
    <div className="max-w-lg border h-[500px] flex items-center justify-center">
      <section className="w-full h-full flex flex-col items-center justify-center gap-2 hover:[&>div]:bg-slate-800 ">
        {words1.map((w, i) => (
          <Card key={i} card={w} match={undefined} />
        ))}
      </section>
      <section className="w-full h-full flex flex-col items-center justify-center gap-2 hover:[&>div]:bg-slate-800">
        {words2.map((w, i) => (
          <Card key={i} card={w} match={undefined} />
        ))}
      </section>
    </div>
  );
}
