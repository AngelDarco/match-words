import { createSlice } from "@reduxjs/toolkit";
import { Word } from "../../types";

export interface MatchsState {
  current: Word;
  target: Word;
  match: boolean;
  score: number;
  data: Word[][];
}

const initialState: MatchsState = {
  current: { word: "", id: 0 },
  target: { word: "", id: 0 },
  match: false,
  score: 0,
  data: [],
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

    data: (state, action) => {
      state.data = action.payload;
      return state;
    },

    updateData: (state, action) => {
      const currId = action.payload.current.id;
      const targId = action.payload.target.id;

      if (state.data.length === 0) return state;

      const currData = action.payload.data[0].filter(
        (word: { id: number }) => word.id !== currId
      );
      const targData = action.payload.data[1].filter(
        (word: { id: number }) => word.id !== targId
      );

      state.data = [currData, targData];
      return state;
    },
  },
});

export const { current, target, match, score, data, updateData } =
  matchsSlice.actions;
export default matchsSlice.reducer;
