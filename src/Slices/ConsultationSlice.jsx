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
    prix: Number(action.payload.prix) || 0,
  });
},

    deleteConsultation: (state, action) => {
      state.list = state.list.filter(c => c.id !== action.payload);
    },
    editCon: (state, action) =>{
          const index = state.list.findIndex(r => r.id === action.payload.id);
          if (index !== -1){
            state.list[index] = action.payload;
          }
        },
        updateConsultation: (state, action) => {
  const index = state.list.findIndex(
    (c) => c.id === action.payload.id
  );
  if (index !== -1) {
    state.list[index] = action.payload;
  }
},

  }
});
export const { addConsultation, deleteConsultation, updateConsultation } =
  consultationSlice.actions;

export default consultationSlice.reducer;
