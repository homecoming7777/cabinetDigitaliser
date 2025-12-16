import { createSlice } from "@reduxjs/toolkit";

const consultationSlice = createSlice({
  name: "consultations",
  initialState: {
    list: [],
  },
  reducers: {
    addConsultation: (state, action) => {
      state.list.push(action.payload);
    },
    deleteConsultation: (state, action) => {
      state.list = state.list.filter(c => c.id !== action.payload);
    }
  }
});

export const { addConsultation, deleteConsultation } = consultationSlice.actions;
export default consultationSlice.reducer;