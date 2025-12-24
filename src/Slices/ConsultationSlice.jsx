import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [
    { id: 1, date: "2025-12-01", patient: 1, type: "Consultation", diagnostic: "Flu", prix: 200, modePaiement: "Cash", ordonnance: "Paracetamol" },
  { id: 2, date: "2025-12-02", patient: 2, type: "Contrôle", diagnostic: "Checkup", prix: 150, modePaiement: "Card" },
  { id: 3, date: "2025-12-03", patient: 3, type: "Certificat", diagnostic: "Fit to work", prix: 100, modePaiement: "Cash" },
  { id: 4, date: "2025-12-04", patient: 1, type: "Consultation", diagnostic: "Cold", prix: 200, modePaiement: "Cash", ordonnance: "Vitamin C" },
  { id: 5, date: "2025-12-05", patient: 4, type: "Consultation", diagnostic: "Headache", prix: 180, modePaiement: "Card" },
  { id: 6, date: "2025-12-06", patient: 5, type: "Vaccination", diagnostic: "Flu shot", prix: 120, modePaiement: "Cash" },
  { id: 7, date: "2025-12-07", patient: 2, type: "Contrôle", diagnostic: "Blood Pressure", prix: 150, modePaiement: "Card" },

  ]
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
