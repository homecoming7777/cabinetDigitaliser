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
  PieChart,
  Pie,
  Cell,
  Legend,
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
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const patients = useSelector((state) => state.patients);
  const consultations = useSelector((state) => state.consultations.list);

  const today = new Date();
  const currentYear = today.getFullYear();

  const monthConsultations = consultations.filter((c) => {
    const date = new Date(c.date);
    return (
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  });

  const monthRevenue = monthConsultations.reduce(
    (total, c) => total + Number(c.prix || 0),
    0
  );

  const avgRevenue =
    monthConsultations.length > 0
      ? Math.round(monthRevenue / monthConsultations.length)
      : 0;

  const consultationCount = {};
  monthConsultations.forEach((c) => {
    consultationCount[c.patient] = (consultationCount[c.patient] || 0) + 1;
  });

  let mostFrequentPatient = null;
  let maxConsultations = 0;
  patients.forEach((p) => {
    const count = consultationCount[p.id] || 0;
    if (count > maxConsultations) {
      maxConsultations = count;
      mostFrequentPatient = p;
    }
  });

  const revenueTimeline = Array.from({ length: 12 }, (_, i) => {
    const month = i;
    const monthRevenue = consultations
      .filter((c) => {
        const date = new Date(c.date);
        return date.getFullYear() === currentYear && date.getMonth() === month;
      })
      .reduce((sum, c) => sum + Number(c.prix || 0), 0);

    return {
      month: format(new Date(currentYear, i, 1), "MMM"),
      revenue: monthRevenue,
    };
  });

  const typeCount = {};
  consultations.forEach((c) => {
    typeCount[c.type] = (typeCount[c.type] || 0) + 1;
  });

  const pieData = Object.keys(typeCount).map((key) => ({
    name: key,
    value: typeCount[key],
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#8dd1e1"];

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <div className={cardStyle}>
            <FaUsers className="text-blue-500 text-4xl mb-3" />
            <p className="text-sm text-gray-500">Total Patients</p>
            <p className="text-3xl font-bold">{patients.length}</p>
          </div>

          <div className={cardStyle}>
            <FaStethoscope className="text-purple-500 text-4xl mb-3" />
            <p className="text-sm text-gray-500">Consultations (Month)</p>
            <p className="text-3xl font-bold">{monthConsultations.length}</p>
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Revenue Trend (Month by Month)
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueTimeline}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `${value} MAD`} />
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

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Consultation Types Distribution
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}
