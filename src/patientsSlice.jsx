import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    addPatient: (state, action) => {
      state.push({ ...action.payload, id: Date.now() });
    },
    updatePatient: (state, action) => {
      const index = state.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
    deletePatient: (state, action) => {
      return state.filter(p => p.id !== action.payload);
    },
  },
});

export const { addPatient, updatePatient, deletePatient } = patientsSlice.actions;
export default patientsSlice.reducer;
