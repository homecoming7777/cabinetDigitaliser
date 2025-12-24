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
  const [deleteId, setDeleteId] = useState(null);

  const getPatientName = (id) => {
    const p = patients.find((x) => x.id === id);
    return p ? `${p.nom} ${p.prenom}` : "Patient inconnu";
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

  const filtered = rdvs.filter((r) =>
    (!patientFilter || r.patientId === Number(patientFilter)) &&
    (!motifFilter || r.motif === motifFilter) &&
    (!statusFilter || r.statut === statusFilter)
  );

  const confirmDelete = () => {
    dispatch(deleteRdv(deleteId));
    setDeleteId(null);
  };

  return (
    <>
      <Navbar />
      <div className="px-4 pb-10">
        <h1 className="text-center text-2xl sm:text-4xl md:text-5xl mt-5 font-extrabold text-[#2F404F]">
          Liste des Rendez-vous
        </h1>

        <div className="p-0.5 w-full bg-gradient-to-r from-transparent via-[#3894A1] to-transparent my-4"></div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
            <select
              value={patientFilter}
              onChange={(e) => setPatientFilter(e.target.value)}
              className="border-2 rounded-lg w-full sm:w-60 p-2 border-[#2F404F] bg-white"
            >
              <option value="">Tous les patients</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.nom} {p.prenom}</option>
              ))}
            </select>

            <select
              value={motifFilter}
              onChange={(e) => setMotifFilter(e.target.value)}
              className="border-2 rounded-lg w-full sm:w-48 p-2 border-[#2F404F] bg-white"
            >
              <option value="">Tous les motifs</option>
              <option>Consultation</option>
              <option>Contrôle</option>
              <option>Certificat</option>
              <option>Vaccination</option>
              <option>Urgence</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border-2 rounded-lg w-full sm:w-48 p-2 border-[#2F404F] bg-white"
            >
              <option value="">Tous les statuts</option>
              <option>En attente</option>
              <option>Confirmé</option>
              <option>Honoré</option>
              <option>Annulé</option>
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

        <div className="md:hidden mt-6 space-y-4">
          {filtered.map((r, i) => (
            <div key={r.id} className="bg-white rounded-xl shadow p-4 animate-fadeIn">
              <div className="flex justify-between items-center">
                <h2 className="font-bold">{getPatientName(r.patientId)}</h2>
                <span className={`px-2 py-1 rounded-full text-sm ${getStatusBadge(r.statut)}`}>
                  {r.statut}
                </span>
              </div>
              <p className="mt-2"><span className="font-bold">Date: </span>{r.date}</p>
              <p className="mt-2"><span className="font-bold">Heure:</span> {r.heure}</p>
              <p className="mt-2"><span className="font-bold">Motif:</span> {r.motif}</p>

              <div className="flex justify-end gap-2 mt-3">
                <Link to={`/rendez-vous/modifier/${r.id}`} className="bg-blue-600 text-white px-4 py-1 rounded">Modifier</Link>
                <button onClick={() => setDeleteId(r.id)} className="bg-red-600 text-white px-4 py-1 rounded">Supprimer</button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block max-w-6xl mx-auto mt-6 overflow-x-auto">
          <table className="min-w-full text-center bg-white rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-[#2F404F] text-white">
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Heure</th>
                <th>Patient</th>
                <th>Motif</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {filtered.map((r, i) => (
                <tr key={r.id} className="border-b hover:bg-gray-50 transition">
                  <td className="text-center">{i + 1}</td>
                  <td>{r.date}</td>
                  <td>{r.heure}</td>
                  <td>{getPatientName(r.patientId)}</td>
                  <td>{r.motif}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadge(r.statut)}`}>
                      {r.statut}
                    </span>
                  </td>
                  <td className="flex justify-center gap-2 py-2">
                    <Link to={`/rendez-vous/modifier/${r.id}`} className="bg-blue-600 text-white px-4 py-1 rounded">Modifier</Link>
                    <button onClick={() => setDeleteId(r.id)} className="bg-red-600 text-white px-4 py-1 rounded">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-80 text-center animate-fadeIn">
            <h2 className="font-bold mb-4">Supprimer ce rendez-vous ?</h2>
            <div className="flex justify-center gap-4">
              <button onClick={() => setDeleteId(null)} className="px-4 py-2 border rounded">Annuler</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
