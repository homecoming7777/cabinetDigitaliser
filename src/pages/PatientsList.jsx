import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deletePatient } from "../Slices/patientsSlice";
import { calculateAge } from "../Slices/calculateAge";
import Navbar from "../components/Navbar";

export default function PatientsList() {

  /* ===== Get patients from Redux ===== */
  const patients = useSelector((state) => state.patients);
  const dispatch = useDispatch();

  /* ===== Filters state ===== */
  const [search, setSearch] = useState("");
  const [groupe, setGroupe] = useState("");
  const [ageRange, setAgeRange] = useState("");

  /* ===== Filter patients ===== */

  const filteredPatients = patients.filter((patient) => {
    const age = calculateAge(patient.dateNaissance);

    // Search by name

    const fullName = (patient.nom + " " + patient.prenom).toLowerCase();
    const searchText = search.toLowerCase();
    const matchSearch = fullName.includes(searchText);


    // Filter by blood group
    
    const bloodGroupe =
      !groupe || patient.groupeSanguin === groupe;

    // Filter by age range
    const matchAge =
      !ageRange ||
      (ageRange === "0-18" && age <= 18) ||
      (ageRange === "19-40" && age >= 19 && age <= 40) ||
      (ageRange === "41-60" && age >= 41 && age <= 60) ||
      (ageRange === "60+" && age > 60);

    return matchSearch && bloodGroupe && matchAge;
  });

  return (
    <>
      <Navbar />

      <div className="px-4">
        <h1 className="text-center text-3xl md:text-5xl mt-6 font-extrabold text-[#2F404F]">
          Annuaire des patients
        </h1>

        <div className="p-0.5 w-full bg-gradient-to-r from-transparent via-[#3894A1] to-transparent my-4"></div>

        {/* ===== Filters ===== */}
        <div className="mt-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">

          <input
            type="text"
            placeholder="Nom / Prénom"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-4 py-2 outline-none"
          />

          <select
            value={groupe}
            onChange={(e) => setGroupe(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="">Tous les groupes</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>

          <select
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="">Tous les âges</option>
            <option value="0-18">0 – 18</option>
            <option value="19-40">19 – 40</option>
            <option value="41-60">41 – 60</option>
            <option value="60+">60+</option>
          </select>
        </div>

        {/* ===== Add button ===== */}
        <div className="flex justify-center mt-10 mb-10">
          <Link
            to="/patients/ajouter"
            className="bg-[#2F404F] text-white px-6 py-3 rounded hover:scale-105 transition"
          >
            Ajouter un patient
          </Link>
        </div>

        {/* ===== Table ===== */}
        <div className="overflow-x-auto mt-10">
          {filteredPatients.length > 0 ? (
            <table className="w-full max-w-6xl mx-auto border shadow">
              <thead className="bg-[#2F404F] text-white">
                <tr>
                  <th className="p-3 text-left">Nom</th>
                  <th className="p-3">Âge</th>
                  <th className="p-3">Téléphone</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Groupe</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-t hover:bg-gray-50">

                    <td className="p-3 font-semibold">
                      <Link
                        to={`/patients/${patient.id}`}
                        className="hover:underline"
                      >
                        {patient.nom} {patient.prenom}
                      </Link>
                    </td>

                    <td className="p-3 text-center">
                      {calculateAge(patient.dateNaissance)} ans
                    </td>

                    <td className="p-3 text-center">{patient.telephone}</td>
                    <td className="p-3 text-center">{patient.email}</td>
                    <td className="p-3 text-center">{patient.groupeSanguin}</td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => dispatch(deletePatient(patient.id))}
                        className="text-white bg-red-500 px-3 rounded font-bold py-2 hover:scale-105"
                      >
                        supprimer
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center mt-10 text-gray-400 text-3xl font-bold">
              Aucun patient trouvé
            </p>
          )}
        </div>
      </div>
    </>
  );
}
