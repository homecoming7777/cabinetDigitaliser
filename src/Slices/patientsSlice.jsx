import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 1, nom: "Ahmed", prenom: "Ali", dateNaissance: "1990-05-15", telephone: "0612345678", email: "ahmed@example.com", groupeSanguin: "A+", createdAt: "2025-12-01" },
  { id: 2, nom: "Sara", prenom: "Hassan", dateNaissance: "1985-08-20", telephone: "0623456789", email: "sara@example.com", groupeSanguin: "O-", createdAt: "2025-12-05" },
  { id: 3, nom: "Mohamed", prenom: "Karim", dateNaissance: "2000-03-10", telephone: "0634567890", email: "mohamed@example.com", groupeSanguin: "B+", createdAt: "2025-12-10" },
  { id: 4, nom: "Fatima", prenom: "Youssef", dateNaissance: "1975-11-30", telephone: "0645678901", email: "fatima@example.com", groupeSanguin: "AB+", createdAt: "2025-12-15" },
  { id: 5, nom: "Yassine", prenom: "Nabil", dateNaissance: "1995-07-25", telephone: "0656789012", email: "yassine@example.com", groupeSanguin: "O+", createdAt: "2025-12-20" },

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
    deletePatient: (state, action) => state.filter(p => p.id !== action.payload),
  },
});

export const { addPatient, updatePatient, deletePatient } = patientsSlice.actions;
export default patientsSlice.reducer;
