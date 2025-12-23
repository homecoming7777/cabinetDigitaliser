import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list:[]
};

const rdvSlice = createSlice({
  name: "rdv",
  initialState,
  reducers: {
    addRdv: (state, action) => {
      state.list.push({ ...action.payload, id: Date.now() });
    },
    deleteRdv: (state, action) => {
      state.list = state.list.filter(r => r.id !== action.payload);
    },
    editRdv: (state, action) =>{
      const index = state.list.findIndex(r => r.id === action.payload.id);
      if (index !== -1){
        state.list[index] = action.payload;
      }
    }
  }
});

export const { addRdv, deleteRdv, editRdv } = rdvSlice.actions;
export default rdvSlice.reducer;