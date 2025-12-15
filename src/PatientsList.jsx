import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { deletePatient } from "./patientsSlice";
import { calculateAge } from "./calculateAge";
import Navbar from "./components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function PatientsList() {
  const patients = useSelector(state => state.patients);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  const filteredPatients = patients.filter(p =>
    `${p.nom} ${p.prenom}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <h1 className="text-center capitalize text-2xl sm:text-4xl md:text-5xl lg:text-5xl mt-5 font-extrabold text-[#2F404F]">Annuaire des patients</h1>
      <div className="p-0.5 w-100 flex justify-self-center bg-gradient-to-r from-transparent via-[#3894A1] to-transparent"></div>

      <div className="mt-10 lg:mt-10 p-2 border-2 rounded w-70 flex justify-self-center ">
        <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" className="outline-0 w-full" placeholder="Rechercher un patient..." required />
      </div>

      <ul className="mt-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
        {filteredPatients.length > 0 ? (
          filteredPatients.map(p => (
            <div className="w-70 justify-self-center rounded bg-white shadow-xl mb-5 p-2">
              <li className="text-center" key={p.id}>
                <Link className="text-2xl capitalize font-semibold" to={`/patients/${p.id}`}>
                  {p.nom} {p.prenom}
                </Link>
                <h1 className="mt-5 text-gray-500">{calculateAge(p.dateNaissance)} ans</h1>
                <button
                  className="mt-5"
                  onClick={() => dispatch(deletePatient(p.id))}
                >
                  <FontAwesomeIcon icon={faXmark} className="text-red-500 text-2xl font-semibold" />
                </button>
              </li>
            </div>
          ))
        ) : (
          <div className="flex justify-center md:ml-100 lg:ml-150">
            <p className="mt-5 flex text-gray-300 text-3xl md:text-4xl lg:text-5xl font-extrabold mb-10">Aucun patient trouvé</p>
          </div>
        )}
      </ul>

      <div className="flex justify-center">
        <div className="mb-10 inline-flex h-12 items-center justify-center rounded-md bg-[#2F404F] px-6 font-medium text-neutral-50 transition active:scale-110 ">
          <Link to="/patients/ajouter">Ajouter un patient</Link>
        </div>
      </div>
    </div>
  );
}
