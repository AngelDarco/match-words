import { createSlice } from "@reduxjs/toolkit";

type Word = { word: string; id: number };

export interface MatchsState {
  current: Word;
  target: Word;
  match: boolean;
  score: number;
}

const initialState: MatchsState = {
  current: { word: "", id: 0 },
  target: { word: "", id: 0 },
  match: false,
  score: 0,
};

export const matchsSlice = createSlice({
  name: "matchWords",
  initialState,
  reducers: {
    current: (state, action) => {
      state.current = action.payload;
      return state;
    },
    target: (state, action) => {
      state.target = action.payload;
      return state;
    },
    match: (state, action) => {
      state.match = action.payload;
      return state;
    },
    score: (state) => {
      state.score++;
      return state;
    },
  },
});

export const { current, target, match, score } = matchsSlice.actions;
export default matchsSlice.reducer;
