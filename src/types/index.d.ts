export type Lang = "en" | "de";

export interface Data {
  lang: Lang;
  words: Array<{
    union_id: string;
    word: string;
  }>;
}
