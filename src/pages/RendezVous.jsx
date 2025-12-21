import { useSelector, useDispatch } from "react-redux";
import { deleteRdv } from "../Slices/RdvSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function RendezVous() {
  const rdvs = useSelector((state) => state.rdv.list);
  const patients = useSelector((state) => state.patients);
  const dispatch = useDispatch();

  const getPatientName = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? `${patient.nom} ${patient.prenom}` : "Patient inconnu";
  };

  return (
    <div>
      <Navbar />

      <h1 className="text-center capitalize text-2xl sm:text-4xl md:text-5xl mt-5 font-extrabold text-[#2F404F]">
        Liste des Rendez-vous
      </h1>

      <div className="p-0.5 w-full bg-gradient-to-r from-transparent via-[#3894A1] to-transparent my-4"></div>

      <div className="flex justify-center mt-8">
        <Link
          to="/rendez-vous/ajouter"
          className="inline-flex h-12 items-center justify-center rounded-md bg-[#2F404F] px-6 text-white hover:scale-105 transition"
        >
          + Ajouter un rendez-vous
        </Link>
      </div>
      <div className="max-w-6xl mx-auto mt-10 px-4 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-[#2F404F] text-white">
            <tr>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Heure</th>
              <th className="px-6 py-3 text-left">Patient</th>
              <th className="px-6 py-3 text-left">Motif</th>
              <th className="px-6 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {rdvs.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">
                  Aucun rendez-vous trouvé
                </td>
              </tr>
            )}

            {rdvs.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4">{r.date}</td>
                <td className="px-6 py-4">{r.heure}</td>

                {/* ✅ FIX IS HERE */}
                <td className="px-6 py-4">
                  {getPatientName(r.patientId)}
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                    {r.motif}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  <button
                    onClick={() => dispatch(deleteRdv(r.id))}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
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
