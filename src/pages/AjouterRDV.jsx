import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRdv } from "../Slices/RdvSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AjouterRdv() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const patients = useSelector((state) => state.patients);
  const rdvs = useSelector((state) => state.rdv.list);

  const [form, setForm] = useState({
    patientId: "",
    date: "",
    heure: "",
    motif: "Consultation",
    statut: "En attente"
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    const conflict = rdvs.find(r => r.date === form.date && r.heure === form.heure);
    if (conflict) {
      alert("Erreur : Ce créneau est déjà réservé !");
      return;
    }

    dispatch(
      addRdv({
        id: Date.now(),
        patientId: Number(form.patientId),
        date: form.date,
        heure: form.heure,
        motif: form.motif,
        statut: form.statut
      })
    );

    navigate("/rendez-vous");
  };

  return (
    <>
      <Navbar />
      <h1 className="text-center capitalize text-4xl mt-5 font-extrabold text-[#2F404F]">
        Ajouter un RDV
      </h1>

      <div className="p-0.5 w-full bg-gradient-to-r from-transparent via-[#3894A1] to-transparent my-4"></div>

      <div className="max-w-5xl mx-auto mt-10 px-4">
        <form
          onSubmit={submit}
          className="bg-[#2f404f9d] rounded-lg p-6 space-y-5 shadow-2xl"
        >
          <select
            required
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
          >
            <option value="">Sélectionner un patient</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id} className="text-black">
                {p.nom} {p.prenom}
              </option>
            ))}
          </select>

          <div>
            <label className="text-white">Date de rendez-vous:</label>
            <input
              required
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
            />
          </div>

          <div>
            <label className="text-white">Heure de rendez-vous:</label>
            <input
              required
              type="time"
              name="heure"
              value={form.heure}
              onChange={handleChange}
              className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
            />
          </div>

          <select
            required
            name="motif"
            value={form.motif}
            onChange={handleChange}
            className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
          >
            <option className="text-black">Consultation</option>
            <option className="text-black">Contrôle</option>
            <option className="text-black">Certificat</option>
            <option className="text-black">Vaccination</option>
            <option className="text-black">Urgence</option>
          </select>

          <select
            required
            name="statut"
            value={form.statut}
            onChange={handleChange}
            className="border-2 rounded-lg w-full p-2 border-white text-white bg-transparent"
          >
            <option className="text-black" value="En attente">En attente</option>
            <option className="text-black" value="Confirmé">Confirmé</option>
            <option className="text-black" value="Honoré">Honoré</option>
            <option className="text-black" value="Annulé">Annulé</option>
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
