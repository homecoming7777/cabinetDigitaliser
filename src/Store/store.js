import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "../Slices/patientsSlice";
import rdvReducer from "../Slices/RdvSlice";
import consultationsReducer from "../Slices/ConsultationSlice";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    rdv: rdvReducer,
    consultations: consultationsReducer,
  },
});
