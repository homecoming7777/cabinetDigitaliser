import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientsList from "./pages/PatientsList";
import PatientDetails from "./pages/PatientDetails";
import PatientForm from "./pages/PatientForm";
import LandingPage from "./pages/LandingPage";
import Consultations from "./pages/Consultations";
import AjouterConsultation from "./pages/AjouterConsultation";
import AjouterRdv from "./pages/AjouterRDV";
import RendezVous from "./pages/RendezVous";
import Dashboard from "./pages/Dashboard";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/patients" element={<PatientsList />} />
        <Route path="/patients/ajouter" element={<PatientForm />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
        <Route path="/consultations" element={<Consultations />} />
        <Route path="/consultations/ajouter" element={<AjouterConsultation />} />
        <Route path="/rendez-vous" element={<RendezVous />} />
        <Route path="/rendez-vous/ajouter" element={<AjouterRdv />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;