import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: []
};

const consultationSlice = createSlice({
  name: "consultations",
  initialState,
  reducers: {
    addConsultation: (state, action) => {
  state.list.push({
    ...action.payload,
    id: Date.now(),
    prix: Number(action.payload.prix) || 0, // ensure it's a number
  });
},

    deleteConsultation: (state, action) => {
      state.list = state.list.filter(c => c.id !== action.payload);
    }
  }
});

export const { addConsultation, deleteConsultation } = consultationSlice.actions;
export default consultationSlice.reducer;
