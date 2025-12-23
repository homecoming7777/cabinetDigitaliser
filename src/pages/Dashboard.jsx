import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { format } from "date-fns";

import {
  FaUsers,
  FaMoneyBillWave,
  FaStethoscope,
  FaChartLine,
  FaUserCheck,
} from "react-icons/fa";

export default function Dashboard() {

  /* ===== Init animations ===== */
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  /* ===== Get data from Redux ===== */
  const patients = useSelector((state) => state.patients);
  const consultations = useSelector((state) => state.consultations.list);

  const today = new Date();

  /* ===== Filter consultations of current month ===== */
  const monthConsultations = consultations.filter((c) => {
    const date = new Date(c.date);
    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  });

  /* ===== Monthly revenue ===== */
  const monthRevenue = monthConsultations.reduce(
    (total, c) => total + Number(c.prix || 0),
    0
  );

  /* ===== Average revenue ===== */
  const avgRevenue =
    monthConsultations.length > 0
      ? Math.round(monthRevenue / monthConsultations.length)
      : 0;

  /* ===== Count consultations per patient ===== */
  const consultationCount = {};

  monthConsultations.forEach((c) => {
    consultationCount[c.patient] =
      (consultationCount[c.patient] || 0) + 1;
  });

  /* ===== Most frequent patient ===== */
  let mostFrequentPatient = null;
  let maxConsultations = 0;

  patients.forEach((p) => {
    const count = consultationCount[p.id] || 0;
    if (count > maxConsultations) {
      maxConsultations = count;
      mostFrequentPatient = p;
    }
  });

  /* ===== Chart data ===== */
  const revenueTimeline = monthConsultations.map((c) => ({
    date: format(new Date(c.date), "dd MMM"),
    revenue: Number(c.prix || 0),
  }));

  const cardStyle =
    "bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all";

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">

        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-slate-800 mb-10"
        >
          Clinic Performance Dashboard
        </motion.h1>

        {/* ===== Stats cards ===== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">

          <div className={cardStyle}>
            <FaUsers className="text-blue-500 text-4xl mb-3" />
            <p className="text-sm text-gray-500">Total Patients</p>
            <p className="text-3xl font-bold">{patients.length}</p>
          </div>

          <div className={cardStyle}>
            <FaStethoscope className="text-purple-500 text-4xl mb-3" />
            <p className="text-sm text-gray-500">Consultations (Month)</p>
            <p className="text-3xl font-bold">
              {monthConsultations.length}
            </p>
          </div>

          <div className={cardStyle}>
            <FaMoneyBillWave className="text-emerald-500 text-4xl mb-3" />
            <p className="text-sm text-gray-500">Monthly Revenue</p>
            <p className="text-3xl font-bold">{monthRevenue} MAD</p>
          </div>

          <div className={cardStyle}>
            <FaChartLine className="text-orange-500 text-4xl mb-3" />
            <p className="text-sm text-gray-500">Avg / Consultation</p>
            <p className="text-3xl font-bold">{avgRevenue} MAD</p>
          </div>

          <div className={cardStyle}>
            <FaUserCheck className="text-pink-500 text-4xl mb-3" />
            <p className="text-sm text-gray-500">Most Frequent Patient</p>

            {mostFrequentPatient ? (
              <>
                <p className="font-bold">
                  {mostFrequentPatient.nom} {mostFrequentPatient.prenom}
                </p>
                <p className="text-sm text-gray-500">
                  {maxConsultations} consultations
                </p>
              </>
            ) : (
              <p className="text-gray-400">No data</p>
            )}
          </div>
        </div>

        {/* ===== Chart ===== */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">
            Revenue Trend (This Month)
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={revenueTimeline}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
