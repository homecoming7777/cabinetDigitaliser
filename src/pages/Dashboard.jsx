import React from "react";
import { useSelector } from "react-redux";
import { format, isSameDay, isSameMonth, parseISO } from "date-fns";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const patients = useSelector((state) => state.patients);
  const rdvs = useSelector((state) => state.rdv.list);
  const consultations = useSelector((state) => state.consultations.list);

  const today = new Date();

  // --- Revenue calculations ---
  const todayRevenue = consultations
    .filter((c) => isSameDay(parseISO(c.date), today))
    .reduce((sum, c) => sum + c.prix, 0);

  const monthRevenue = consultations
    .filter((c) => isSameMonth(parseISO(c.date), today))
    .reduce((sum, c) => sum + c.prix, 0);

  // --- Consultation counts ---
  const todayConsultations = consultations.filter((c) =>
    isSameDay(parseISO(c.date), today)
  ).length;

  const monthConsultations = consultations.filter((c) =>
    isSameMonth(parseISO(c.date), today)
  ).length;

  // --- Appointments ---
  const honoredAppointments = rdvs.filter((r) => r.status === "honored").length;
  const missedAppointments = rdvs.filter((r) => r.status === "missed").length;

  return (
    <>
      <Navbar></Navbar>
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Total Patients</h2>
          <p className="text-2xl">{patients.length}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Consultations Today</h2>
          <p className="text-2xl">{todayConsultations}</p>
          <p className="text-sm text-gray-500">Revenue: ${todayRevenue}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Consultations This Month</h2>
          <p className="text-2xl">{monthConsultations}</p>
          <p className="text-sm text-gray-500">Revenue: ${Number(monthRevenue)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Honored Appointments</h2>
          <p className="text-2xl">{honoredAppointments}</p>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">Missed Appointments</h2>
          <p className="text-2xl">{missedAppointments}</p>
        </div>
      </div>
    </div>
    </>
  );
}
