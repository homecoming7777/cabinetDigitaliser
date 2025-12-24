import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deletePatient } from "../Slices/patientsSlice";
import { calculateAge } from "../Slices/calculateAge";
import Navbar from "../components/Navbar";

export default function PatientsList() {
  const patients = useSelector((state) => state.patients);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [groupe, setGroupe] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const filteredPatients = patients.filter((patient) => {
    const age = calculateAge(patient.dateNaissance);
    const fullName = `${patient.nom} ${patient.prenom}`.toLowerCase();

    const matchSearch = fullName.includes(search.toLowerCase());
    const matchGroup = !groupe || patient.groupeSanguin === groupe;

    let matchAge = true;
    if (ageRange === "0-18") matchAge = age <= 18;
    if (ageRange === "19-40") matchAge = age >= 19 && age <= 40;
    if (ageRange === "41-60") matchAge = age >= 41 && age <= 60;
    if (ageRange === "60+") matchAge = age > 60;

    return matchSearch && matchGroup && matchAge;
  });

  const confirmDelete = () => {
    dispatch(deletePatient(deleteId));
    setDeleteId(null);
  };

  return (
    <>
      <Navbar />

      <div className="px-4 pb-10">
        <h1 className="text-center text-3xl md:text-5xl mt-6 font-extrabold text-[#2F404F]">
          Annuaire des patients
        </h1>

        <div className="p-0.5 w-full bg-gradient-to-r from-transparent via-[#3894A1] to-transparent my-4"></div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <input
            placeholder="Nom / Prénom"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded px-4 py-2"
          />

          <select
            value={groupe}
            onChange={(e) => setGroupe(e.target.value)}
            className="border rounded px-4 py-2"
          >
            <option value="">Tous les groupes</option>
            <option>A+</option><option>A-</option>
            <option>B+</option><option>B-</option>
            <option>AB+</option><option>AB-</option>
            <option>O+</option><option>O-</option>
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

        <div className="flex justify-center my-8">
          <Link
            to="/patients/ajouter"
            className="bg-[#2F404F] text-white px-6 py-3 rounded hover:scale-105 transition"
          >
            Ajouter un patient
          </Link>
        </div>

        <div className="hidden md:block max-w-7xl mx-auto overflow-x-auto">
          <table className="w-full rounded-xl shadow-lg overflow-hidden">
            <thead className="bg-[#2F404F] text-white">
              <tr>
                <th>#</th><th>Nom</th><th>Âge</th>
                <th>Téléphone</th><th>Email</th>
                <th>Groupe</th><th>Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {filteredPatients.map((p, i) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="text-center">{i + 1}</td>
                  <td className="font-semibold">{p.nom} {p.prenom}</td>
                  <td className="text-center">{calculateAge(p.dateNaissance)} ans</td>
                  <td className="text-center">{p.telephone}</td>
                  <td className="text-center">{p.email}</td>
                  <td className="text-center">{p.groupeSanguin}</td>
                  <td className="flex justify-center gap-2 py-2">
                    <Link to={`/patients/${p.id}`} className="bg-blue-600 text-white px-3 py-1 rounded">Voir</Link>
                    <button onClick={() => setDeleteId(p.id)} className="bg-red-600 text-white px-3 py-1 rounded">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4 mt-6">
          {filteredPatients.map((p, i) => (
            <div key={p.id} className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between">
                <h2 className="font-bold">{p.nom} {p.prenom}</h2>
                <span className="text-gray-400">#{i + 1}</span>
              </div>

              <p className="mt-2"><span className="font-bold">Âge:</span> {calculateAge(p.dateNaissance)} ans</p>
              <p className="mt-2"><span className="font-bold">Tél:</span> {p.telephone}</p>
              <p className="mt-2"><span className="font-bold">Email:</span> {p.email}</p>
              <p className="mt-2"><span className="font-bold">Groupe:</span> {p.groupeSanguin}</p>

              <div className="flex justify-end gap-2 mt-3">
                <Link to={`/patients/${p.id}`} className="bg-blue-600 text-white px-4 py-1 rounded">Voir</Link>
                <button onClick={() => setDeleteId(p.id)} className="bg-red-600 text-white px-4 py-1 rounded">
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <h2 className="font-bold mb-4">Supprimer ce patient ?</h2>
            <div className="flex justify-center gap-4">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 border rounded">
                Annuler
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
