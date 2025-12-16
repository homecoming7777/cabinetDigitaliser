import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { calculateAge } from "../calculateAge";

export default function PatientDetails() {
  const { id } = useParams();
  const patient = useSelector(state =>
    state.patients.find(p => p.id === parseInt(id))
  );

  if (!patient) return <p>Patient non trouvé</p>;

  return (
    <div>
      <h1>Dossier de {patient.nom} {patient.prenom}</h1>
      <p>Age: {calculateAge(patient.dateNaissance)}</p>
      <p>Téléphone: {patient.telephone}</p>
      <p>Adresse: {patient.adresse}</p>
      <p>Email: {patient.email}</p>
      <p>Groupe sanguin: {patient.groupeSanguin}</p>
      <p>Allergies: {patient.allergies}</p>
      <Link to={`/patients/ajouter?id=${patient.id}`}>Modifier</Link>
    </div>
  );
}
