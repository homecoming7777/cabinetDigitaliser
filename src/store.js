import { configureStore } from "@reduxjs/toolkit";

import patientsReducer from "./patientsSlice";
import rdvReducer from "./RdvSlice";
import consultationsReducer from "./ConsultationSlice";

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    rdv: rdvReducer,
    consultations: consultationsReducer,
  },
});
