import { createSlice } from "@reduxjs/toolkit";

const rdvSlice = createSlice({
  name: "rdv",
  initialState: {
    list: [],
  },
  reducers: {
    addRdv: (state, action) => {
      state.list.push(action.payload);
    },
    deleteRdv: (state, action) => {
      state.list = state.list.filter(r => r.id !== action.payload);
    }
  }
});

export const { addRdv, deleteRdv } = rdvSlice.actions;
export default rdvSlice.reducer;