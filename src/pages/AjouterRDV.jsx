import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRdv } from "../Slices/RdvSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AjouterRdv() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patients = useSelector((state) => state.patients);

  const [form, setForm] = useState({
    patientId: "",
    date: "",
    heure: "",
    motif: "Consultation",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    dispatch(
      addRdv({
        id: Date.now(),
        patientId: Number(form.patientId),
        date: form.date,
        heure: form.heure,
        motif: form.motif,
      })
    );

    navigate("/rendez-vous");
  };

  return (
    <>
      <Navbar />

      <h1 className="text-center capitalize text-2xl sm:text-4xl md:text-5xl mt-5 font-extrabold text-[#2F404F]">
        Ajouter un RDV
      </h1>

      <div className="p-0.5 w-full bg-gradient-to-r from-transparent via-[#3894A1] to-transparent my-4"></div>

      <div className="max-w-5xl mx-auto mt-10 px-4">
        <form
          onSubmit={submit}
          className="bg-[#2f404f9d] mb-10 mt-10 rounded-lg p-6 space-y-4 shadow-2xl"
        >
          {/* Patient */}
          <select
            required
            name="patientId"
            onChange={handleChange}
            className="border-2 mt-5 rounded-lg w-full p-2 border-white text-white bg-transparent"
          >
            <option value="">Sélectionner un patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id} className="text-black">
                {p.nom} {p.prenom}
              </option>
            ))}
          </select>

          {/* Date */}
          <div className="mt-5">
            <label className="text-white">Date de rendez-vous :</label>
            <input
              type="date"
              name="date"
              required
              title="Veuillez choisir une date valide"
              onChange={handleChange}
              className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
            />
          </div>

          {/* Heure */}
          <div className="mt-5">
            <label className="text-white">Heure de rendez-vous :</label>
            <input
              type="time"
              name="heure"
              required
              title="Veuillez choisir une heure valide"
              onChange={handleChange}
              className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
            />
          </div>

          {/* Motif */}
          <select
            required
            name="motif"
            onChange={handleChange}
            className="border-2 mt-5 rounded-lg w-full p-2 border-white text-white bg-transparent"
          >
            <option className="text-black">Consultation</option>
            <option className="text-black">Contrôle</option>
            <option className="text-black">Certificat</option>
            <option className="text-black">Vaccination</option>
            <option className="text-black">Urgence</option>
          </select>

          <button
            type="submit"
            className="group mt-5 text-white inline-flex h-12 items-center justify-center rounded-md border border-neutral-200 px-6 transition-all hover:bg-white hover:text-[#2F404F]"
          >
            Créer
          </button>
        </form>
      </div>
    </>
  );
}
