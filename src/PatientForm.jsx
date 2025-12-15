import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPatient, updatePatient } from "./patientsSlice";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function PatientForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const editId = params.get("id");

  const existingPatient = useSelector(state =>
    state.patients.find(p => p.id === parseInt(editId))
  );

  const [patient, setPatient] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    telephone: "",
    adresse: "",
    email: "",
    groupeSanguin: "",
    allergies: "",
  });

  useEffect(() => {
    if (existingPatient) setPatient(existingPatient);
  }, [existingPatient]);

  const handleChange = e => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (existingPatient) {
      dispatch(updatePatient(patient));
    } else {
      dispatch(addPatient(patient));
    }
    navigate("/patients");
  };

  return (
    <>
    <Navbar />
    <form onSubmit={handleSubmit}>
      <input pattern="^[A-Za-z]+$" name="nom" placeholder="Nom"  value={patient.nom} onChange={handleChange} required />
      <input pattern="^[A-Za-z]+$" name="prenom" placeholder="Prénom" value={patient.prenom} onChange={handleChange} required />
      <input type="date" name="dateNaissance" value={patient.dateNaissance} onChange={handleChange} required />
      <input pattern="^[0-9]+$" name="telephone" placeholder="Téléphone" value={patient.telephone} onChange={handleChange} />
      <input name="adresse" placeholder="Adresse" value={patient.adresse} onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" value={patient.email} onChange={handleChange} />
      <input name="groupeSanguin" placeholder="Groupe sanguin" value={patient.groupeSanguin} onChange={handleChange} />
      <input name="allergies" placeholder="Allergies" value={patient.allergies} onChange={handleChange} />
      <button type="submit">{existingPatient ? "Modifier" : "Ajouter"}</button>
    </form>
    </>
  );
}