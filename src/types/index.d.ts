export type Lang = "en" | "de";

// data retrieved from the database
export interface Data {
  lang: Lang;
  words: Array<{
    union_id: string;
    word: string;
  }>;
}

// card props
interface Card extends React.PropsWithChildren {
  word: string;
  match: boolean;
  isSelected: boolean;
  id: string;
}
