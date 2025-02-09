/**
 * Language type: the abreviation of the language
 * @param en english
 * @param de german
 */
export type Lang = "en" | "de";

/**
 * Word interface
 * @param id a number that represent the id of the word
 * @param word a string that represent the word value
 */
export type Word = {
  id: number;
  word: string;
};

/**
 * Data interface
 * @param lang type {@link Lang} that represent the current user language abreviation
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
  isActive?: number | undefined;
}

/**
 * @param current the current word values
 * @param target the target word values
 * @param match true if the words are a match, false otherwise
 * @param score the score of the game
 * @param data the data of the game showed in the ux
 * @param allData all data of the game to be used in the game
 * @param lastData the last data to be used before end the game
 * @param leng the index used to retrieve words from {@link allData} and replace them in {@link data}
 */
export interface InitialMatchState {
  current: Word;
  target: Word;
  match: boolean;
  score: number;
  data: Word[][];
  allData: Word[][];
  lastData: { [key: string]: number };
  leng: number;
}
