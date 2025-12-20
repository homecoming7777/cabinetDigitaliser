import Navbar from '../components/Navbar'
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { parseISO, isSameMonth, format } from "date-fns";
import {
  FaUsers,
  FaMoneyBillWave,
  FaStethoscope,
  FaChartLine,
  FaUserCheck,
} from "react-icons/fa";

export default function Dashboard() {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const patients = useSelector((state) => state.patients);
  const consultations = useSelector((state) => state.consultations.list);

  const today = new Date();

  /* =======================
     MONTH DATA
  ======================= */
  const monthConsultations = consultations.filter((c) =>
    isSameMonth(parseISO(c.date), today)
  );

  const monthRevenue = monthConsultations.reduce(
    (sum, c) => sum + Number(c.prix || 0),
    0
  );

  const avgRevenue =
    monthConsultations.length > 0
      ? Math.round(monthRevenue / monthConsultations.length)
      : 0;

  /* =======================
     MOST FREQUENT PATIENT
  ======================= */
  const consultationCount = {};

  monthConsultations.forEach((c) => {
    consultationCount[c.patient] =
      (consultationCount[c.patient] || 0) + 1;
  });

  const mostFrequentPatientId =
    Object.keys(consultationCount).length > 0
      ? Object.keys(consultationCount).reduce((a, b) =>
          consultationCount[a] > consultationCount[b] ? a : b
        )
      : null;

  const mostFrequentPatient = patients.find(
    (p) => p.id == mostFrequentPatientId
  );

  /* =======================
     CHART DATA
  ======================= */
  const revenueTimeline = monthConsultations.map((c) => ({
    date: format(parseISO(c.date), "dd MMM"),
    revenue: Number(c.prix || 0),
  }));

  /* =======================
     STYLES
  ======================= */
  const card =
    "relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all";

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6">
      {/* TITLE */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-extrabold text-slate-800 mb-10"
      >
        Clinic Performance Dashboard
      </motion.h1>

      {/* KPI CARDS */}
      <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <motion.div whileHover={{ scale: 1.05 }} className={card}>
          <FaUsers className="text-blue-500 text-4xl mb-3" />
          <p className="text-sm text-gray-500">Total Patients</p>
          <p className="text-3xl font-bold">{patients.length}</p>
        </motion.div>

        <motion.div data-aos="fade-up" whileHover={{ scale: 1.05 }} className={card}>
          <FaStethoscope className="text-purple-500 text-4xl mb-3" />
          <p className="text-sm text-gray-500">Consultations (Month)</p>
          <p className="text-3xl font-bold">
            {monthConsultations.length}
          </p>
        </motion.div>

        <motion.div data-aos="fade-up" whileHover={{ scale: 1.05 }} className={card}>
          <FaMoneyBillWave className="text-emerald-500 text-4xl mb-3" />
          <p className="text-sm text-gray-500">Monthly Revenue</p>
          <p className="text-3xl font-bold">
            {monthRevenue} MAD
          </p>
        </motion.div>

        <motion.div data-aos="fade-up" whileHover={{ scale: 1.05 }} className={card}>
          <FaChartLine className="text-orange-500 text-4xl mb-3" />
          <p className="text-sm text-gray-500">Avg / Consultation</p>
          <p className="text-3xl font-bold">
            {avgRevenue} MAD
          </p>
        </motion.div>

        {/* MOST FREQUENT PATIENT */}
        <motion.div data-aos="fade-up" whileHover={{ scale: 1.05 }} className={card}>
          <FaUserCheck className="text-pink-500 text-4xl mb-3" />
          <p className="text-sm text-gray-500">Most Frequent Patient</p>

          {mostFrequentPatient ? (
            <>
              <p className="text-lg font-bold text-slate-800">
                {mostFrequentPatient.nom}{" "}
                {mostFrequentPatient.prenom}
              </p>
              <p className="text-sm text-gray-500">
                {consultationCount[mostFrequentPatientId]} consultations
              </p>
            </>
          ) : (
            <p className="text-gray-400">No data</p>
          )}
        </motion.div>
      </div>

      {/* REVENUE CHART */}
      <motion.div data-aos="fade-up"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 shadow-lg"
      >
        <h2 className="text-xl font-semibold mb-4">
          Revenue Trend (This Month)
        </h2>

        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={revenueTimeline}>
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              fill="url(#revenueGradient)"
              strokeWidth={3}
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
        </>
  );
}
