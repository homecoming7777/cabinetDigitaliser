import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DEFAULT_PRICE = 150; // fallback if prix not defined

export default function Dashboard() {
  /* =====================
     SAFE SELECTORS
  ====================== */
  const patients = useSelector(state =>
    Array.isArray(state.patients) ? state.patients : []
  );

  const consultations = useSelector(state =>
    Array.isArray(state.consultations)
      ? state.consultations
      : state.consultations?.list || []
  );

  const rdv = useSelector(state =>
    Array.isArray(state.rdv) ? state.rdv : state.rdv?.list || []
  );

  /* =====================
     DATES
  ====================== */
  const today = new Date().toISOString().split("T")[0];
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  /* =====================
     CA CALCULATIONS
  ====================== */
  const consultationsToday = consultations.filter(
    c => c.date === today
  );

  const consultationsThisMonth = consultations.filter(c => {
    const d = new Date(c.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const caJour = consultationsToday.reduce(
    (sum, c) => sum + (c.prix ?? DEFAULT_PRICE),
    0
  );

  const caMois = consultationsThisMonth.reduce(
    (sum, c) => sum + (c.prix ?? DEFAULT_PRICE),
    0
  );

  /* =====================
     TAUX DE PRÉSENCE
  ====================== */
  const honoredRdv = rdv.filter(r => r.status === "honored").length;
  const tauxPresence = rdv.length
    ? Math.round((honoredRdv / rdv.length) * 100)
    : 0;

  /* =====================
     PATIENT LE PLUS FRÉQUENT
  ====================== */
  const countByPatient = {};
  consultations.forEach(c => {
    countByPatient[c.patientId] =
      (countByPatient[c.patientId] || 0) + 1;
  });

  const mostFrequentId = Object.keys(countByPatient).reduce(
    (a, b) => (countByPatient[a] > countByPatient[b] ? a : b),
    null
  );

  const mostFrequentPatient = patients.find(
    p => p.id === Number(mostFrequentId)
  );

  /* =====================
     MONTHLY CA CHART
  ====================== */
  const monthlyDataMap = {};
  consultations.forEach(c => {
    const month = c.date.slice(0, 7); // YYYY-MM
    monthlyDataMap[month] =
      (monthlyDataMap[month] || 0) + (c.prix ?? DEFAULT_PRICE);
  });

  const monthlyChartData = Object.keys(monthlyDataMap).map(m => ({
    month: m,
    ca: monthlyDataMap[m],
  }));

  /* =====================
     TODAY RDV
  ====================== */
  const todayRdv = rdv.filter(r => r.date === today);

  return (
    <>
      <Navbar />

      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">
          Dashboard Cabinet Médical
        </h1>

        {/* KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="CA du jour" value={`${caJour} MAD`} />
          <Card title="CA du mois" value={`${caMois} MAD`} />
          <Card title="Nombre de patients" value={patients.length} />
          <Card title="Taux de présence" value={`${tauxPresence}%`} />
        </div>

        {/* MOST FREQUENT PATIENT */}
        <div className="mt-6 bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-2">
            Patient le plus fréquent
          </h2>
          {mostFrequentPatient ? (
            <p>
              {mostFrequentPatient.nom} {mostFrequentPatient.prenom}
            </p>
          ) : (
            <p className="text-gray-500">Aucune donnée</p>
          )}
        </div>

        {/* MONTHLY CA CHART */}
        <div className="mt-6 bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-4">CA Mensuel</h2>
          {monthlyChartData.length === 0 ? (
            <p className="text-gray-500">Aucune donnée</p>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyChartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="ca"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </>
  );
}

/* =====================
   REUSABLE CARD
====================== */
function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
