import { createSlice } from "@reduxjs/toolkit";

export interface MatchsState {
  word: string;
  translation: string;
  match: boolean | undefined;
  score: number;
}

const initialState: MatchsState = {
  word: "",
  translation: "",
  match: undefined,
  score: 0,
};

export const matchsSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    word: (state, action) => {
      state.word = action.payload;
      return state;
    },
    translation: (state, action) => {
      state.translation = action.payload;
      return state;
    },
    match: (state) => {
      return state;
    },
    score: (state) => {
      return state;
    },
  },
});

export const { word, translation, match, score } = matchsSlice.actions;
export default matchsSlice.reducer;
