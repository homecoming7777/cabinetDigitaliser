import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConsultation } from "../ConsultationSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AjouterConsultation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patients = useSelector((state) => state.patients);

  const [form, setForm] = useState({
    patient: "",
    date: "",
    diagnostic: "",
    type: "Consultation",
    prix: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    // Save patient as ID and prix as number
    dispatch(
      addConsultation({
        ...form,
        patient: Number(form.patient),
        prix: Number(form.prix) || 0,
      })
    );

    navigate("/consultations");
  };

  return (
    <>
      <Navbar />

      <h1 className="text-center capitalize text-4xl mt-5 font-extrabold text-[#2F404F]">
        Ajouter une Consultation
      </h1>

      <div className="p-0.5 w-full bg-gradient-to-r from-transparent via-[#3894A1] to-transparent my-4"></div>

      <div className="max-w-5xl mx-auto mt-10 px-4">
        <form
          onSubmit={submit}
          className="bg-[#2f404f9d] rounded-lg p-6 space-y-5 shadow-2xl"
        >
          {/* Patient select */}
          <select
            required
            name="patient"
            onChange={handleChange}
            className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
          >
            <option value="">Select Patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nom} {p.prenom}
              </option>
            ))}
          </select>

          {/* Date */}
          <div>
            <label className="text-white">Consultation date:</label>
            <input
              required
              type="date"
              name="date"
              onChange={handleChange}
              className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
            />
          </div>

          {/* Diagnostic */}
          <input
            required
            name="diagnostic"
            placeholder="Diagnostic"
            onChange={handleChange}
            className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
          />

          {/* Prix */}
          <input
            required
            type="number"
            min="0"
            name="prix"
            placeholder="Prix"
            onChange={handleChange}
            className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
          />

          {/* Type */}
          <select
            required
            name="type"
            onChange={handleChange}
            className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
          >
            <option className="text-black">Consultation</option>
            <option className="text-black">Contrôle</option>
            <option className="text-black">Certificat</option>
          </select>

          <button
            type="submit"
            className="w-full mt-4 h-12 text-white rounded-md border border-white hover:bg-white hover:text-[#2F404F] transition"
          >
            Créer
          </button>
        </form>
      </div>
    </>
  );
}
