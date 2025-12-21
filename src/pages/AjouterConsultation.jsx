import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConsultation } from "../Slices/ConsultationSlice";
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
    ordonnance: "",
    modePaiement: "",
  });

  const [errors, setErrors] = useState({
    patient: "",
    prix: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "patient" && value === "") {
      setErrors({ ...errors, patient: "Veuillez sélectionner un patient" });
    } else if (name === "patient") {
      setErrors({ ...errors, patient: "" });
    }

    if (name === "prix" && (value === "" || Number(value) < 0)) {
      setErrors({ ...errors, prix: "Le prix doit être un nombre positif" });
    } else if (name === "prix") {
      setErrors({ ...errors, prix: "" });
    }
  };

  const submit = (e) => {
    e.preventDefault();

    if (!form.patient || form.prix === "" || Number(form.prix) < 0) return;

    dispatch(
      addConsultation({
        ...form,
        patient: Number(form.patient),
        prix: Number(form.prix),
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
          <div>
            <select
              required
              name="patient"
              value={form.patient}
              onChange={handleChange}
              className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
            >
              <option className="text-black" value="">Sélectionner un patient</option>
              {patients.map((p) => (
                <option className="text-black" key={p.id} value={p.id}>
                  {p.nom} {p.prenom}
                </option>
              ))}
            </select>
            {errors.patient && <p className="text-red-500 text-sm mt-1">{errors.patient}</p>}
          </div>

          <div>
            <label className="text-white">Date de consultation:</label>
            <input
              required
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
            />
          </div>

          <input
            required
            name="diagnostic"
            placeholder="Diagnostic"
            value={form.diagnostic}
            onChange={handleChange}
            className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
          />

          <input
            name="ordonnance"
            placeholder="Ordonnance"
            value={form.ordonnance}
            onChange={handleChange}
            className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
          />

          <input
            required
            type="number"
            min="0"
            name="prix"
            placeholder="Prix (MAD)"
            value={form.prix}
            onChange={handleChange}
            className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
          />
          {errors.prix && <p className="text-red-500 text-sm mt-1">{errors.prix}</p>}

          <select
            name="modePaiement"
            value={form.modePaiement}
            onChange={handleChange}
            className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
          >
            <option value="">Mode de paiement</option>
            <option className="text-black" value="Espèces">Espèces</option>
            <option className="text-black" value="Carte bancaire">Carte bancaire</option>
            <option className="text-black" value="Virement">Virement</option>
          </select>

          <select
            required
            name="type"
            value={form.type}
            onChange={handleChange}
            className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
          >
            <option className="text-black" value="Consultation">Consultation</option>
            <option className="text-black" value="Contrôle">Contrôle</option>
            <option className="text-black" value="Certificat">Certificat</option>
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
