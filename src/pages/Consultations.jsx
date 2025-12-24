import { useSelector, useDispatch } from "react-redux";
import { deleteConsultation } from "../Slices/ConsultationSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Consultations() {
  const consultations = useSelector((state) => state.consultations.list);
  const patients = useSelector((state) => state.patients);
  const dispatch = useDispatch();

  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedMotif, setSelectedMotif] = useState("");

  const getPatientName = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? `${patient.nom} ${patient.prenom}` : "Patient inconnu";
  };

  const filteredConsultations = consultations.filter((c) => {
    const matchPatient = selectedPatient
      ? c.patient === Number(selectedPatient)
      : true;

    const matchMotif = selectedMotif ? c.type === selectedMotif : true;

    return matchPatient && matchMotif;
  });

  return (
    <div className="mb-10">
      <Navbar />

      <h1 className="text-center text-4xl mt-5 font-extrabold text-[#2F404F]">
        Liste des Consultations
      </h1>

      <div className="p-0.5 w-full bg-[#3894A1] my-4"></div>

      <div className="flex justify-center mt-8 gap-4 flex-wrap">
        <Link
          to="/consultations/ajouter"
          className="bg-[#2F404F] text-white px-6 py-2 rounded hover:scale-105"
        >
          + Ajouter une consultation
        </Link>

        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="">Tous les patients</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nom} {p.prenom}
            </option>
          ))}
        </select>

        <select
          value={selectedMotif}
          onChange={(e) => setSelectedMotif(e.target.value)}
          className="border rounded-lg p-2"
        >
          <option value="">Tous les motifs</option>
          <option value="Consultation">Consultation</option>
          <option value="Contrôle">Contrôle</option>
          <option value="Certificat">Certificat</option>
        </select>
      </div>

      <div className="max-w-7xl mx-auto mt-10 px-4 overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-[#2F404F] text-white">
            <tr>
              <th className="p-3">#</th>
              <th>Date</th>
              <th>Patient</th>
              <th>Motif</th>
              <th>Diagnostic</th>
              <th>Tarif</th>
              <th>Paiement</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredConsultations.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  Aucune consultation trouvée
                </td>
              </tr>
            )}

            {filteredConsultations.map((c, index) => (
              <tr key={c.id} className="border-b text-center">
                <td>{index + 1}</td>
                <td>{c.date}</td>
                <td>{getPatientName(c.patient)}</td>
                <td>{c.type}</td>
                <td>{c.diagnostic}</td>
                <td>{c.prix || "-"} MAD</td>
                <td>{c.modePaiement || "-"}</td>

                <td className="flex justify-center gap-2 py-2">
                  <Link
                    to={`/edit-consultation/${c.id}`}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Modifier
                  </Link>

                  <button
                    onClick={() => dispatch(deleteConsultation(c.id))}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
