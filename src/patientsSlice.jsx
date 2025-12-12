import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    nom: "Dupont",
    prenom: "Jean",
    dateNaissance: "1985-03-25",
    telephone: "0612345678",
    adresse: "12 rue de Paris, 75001 Paris",
    email: "jean.dupont@example.com",
    groupeSanguin: "A+",
    allergies: "Penicilline",
  },
  {
    id: 2,
    nom: "Martin",
    prenom: "Claire",
    dateNaissance: "1992-11-15",
    telephone: "0698765432",
    adresse: "34 avenue Lyon, 69000 Lyon",
    email: "claire.martin@example.com",
    groupeSanguin: "O-",
    allergies: "Aucune",
  },
];

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
