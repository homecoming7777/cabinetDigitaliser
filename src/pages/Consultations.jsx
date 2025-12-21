import { useSelector, useDispatch } from "react-redux";
import { deleteConsultation } from "../Slices/ConsultationSlice";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Consultations() {
  const consultations = useSelector((state) => state.consultations.list);
  const patients = useSelector((state) => state.patients);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedMotif, setSelectedMotif] = useState("");

  const getPatientName = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? `${patient.nom} ${patient.prenom}` : "Patient inconnu";
  };

  const filteredConsultations = consultations.filter((c) => {
    const matchesPatient = selectedPatient
      ? c.patient === Number(selectedPatient)
      : true;
    const matchesMotif = selectedMotif
      ? c.type === selectedMotif
      : true;
    return matchesPatient && matchesMotif;
  });

  return (
    <div className="mb-10">
      <Navbar />

      <h1 className="text-center capitalize text-2xl sm:text-4xl md:text-5xl lg:text-5xl mt-5 font-extrabold text-[#2F404F]">
        Liste des Consultations
      </h1>

      <div className="p-0.5 w-full bg-gradient-to-r from-transparent via-[#3894A1] to-transparent my-4"></div>

      <div className="flex justify-center mt-8 gap-4 flex-wrap">
        <Link
          to="/consultations/ajouter"
          className="inline-flex h-12 items-center justify-center rounded-md bg-[#2F404F] px-6 font-medium text-neutral-50 transition hover:scale-105"
        >
          + Ajouter une consultation
        </Link>

        <select
          value={selectedPatient}
          onChange={(e) => setSelectedPatient(e.target.value)}
          className="border-2 rounded-lg p-2 text-[#2F404F]"
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
          className="border-2 rounded-lg p-2 text-[#2F404F]"
        >
          <option value="">Tous les motifs</option>
          <option value="Consultation">Consultation</option>
          <option value="Contrôle">Contrôle</option>
          <option value="Certificat">Certificat</option>
        </select>
      </div>

      <div className="max-w-7xl mx-auto mt-10 px-4 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-[#2F404F] text-white">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Patient</th>
              <th className="px-6 py-3 text-left">Motif</th>
              <th className="px-6 py-3 text-left">Diagnostic</th>
              <th className="px-6 py-3 text-left">Ordonnance</th>
              <th className="px-6 py-3 text-left">Tarif (MAD)</th>
              <th className="px-6 py-3 text-left">Mode paiement</th>
              <th className="px-6 py-3 text-center">Historique</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredConsultations.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-6 text-gray-500">
                  Aucune consultation trouvée
                </td>
              </tr>
            )}

            {filteredConsultations.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{c.date}</td>
                <td className="px-6 py-4 text-center">{getPatientName(c.patient)}</td>
                <td className="px-6 py-4 text-center">{c.type}</td>
                <td className="px-6 py-4 text-center">{c.diagnostic}</td>
                <td className="px-6 py-4 text-center">{c.ordonnance || "-"}</td>
                <td className="px-6 py-4 text-center">{c.prix ? `${c.prix} MAD` : "-"}</td>
                <td className="px-6 py-4 text-center">{c.modePaiement || "-"}</td>
                <td className="px-6 py-4 text-center text-center">
                  <button
                    onClick={() =>
                      navigate(`/patients/${c.patient}`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Voir
                  </button>
                </td>
                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => dispatch(deleteConsultation(c.id))}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition"
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
