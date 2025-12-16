import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSelector } from "react-redux";

const DEFAULT_PRICE = 150;

export default function MonthlyCAChart() {
  const consultations = useSelector(state =>
    Array.isArray(state.consultations)
      ? state.consultations
      : state.consultations?.list || []
  );

  const data = {};

  consultations.forEach(c => {
    const month = c.date.slice(0, 7); // YYYY-MM
    data[month] = (data[month] || 0) + (c.prix ?? DEFAULT_PRICE);
  });

  const chartData = Object.keys(data).map(m => ({
    month: m,
    ca: data[m],
  }));

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold mb-4">CA Mensuel</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="ca" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
