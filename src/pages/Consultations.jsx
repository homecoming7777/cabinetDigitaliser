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
  const [deleteId, setDeleteId] = useState(null);

  const getPatientName = (id) => {
    const p = patients.find((x) => x.id === id);
    return p ? `${p.nom} ${p.prenom}` : "Inconnu";
  };

  const filtered = consultations.filter((c) =>
    (!selectedPatient || c.patient === Number(selectedPatient)) &&
    (!selectedMotif || c.type === selectedMotif)
  );

  const confirmDelete = () => {
    dispatch(deleteConsultation(deleteId));
    setDeleteId(null);
  };

  return (
    <>
      <Navbar />
      <div className="px-4 pb-10">
        <h1 className="text-center text-4xl mt-6 font-extrabold text-[#2F404F]">
          Consultations
        </h1>
          <div className="p-0.5 w-full bg-gradient-to-r from-transparent via-[#3894A1] to-transparent my-4"></div>


        <div className="flex justify-center gap-4 flex-wrap mt-6">
          <select onChange={(e) => setSelectedPatient(e.target.value)} className="border p-2 rounded">
            <option value="">Tous les patients</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>{p.nom} {p.prenom}</option>
            ))}
          </select>

          <select onChange={(e) => setSelectedMotif(e.target.value)} className="border p-2 rounded">
            <option value="">Tous les motifs</option>
            <option>Consultation</option>
            <option>Contrôle</option>
            <option>Certificat</option>
          </select>

          <Link to="/consultations/ajouter" className="bg-[#2F404F] text-white px-5 py-2 rounded">
            + Ajouter
          </Link>
        </div>

        <div className="md:hidden space-y-4 mt-6">
          {filtered.map((c, i) => (
            <div key={c.id} className="bg-white p-4 rounded shadow">
              <h2 className="font-bold">{getPatientName(c.patient)}</h2>
              <p className="mt-2"><span className="font-bold">Date: </span>{c.date}</p>
              <p className="mt-2"><span className="font-bold">Motif:</span> {c.type}</p>
              <p className="mt-2"><span className="font-bold">Motif:</span> {c.modePaiement}</p>
              <p className="mt-2"><span className="font-bold">Tarif:</span> {c.prix || "-"} MAD</p>

              <div className="flex justify-end gap-2 mt-3">
                <Link to={`/edit-consultation/${c.id}`} className="bg-blue-600 text-white px-3 py-1 rounded">Modifier</Link>
                <button onClick={() => setDeleteId(c.id)} className="bg-red-600 text-white px-3 py-1 rounded">Supprimer</button>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:block mt-8 overflow-x-auto">
          <table className="w-full shadow rounded">
            <thead className="bg-[#2F404F] text-white">
              <tr>
                <th>#</th><th>Date</th><th>Patient</th>
                <th>Motif</th><th>Tarif</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={c.id} className="border-b text-center hover:bg-gray-50">
                  <td>{i + 1}</td>
                  <td>{c.date}</td>
                  <td>{getPatientName(c.patient)}</td>
                  <td>{c.type}</td>
                  <td>{c.prix || "-"} MAD</td>
                  <td className="flex justify-center gap-2 py-2">
                    <Link to={`/edit-consultation/${c.id}`} className="bg-blue-600 text-white px-3 py-1 rounded">Modifier</Link>
                    <button onClick={() => setDeleteId(c.id)} className="bg-red-600 text-white px-3 py-1 rounded">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded">
            <p className="mb-4">Supprimer cette consultation ?</p>
            <div className="flex gap-4">
              <button className="border-2 px-2 py-1 rounded" onClick={() => setDeleteId(null)}>Annuler</button>
              <button onClick={confirmDelete} className="bg-red-600 text-white px-4 py-1 rounded">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
