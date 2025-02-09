import { InitialMatchState } from "../types";

export const InitialState: InitialMatchState = {
  current: { word: "", id: 0 },
  target: { word: "", id: 0 },
  match: false,
  score: 0,
  data: [],
  allData: [],
  lastData: {},
  leng: 3,
};
