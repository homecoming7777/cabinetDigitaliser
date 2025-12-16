import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPatient, updatePatient } from "../patientsSlice";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

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

      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h1 className="text-center capitalize text-2xl sm:text-4xl md:text-5xl lg:text-5xl mt-5 font-extrabold text-[#2f404f]">
          {existingPatient ? "Modifier le patient" : "Ajouter un patient"}
        </h1>
        <div className="p-0.5 w-100 flex justify-self-center bg-gradient-to-r from-transparent via-[#3894A1] to-transparent"></div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#2f404f9d] mb-10 mt-10 rounded-lg p-6 space-y-4 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <input
              className="border-2 rounded-lg outline-0 w-full p-2 border-white text-white"
              pattern="^[A-Za-z]+$"
              name="nom"
              placeholder="Nom"
              value={patient.nom}
              onChange={handleChange}
              required
            />

            <input
              className="border-2 rounded-lg outline-0 w-full p-2 border-white text-white"
              pattern="^[A-Za-z]+$"
              name="prenom"
              placeholder="Prénom"
              value={patient.prenom}
              onChange={handleChange}
              required
            />

<div>
            <label htmlFor="" className="text-white">Date de naissance:</label>
            <input
              className="border-2 rounded-lg outline-0 w-full p-2 border-white text-white"
              type="date"
              name="dateNaissance"
              value={patient.dateNaissance}
              onChange={handleChange}
              required
              placeholder="Date denaissance"
              />
              </div>

            <input
              className="border-2 rounded-lg outline-0 w-full p-2 border-white text-white"
              pattern="^[0-9]+$"
              name="telephone"
              placeholder="Téléphone"
              value={patient.telephone}
              onChange={handleChange}
            />

            <input
              className="border-2 rounded-lg outline-0 w-full p-2 border-white text-white"
              name="adresse"
              placeholder="Adresse"
              value={patient.adresse}
              onChange={handleChange}
            />

            <input
              className="border-2 rounded-lg outline-0 w-full p-2 border-white text-white"
              type="email"
              name="email"
              placeholder="Email"
              value={patient.email}
              onChange={handleChange}
            />

            <input
              className="border-2 rounded-lg outline-0 w-full p-2 border-white text-white"
              name="groupeSanguin"
              placeholder="Groupe sanguin"
              value={patient.groupeSanguin}
              onChange={handleChange}
            />

            <input
              className="border-2 rounded-lg outline-0 w-full p-2 border-white text-white"
              name="allergies"
              placeholder="Allergies"
              value={patient.allergies}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/patients")}
              className="px-4 py-2 rounded-md border text-white hover:bg-gray-100 hover:text-black"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-[#3894A1] text-[#2F404F]"
            >
              {existingPatient ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
