/**
 * Language type: the abreviation of the language
 * @param en english
 * @param de german
 */
export type Lang = "en" | "de";

/**
 * Word interface
 * @param union_id the union id of the word
 * @param word the word value
 */
export type Word = {
  union_id: number;
  word: string;
};

/**
 * Data interface
 * @param lang the current user language abreviation
 * @param words an array of type Word {@link Word}
 */
export interface Data {
  lang: Lang;
  words: Word[];
}

/**
 * Card interface
 * @param word the word value
 * @param match true if the word is a match, false otherwise
 * @param isSelected true if the card is selected, false otherwise
 * @param id the id of the card
 */
interface Card extends React.PropsWithChildren {
  word: string;
  match: boolean;
  isSelected: boolean;
  id: string;
}
