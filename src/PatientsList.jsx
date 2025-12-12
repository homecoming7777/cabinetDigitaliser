import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deletePatient } from "./patientsSlice";
import { calculateAge } from "./calculateAge";

export default function PatientsList() {
  const patients = useSelector(state => state.patients);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Annuaire des patients</h1>
      <Link to="/patients/ajouter">Ajouter un patient</Link>
      <ul>
        {patients.map(p => (
          <li key={p.id}>
            <Link to={`/patients/${p.id}`}>
              {p.nom} {p.prenom} - {calculateAge(p.dateNaissance)} ans
            </Link>
            <button onClick={() => dispatch(deletePatient(p.id))}>Supprimer</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
