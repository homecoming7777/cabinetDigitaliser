import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list:[
    { id: 1, date: "2025-12-10", heure: "09:00", patientId: 1, motif: "Consultation", statut: "En attente" },
  { id: 2, date: "2025-12-11", heure: "11:00", patientId: 2, motif: "Contrôle", statut: "Confirmé" },
  { id: 3, date: "2025-12-12", heure: "14:00", patientId: 3, motif: "Certificat", statut: "Annulé" },
  { id: 4, date: "2025-12-13", heure: "10:00", patientId: 4, motif: "Consultation", statut: "Honoré" },
  { id: 5, date: "2025-12-14", heure: "16:00", patientId: 5, motif: "Vaccination", statut: "En attente" },

  ]
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