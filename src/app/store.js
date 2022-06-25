import { configureStore } from "@reduxjs/toolkit";
import quoteMachineReducer from "../features/QuoteMachine/quoteMachineSlice";

export const store = configureStore({
  reducer: {
    quoteMachine: quoteMachineReducer,
  },
});
