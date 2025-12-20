import { useSelector, useDispatch } from "react-redux";
import { deleteConsultation } from "../ConsultationSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Consultations() {
  const consultations = useSelector((state) => state.consultations.list);
  const patients = useSelector((state) => state.patients);
  const dispatch = useDispatch();

  // Resolve patient name from patient ID
  const getPatientName = (patientId) => {
    const patient = patients.find((p) => p.id === patientId);
    return patient ? `${patient.nom} ${patient.prenom}` : "Patient inconnu";
  };

  return (
    <div>
      <Navbar />

      <h1 className="text-center capitalize text-2xl sm:text-4xl md:text-5xl lg:text-5xl mt-5 font-extrabold text-[#2F404F]">
        Liste des Consultations
      </h1>

      <div className="p-0.5 w-full bg-gradient-to-r from-transparent via-[#3894A1] to-transparent my-4"></div>
      <div className="flex justify-center mt-8">
        <Link
          to="/consultations/ajouter"
          className="mb-10 inline-flex h-12 items-center justify-center rounded-md bg-[#2F404F] px-6 font-medium text-neutral-50 transition hover:scale-105"
        >
          + Ajouter une consultation
        </Link>
      </div>

      {/* Table */}
      <div className="max-w-6xl mx-auto mt-10 px-4 overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-[#2F404F] text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Patient</th>
              <th className="px-6 py-3 text-left text-sm font-semibold">Diagnostic</th>
              <th className="px-6 py-3 text-center text-sm font-semibold">Action</th>
            </tr>
          </thead>

          <tbody>
            {consultations.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  Aucune consultation trouvée
                </td>
              </tr>
            )}

            {consultations.map((c) => (
              <tr key={c.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{c.date}</td>
                <td className="px-6 py-4">{getPatientName(c.patient)}</td>
                <td className="px-6 py-4">{c.diagnostic}</td>
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

      {/* Add button */}
    </div>
  );
}
