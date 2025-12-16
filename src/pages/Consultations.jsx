import { useSelector, useDispatch } from "react-redux";
import { deleteConsultation } from "../ConsultationSlice";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Consultations() {
  const consultations = useSelector(state => state.consultations.list);
  const dispatch = useDispatch();

  return (
    <div>
      <Navbar />
      <h1 className="text-center capitalize text-2xl sm:text-4xl md:text-5xl lg:text-5xl mt-5 font-extrabold text-[#2F404F]">Liste des Consultations</h1>
      
        <div className="p-0.5 w-100 flex justify-self-center bg-gradient-to-r from-transparent via-[#3894A1] to-transparent"></div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {consultations.map(c => (
      <ul className="justify-self-center w-70 lg:w-100 mt-10 p-3 rounded bg-white">
          <li key={c.id}>
            <h1 className="text-center font-bold">
            {c.date}  
            </h1>
            <h1 className="text-center font-bold">
            {c.patientId}
            </h1>
            <h1 className="text-center font-bold">
            {c.diagnostic}
            </h1>
            <button className="flex justify-self-center bg-red-600 text-white mt-5 py-1 px-4 rounded" onClick={() => dispatch(deleteConsultation(c.id))}>
              Supprimer
            </button>
          </li>
      </ul>
        ))}
        </div>
      <div className="flex justify-center mt-5">
      <Link className="mb-10 inline-flex h-12 items-center justify-center rounded-md bg-[#2F404F] px-6 font-medium text-neutral-50 transition active:scale-110 " to="/consultations/ajouter">
        + Ajouter une consultation
      </Link>
      </div>
    </div>
  );
}
