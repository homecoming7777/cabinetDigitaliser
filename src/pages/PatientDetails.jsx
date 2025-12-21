import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { calculateAge } from "../Slices/calculateAge";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTint,
  FaExclamationTriangle,
  FaUserMd,
} from "react-icons/fa";

import Navbar from "../components/Navbar";



export default function PatientDetails() {
  const { id } = useParams();
  const patient = useSelector(state =>
    state.patients.find(p => p.id === parseInt(id))
  );

  return (
    <>

      <Navbar />
      <div className="max-w-xl mx-auto mt-5 p-6 rounded-2xl shadow-xl hover:shadow-2xl">
        <div className="bg-gradient-to-r from-[#3894A1] to-[#2F404F] p-4 rounded-xl mb-6 text-white text-center shadow-md flex items-center justify-center gap-2">
          <FaUserMd className="text-white text-2xl" />
          <h1 className="text-3xl font-bold">Dossier Médical</h1>
        </div>

        <div>
          <p className="flex gap-2 font-bold mb-5">
            <span className="text-3xl font-extrabold">+</span>
            <h1 className="mt-2">
              {patient.nom}
            </h1>
            <h1 className="mt-2">
              {patient.prenom}
            </h1>
          </p>
        </div>
        <div className="space-y-3 text-gray-800">
          <p className="flex items-center gap-5 font-semibold">
            <span className="font-semibold text-blue-800">
              Age
            </span>
            {calculateAge(patient.dateNaissance)} ans
          </p>
          <p className="flex items-center gap-5 font-semibold">
            <FaPhone className="text-blue-500" /> {patient.telephone}
          </p>
          <p className="flex items-center gap-5 font-semibold">
            <FaMapMarkerAlt className="text-blue-500" /> {patient.adresse}
          </p>
          <p className="flex items-center gap-5 font-semibold">
            <FaEnvelope className="text-blue-500" /> {patient.email}
          </p>
          <p className="flex items-center gap-5 font-semibold">
            <FaTint className="text-red-500" /> Groupe sanguin: {patient.groupeSanguin}
          </p>
          <p className="flex items-center gap-5 font-semibold">
            <FaExclamationTriangle className="text-yellow-500" /> Allergies: {patient.allergies}
          </p>
        </div>

        <Link
          to={`/patients/ajouter?id=${patient.id}`}
          className="mt-6 inline-block w-full text-center px-6 py-3 bg-gradient-to-r from-[#C7DAD3] to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:from-green-500 hover:to-teal-600 transition-all duration-300"
        >
          Modifier
        </Link>
      </div>
    </>
  );
}
