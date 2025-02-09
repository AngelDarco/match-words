import { createSlice } from "@reduxjs/toolkit";
import HandlerData from "../../lib/HandlerData";
import { InitialState } from "../InitialState";
import type { InitialMatchState } from "../../types";

export const matchsSlice = createSlice({
  name: "matchWords",
  initialState: InitialState,
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
      else {
        state.lastData[current.id] = (state.lastData[current.id] || 0) + 1;
        state.lastData["length"] = (state.lastData["length"] || 0) + 1;
        return state;
      }

      const curr = HandlerData.replace(data[0], current.id, allData[0][leng]);

      const targ = HandlerData.replace(data[1], target.id, allData[1][leng]);

      state.data = [curr, targ];
      return state;
    },

    lastData: (state, action) => {
      type LastData = InitialMatchState["lastData"];

      const { id } = action.payload;
      const data: LastData = {};
      data[id] = (data[id] || 0) + 1;
      state.lastData = data;
      return state;
    },
  },
});

export const { current, target, match, score, data, updateData } =
  matchsSlice.actions;
export default matchsSlice.reducer;
