import { createSlice } from "@reduxjs/toolkit";
import { Word } from "../../types";
import HandlerData from "../../lib/HandlerData";

export interface MatchsState {
  current: Word;
  target: Word;
  match: boolean;
  score: number;
  data: Word[][];
  allData: Word[][];
  leng: number;
}

const initialState: MatchsState = {
  current: { word: "", id: 0 },
  target: { word: "", id: 0 },
  match: false,
  score: 0,
  data: [],
  allData: [],
  leng: 3,
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
      state.allData = action.payload;
      if (state.allData.length === 0) return state;

      const LENG = state.leng;

      // cut the data to LENG size
      const curr = HandlerData.cut(state.allData[0], LENG);
      const targ = HandlerData.cut(state.allData[1], LENG);

      // randomize the data
      const currRand = HandlerData.random(curr);
      const targRand = HandlerData.random(targ);

      state.data = [currRand, targRand];

      return state;
    },

    updateData: (state, action) => {
      const { data, current, allData, leng, target } = action.payload;

      if (data.length === 0 || allData.length === 0) return state;

      if (allData[0].length > leng) state.leng++;
      else return state;

      const curr = HandlerData.replace(data[0], current.id, allData[0][leng]);

      const targ = HandlerData.replace(data[1], target.id, allData[1][leng]);

      state.data = [curr, targ];
      return state;
    },
  },
});

export const { current, target, match, score, data, updateData } =
  matchsSlice.actions;
export default matchsSlice.reducer;
