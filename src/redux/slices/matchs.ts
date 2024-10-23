import { createSlice } from "@reduxjs/toolkit";

export interface MatchsState {
  word: string;
  translation: string;
  match: boolean;
  score: number;
}

const initialState: MatchsState = {
  word: "",
  translation: "",
  match: false,
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
    match: (state, action) => {
      state.match = action.payload;
      return state;
    },
    score: (state, action) => {
      state.score = action.payload;
      return state;
    },
  },
});

export const { word, translation, match, score } = matchsSlice.actions;
export default matchsSlice.reducer;
