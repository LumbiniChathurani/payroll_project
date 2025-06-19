import { useState, useEffect } from "react";
import AddEmployee from "./AddEmployee";
import AddPayroll from "./AddPayroll";

function App() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [payroll, setPayroll] = useState([]);

  const fetchPayroll = async () => {
    const res = await fetch(
      `http://localhost:3001/payroll?year=${year}&month=${month}`
    );
    const data = await res.json();
    setPayroll(data);
  };

  useEffect(() => {
    fetchPayroll();
  }, [year, month]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Payroll System</h1>

      <AddEmployee />
      <AddPayroll />

      <div className="flex gap-4 mb-6">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="border p-2 rounded"
        >
          {[2024, 2025, 2026].map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        <select
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="border p-2 rounded"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Employee</th>
            <th className="border p-2">Salary</th>
            <th className="border p-2">Month</th>
            <th className="border p-2">Year</th>
          </tr>
        </thead>
        <tbody>
          {payroll.map((entry, i) => (
            <tr key={i}>
              <td className="border p-2">{entry.name}</td>
              <td className="border p-2">
                {(Number(entry.base_salary) || 0) +
                  (Number(entry.bonus) || 0) -
                  (Number(entry.deduction) || 0)}
              </td>

              <td className="border p-2">{entry.month}</td>
              <td className="border p-2">{entry.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
