import { useState, useEffect } from "react";

function AddEmployee() {
  const [name, setName] = useState("");
  const [baseSalary, setBaseSalary] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:3001/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, base_salary: baseSalary }),
    });
    alert("Employee added!");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Add Employee</h2>
      <input
        className="border p-2 mr-2"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        className="border p-2 mr-2"
        type="number"
        value={baseSalary}
        onChange={(e) => setBaseSalary(e.target.value)}
        placeholder="Base Salary"
        required
      />
      <button className="bg-blue-500 text-white p-2 rounded">Add</button>
    </form>
  );
}
export default AddEmployee;
