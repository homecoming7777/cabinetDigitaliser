import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "./patientsSlice";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
  },
});
