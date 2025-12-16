import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Navbar from "../components/Navbar";


export default function LandingPage() {

  useEffect(() => {
  AOS.init({
    duration: 800,
    once: false,
  });
}, []);

  return (
    <div className="font-sans">
      <Navbar />

      <section className="bg-[#F0F1EE] px-8 py-10 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img data-aos="fade-up"
            src="public/WhatsApp Image 2025-12-11 at 23.31.42.jpeg"
            alt="doctor"
            className="rounded-xl shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 data-aos="fade-right" className="text-4xl font-bold mt-4 text-gray-900 md:text-center">
            Cabinet Médical Professionnel
          </h1>
          <p data-aos="fade-right" className="text-gray-600 mt-4 md:text-center">
            Des soins modernes, une équipe expérimentée et un suivi personnalisé.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Link to="/rendez-vous" data-aos="fade-right" className="bg-[#2F404F] text-white px-6 py-3 hover:text-[#2F404F] hover:bg-white rounded-lg">
              Prendre Rendez-vous
            </Link>
            <Link to="/Dashboard">
            <button data-aos="fade-left" className="border border-[#2F404F] text-[#2F404F] hover:text-white hover:bg-[#2F404F] px-6 py-3 rounded-lg">
              Voir tableau de bord
            </button>
            </Link>
          </div>
        </div>

      </section>

      <section className="px-8 py-20 bg-white">
        <h2 data-aos="fade-down" className="text-3xl font-bold text-center mb-6">À propos du Cabinet</h2>
        <div data-aos="fade-right" className="h-1 -mt-5 mb-5 bg-[#3894A1] w-80 flex justify-self-center"></div>
        <p data-aos="zoom-in" className="text-gray-600 max-w-3xl mx-auto text-center">
          Nous offrons des soins médicaux de qualité pour toute la famille, avec une équipe
          experte, un équipement moderne et un suivi personnalisé pour chaque patient.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-4xl mx-auto text-center">
          <div>
            <h3 data-aos="zoom-in" className="text-xl font-semibold">10+ ans d’expérience</h3>
            <p data-aos="zoom-in" className="text-gray-600">Cabinet médical reconnu et professionnel.</p>
          </div>

          <div>
            <h3 data-aos="zoom-in" className="text-xl font-semibold">Équipe spécialisée</h3>
            <p data-aos="zoom-in" className="text-gray-600">Médecins compétents et diplômés.</p>
          </div>

          <div>
            <h3 data-aos="zoom-in" className="text-xl font-semibold">Service rapide</h3>
            <p data-aos="zoom-in" className="text-gray-600">Consultation sans longues attentes.</p>
          </div>
        </div>
      </section>

      <section className="px-8 py-20 bg-[#F0F1EE]">
        <h2 data-aos="fade-down" className="text-3xl font-bold text-center mb-10">Nos Services</h2>
        <div data-aos="zoom-out" className="h-1 -mt-10 mb-5 bg-[#3894A1] w-50 flex justify-self-center"></div>

        <div className="grid md:grid-cols-3 gap-8">

          <div data-aos="fade-down" className="p-6 border border-blue-200 rounded-xl shadow-sm bg-white">
            <h3 className="text-xl font-semibold mb-2">Médecine Générale</h3>
            <p className="text-gray-600">
              Consultations générales pour adultes et enfants.
            </p>
          </div>

          <div data-aos="fade-down" className="p-6 border border-blue-200 rounded-xl shadow-sm bg-white">
            <h3 className="text-xl font-semibold mb-2">Pédiatrie</h3>
            <p className="text-gray-600">
              Suivi complet pour nourrissons et enfants.
            </p>
          </div>

          <div data-aos="fade-down" className="p-6 border border-blue-200 rounded-xl shadow-sm bg-white">
            <h3 className="text-xl font-semibold mb-2">Cardiologie</h3>
            <p className="text-gray-600">
              Diagnostic et prise en charge des maladies cardiaques.
            </p>
          </div>

        </div>
      </section>

      <section className="px-8 py-20 bg-white">
        <h2 data-aos="fade-down" className="text-3xl font-bold text-center mb-10">Service Médecine Générale</h2>
        <div data-aos="fade-right" className="h-1 -mt-10 mb-5 bg-[#3894A1] w-100 flex justify-self-center"></div>

        <div className="grid md:grid-cols-3 gap-8">

          <div data-aos="fade-up" className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Consultations Générales</h3>
            <p className="text-gray-600">
              Diagnostic et prise en charge des maladies courantes.
            </p>
          </div>

          <div data-aos="fade-up" className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Suivi Maladies Chroniques</h3>
            <p className="text-gray-600">
              Hypertension, diabète, asthme, cholestérol.
            </p>
          </div>

          <div data-aos="fade-up" className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Vaccinations</h3>
            <p className="text-gray-600">
              Enfants, adultes, rappels.
            </p>
          </div>

          <div data-aos="fade-up" className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Consultations Préventives</h3>
            <p className="text-gray-600">
              Check-up général et dépistage annuel.
            </p>
          </div>

          <div data-aos="fade-up" className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Certificats Médicaux</h3>
            <p className="text-gray-600">
              Certificats pour sport, école, travail.
            </p>
          </div>

          <div data-aos="fade-up" className="p-6 bg-gray-50 rounded-xl shadow-sm">
            <h3 className="text-xl font-semibold mb-2">Orientation Vers Spécialistes</h3>
            <p className="text-gray-600">
              Cardiologie, dermatologie, ORL, etc.
            </p>
          </div>

        </div>
      </section>

      <section className="px-8 py-20 bg-[#F0F1EE]">
        <h2 data-aos="fade-down" className="text-3xl font-bold text-center mb-10">Notre Équipe</h2>
        <div data-aos="fade-right" className="h-1 -mt-10 mb-5 bg-[#3894A1] w-50 flex justify-self-center"></div>

        <div className="grid md:grid-cols-2 gap-10">

          <div data-aos="fade-down" className="bg-white p-6 rounded-xl shadow text-center">
            <img
              src=""
              alt="Abdessamad"
              className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Abdessamad Benzekri</h3>
            <p className="text-gray-500 font-medium">Full-stack Developer</p>
          </div>

          <div data-aos="fade-down" className="bg-white p-6 rounded-xl shadow text-center">
            <img
              src=""
              alt="abdelkabir"
              className="w-28 h-28 mx-auto rounded-full mb-4 object-cover"
            />
            <h3 className="text-xl font-semibold">Abdelakabir Yahya Nahed</h3>
            <p className="text-gray-500 font-medium">Full-stack Developer</p>
          </div>
        </div>
      </section>

      <section className="bg-[#3894A1] text-white px-8 py-16 text-center">
        <h2 className="text-3xl font-bold">Prenez Votre Rendez-vous</h2>
        <p className="mt-2">Évitez l’attente, réservez en ligne en quelques clics.</p>
        <Link to="/rendez-vous">
        <button className="mt-4 relative h-12 overflow-hidden rounded bg-blue-950 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"><span class="relative">Réserver Maintenant</span>
        </button>
        </Link>
      </section>

      <footer className="bg-gray-900 text-gray-300 px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <h3 className="text-white font-semibold mb-2">Adresse</h3>
            <p>Rue X, Ville, Maroc</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">Contact</h3>
            <p>Tél: 06 00 00 00 00</p>
            <p>Email: contact@cabinet.com</p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-2">Horaires</h3>
            <p>Lun–Ven: 9h → 18h</p>
            <p>Samedi: 9h → 13h</p>
          </div>

        </div>
        <hr  className="mt-10"/>
        <h1 className="text-center">copyright 2025</h1>
      </footer>

    </div>
  );
}
