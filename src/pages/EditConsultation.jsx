import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateConsultation } from "../Slices/ConsultationSlice";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function EditConsultation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const consultation = useSelector((state) =>
    state.consultations.list.find((c) => c.id === Number(id))
  );

  if (!consultation) {
    return (
      <div>
        <Navbar />
        <p className="text-center mt-10 text-red-500 font-bold">
          Consultation introuvable
        </p>
      </div>
    );
  }

  const [form, setForm] = useState({
    date: consultation.date,
    type: consultation.type,
    diagnostic: consultation.diagnostic,
    ordonnance: consultation.ordonnance || "",
    prix: consultation.prix || "",
    modePaiement: consultation.modePaiement || "",
    patient: consultation.patient,
    id: consultation.id,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateConsultation(form));
    navigate("/consultations");
  };

  return (
    <div className="mb-10">
      <Navbar />

      <h1 className="text-center text-3xl font-extrabold text-[#2F404F] mt-6">
        Modifier la Consultation
      </h1>

      <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Motif</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="Consultation">Consultation</option>
              <option value="Contrôle">Contrôle</option>
              <option value="Certificat">Certificat</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Diagnostic</label>
            <input
              type="text"
              name="diagnostic"
              value={form.diagnostic}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Ordonnance</label>
            <input
              type="text"
              name="ordonnance"
              value={form.ordonnance}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Tarif (MAD)</label>
            <input
              type="number"
              name="prix"
              value={form.prix}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">
              Mode de paiement
            </label>
            <select
              name="modePaiement"
              value={form.modePaiement}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">-- Choisir --</option>
              <option value="Espèces">Espèces</option>
              <option value="Carte">Carte</option>
              <option value="Chèque">Chèque</option>
            </select>
          </div>

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
            >
              Enregistrer
            </button>

            <button
              type="button"
              onClick={() => navigate("/consultations")}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded w-full"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
