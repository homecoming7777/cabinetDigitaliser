import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { editRdv } from "../Slices/RdvSlice";
import Navbar from "../components/Navbar";

export default function EditRendezVous() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const rdv = useSelector(state =>
    state.rdv.list.find(r => r.id === Number(id))
  );

  if (!rdv) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-10 text-red-600 font-semibold">
          Rendez-vous introuvable
        </p>
      </>
    );
  }

  const [form, setForm] = useState({
    date: rdv.date,
    heure: rdv.heure,
    statut: rdv.statut || "En attente",
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(editRdv({ ...rdv, ...form }));
    navigate("/rendez-vous");
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 px-4">
        <h1 className="text-center capitalize text-2xl sm:text-4xl font-extrabold text-[#2F404F]">
          Modifier le rendez-vous
        </h1>

        <div className="p-0.5 w-full mt-2 bg-gradient-to-r from-transparent via-[#3894A1] to-transparent"></div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#2f404f9d] mt-10 mb-10 rounded-lg p-6 space-y-6 shadow-2xl"
        >
          <div>
            <label className="block text-white mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border-2 border-white outline-0 text-white bg-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Heure</label>
            <input
              type="time"
              name="heure"
              value={form.heure}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border-2 border-white outline-0 text-white bg-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Statut</label>
            <select
              name="statut"
              value={form.statut}
              onChange={handleChange}
              className="w-full p-2 rounded-lg border-2 border-white outline-0 text-white bg-[#2f404f]"
            >
              <option value="En attente">En attente</option>
              <option value="Confirmé">Confirmé</option>
              <option value="Honoré">Honoré</option>
              <option value="Annulé">Annulé</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate("/rendez-vous")}
              className="px-4 py-2 rounded-md border text-white hover:bg-white hover:text-black"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-[#3894A1] text-[#2F404F] font-semibold"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
