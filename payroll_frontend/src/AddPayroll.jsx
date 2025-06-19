import { useState, useEffect } from "react";

function AddPayroll() {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [bonus, setBonus] = useState("");
  const [deduction, setDeduction] = useState("");
  const [salary, setSalary] = useState("");
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);

  useEffect(() => {
    fetch("http://localhost:3001/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/payroll", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        employee_id: employeeId,
        year,
        month,
        salary,
        bonus,
        deduction,
      }),
    });
    alert("Payroll added!");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Add Payroll</h2>
      <select
        className="border p-2 mr-2"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        required
      >
        <option value="">Select Employee</option>
        {employees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name}
          </option>
        ))}
      </select>
      <input
        className="border p-2 mr-2"
        type="number"
        value={bonus}
        onChange={(e) => setBonus(e.target.value)}
        placeholder="Bonus"
        required
      />
      <input
        className="border p-2 mr-2"
        type="number"
        value={deduction}
        onChange={(e) => setDeduction(e.target.value)}
        placeholder="Deduction"
        required
      />
      {/*
      <input
        className="border p-2 mr-2"
        type="number"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        placeholder="Salary"
        required
      />
     */}

      <select
        className="border p-2 mr-2"
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
      <select
        className="border p-2 mr-2"
        value={year}
        onChange={(e) => setYear(Number(e.target.value))}
      >
        {[2024, 2025, 2026].map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
      <button className="bg-green-500 text-white p-2 rounded">Add</button>
    </form>
  );
}

export default AddPayroll;
