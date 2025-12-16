import { useState } from "react";
import { useDispatch } from "react-redux";
import { addConsultation } from "../ConsultationSlice";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function AjouterConsultation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    patient: "",
    date: "",
    diagnostic: "",
    type: "Consultation"
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = e => {
    e.preventDefault();

    dispatch(addConsultation({ id: Date.now(), ...form }));
    navigate("/Consultations");
  };

  return (
    <>
    <Navbar />
      <h1 className="text-center capitalize text-2xl sm:text-4xl md:text-5xl lg:text-5xl mt-5 font-extrabold text-[#2F404F]">Ajouter une Consultation</h1>
    
        <div className="p-0.5 w-100 flex justify-self-center bg-gradient-to-r from-transparent via-[#3894A1] to-transparent"></div>

    <div className="max-w-5xl mx-auto mt-10 px-4">
    <form onSubmit={submit} className="bg-[#2f404f9d] mb-10 mt-10 rounded-lg p-6 space-y-4 shadow-2xl">

      <input required className="border-2 mt-5 rounded-lg outline-0 w-full p-2 border-white text-white" name="patient" placeholder="Patient" onChange={handleChange} />
      <div className="mt-5">
        <label htmlFor="" className="text-white">consultation date:</label>
      <input required className="border-2 rounded-lg outline-0 w-full p-2 border-white text-white" type="date" name="date" onChange={handleChange} />
      </div>
      <input required className="border-2 mt-5 rounded-lg outline-0 w-full p-2 border-white text-white" name="diagnostic" placeholder="Diagnostic" onChange={handleChange} />

      <select required className="border-2 mt-5 rounded-lg outline-0 w-full p-2 border-white text-white" name="type" onChange={handleChange}>
        <option className="text-black">Consultation</option>
        <option className="text-black">Contrôle</option>
        <option className="text-black">Certificat</option>
      </select>
      <button  className="group mt-5 text-white relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-neutral-200 bg-transparent px-6 font-medium transition-all [box-shadow:0px_4px_1px_#a3a3a3] active:translate-y-[2px] active:shadow-none" type="submit">Créer</button>
    </form>
    </div>
    </>
  );
}