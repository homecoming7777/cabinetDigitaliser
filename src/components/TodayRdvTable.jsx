import { useSelector } from "react-redux";

export default function TodayRdvTable() {
  const rdv = useSelector(state =>
    Array.isArray(state.rdv) ? state.rdv : state.rdv?.list || []
  );

  const patients = useSelector(state =>
    Array.isArray(state.patients) ? state.patients : []
  );

  const today = new Date().toISOString().split("T")[0];

  const todayRdv = rdv.filter(r => r.date === today);

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h2 className="font-semibold mb-4">Rendez-vous du jour</h2>

      {todayRdv.length === 0 ? (
        <p className="text-gray-500">Aucun rendez-vous aujourd’hui</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Patient</th>
              <th className="p-2">Statut</th>
            </tr>
          </thead>
          <tbody>
            {todayRdv.map(r => {
              const patient = patients.find(p => p.id === r.patientId);
              return (
                <tr key={r.id} className="border-t">
                  <td className="p-2">
                    {patient
                      ? `${patient.nom} ${patient.prenom}`
                      : "Inconnu"}
                  </td>
                  <td className="p-2 text-center">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        r.status === "honored"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
