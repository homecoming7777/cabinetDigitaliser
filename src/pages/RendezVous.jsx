import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteRdv } from "../Slices/RdvSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RendezVous() {
  const rdvs = useSelector((state) => state.rdv.list);
  const patients = useSelector((state) => state.patients);
  const dispatch = useDispatch();

  const [patientFilter, setPatientFilter] = useState("");
  const [motifFilter, setMotifFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const getPatientName = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? `${patient.nom} ${patient.prenom}` : "Patient inconnu";
  };

  const getStatusBadge = (status) => {
    const colors = {
      "En attente": "bg-yellow-100 text-yellow-800",
      "Confirmé": "bg-green-100 text-green-800",
      "Honoré": "bg-blue-100 text-blue-800",
      "Annulé": "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const filteredRdvs = rdvs.filter((r) => {
    return (
      (patientFilter === "" || r.patientId === Number(patientFilter)) &&
      (motifFilter === "" || r.motif === motifFilter) &&
      (statusFilter === "" || r.statut === statusFilter)
    );
  });

  return (
    <div className="mb-10">
      <Navbar />

      <h1 className="text-center capitalize text-2xl sm:text-4xl md:text-5xl mt-5 font-extrabold text-[#2F404F]">
        Liste des Rendez-vous
      </h1>

      <div className="p-0.5 w-full bg-gradient-to-r from-transparent via-[#3894A1] to-transparent my-4"></div>

      <div className="max-w-6xl mx-auto mt-6 px-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-wrap">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <select
            value={patientFilter}
            onChange={(e) => setPatientFilter(e.target.value)}
            className="border-2 rounded-lg w-full sm:w-60 p-2 border-[#2F404F] bg-white"
          >
            <option value="">Tous les patients</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nom} {p.prenom}
              </option>
            ))}
          </select>

          <select
            value={motifFilter}
            onChange={(e) => setMotifFilter(e.target.value)}
            className="border-2 rounded-lg w-full sm:w-48 p-2 border-[#2F404F] bg-white"
          >
            <option value="">Tous les motifs</option>
            <option value="Consultation">Consultation</option>
            <option value="Contrôle">Contrôle</option>
            <option value="Certificat">Certificat</option>
            <option value="Vaccination">Vaccination</option>
            <option value="Urgence">Urgence</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border-2 rounded-lg w-full sm:w-48 p-2 border-[#2F404F] bg-white"
          >
            <option value="">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="Confirmé">Confirmé</option>
            <option value="Honoré">Honoré</option>
            <option value="Annulé">Annulé</option>
          </select>
        </div>

        <div className="flex justify-center mt-2 sm:mt-0">
          <Link
            to="/rendez-vous/ajouter"
            className="inline-flex h-12 items-center justify-center rounded-md bg-[#2F404F] px-6 text-white hover:scale-105 transition"
          >
            + Ajouter un rendez-vous
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 px-4 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-[#2F404F] text-white">
            <tr>
              <th className="px-6 py-3 text-center">#</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Heure</th>
              <th className="px-6 py-3 text-left">Patient</th>
              <th className="px-6 py-3 text-left">Motif</th>
              <th className="px-6 py-3 text-left">Statut</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRdvs.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  Aucun rendez-vous trouvé
                </td>
              </tr>
            )}

            {filteredRdvs.map((r, index) => (
              <tr key={r.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-center font-bold text-gray-500">
                  {index + 1}
                </td>

                <td className="px-6 py-4">{r.date}</td>
                <td className="px-6 py-4">{r.heure}</td>
                <td className="px-6 py-4">{getPatientName(r.patientId)}</td>
                <td className="px-6 py-4">{r.motif}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(
                      r.statut
                    )}`}
                  >
                    {r.statut}
                  </span>
                </td>

                <td className="px-6 py-4 flex justify-center gap-2">
                  <button
                    onClick={() => dispatch(deleteRdv(r.id))}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                  >
                    Supprimer
                  </button>

                  <Link
                    to={`/rendez-vous/modifier/${r.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
                  >
                    Modifier
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
