import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientsList from "./PatientsList";
import PatientDetails from "./PatientDetails";
import PatientForm from "./PatientForm";
import LandingPage from "./LandingPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/patients" element={<PatientsList />} />
        <Route path="/patients/ajouter" element={<PatientForm />} />
        <Route path="/patients/:id" element={<PatientDetails />} />
        <Route path="*" element={<PatientsList />} />
      </Routes>
    </Router>
  );
}

export default App;