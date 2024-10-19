import { configureStore } from "@reduxjs/toolkit";
import matchsReducer from "./slices/matchs";
export const store = configureStore({
  reducer: { match: matchsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
