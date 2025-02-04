export type Lang = "en" | "de";

export type Word = Array<{
  union_id: string;
  word: string;
}>;

// data retrieved from the database
export interface Data {
  lang: Lang;
  words: Word;
}

// card props
interface Card extends React.PropsWithChildren {
  word: string;
  match: boolean;
  isSelected: boolean;
  id: string;
}
