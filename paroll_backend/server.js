const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql",
  database: "payroll_db",
});

app.post("/employees", (req, res) => {
  const { name, base_salary } = req.body;
  const query = `INSERT INTO employees (name, base_salary) VALUES (?, ?)`;
  db.query(query, [name, base_salary], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Employee added", id: result.insertId });
  });
});

app.post("/payroll", (req, res) => {
  const { employee_id, year, month, bonus, deduction } = req.body;
  const query = `INSERT INTO payroll (employee_id, year, month, bonus, deduction) VALUES (?, ?, ?, ?, ?)`;
  db.query(
    query,
    [employee_id, year, month, bonus, deduction],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Payroll record added", id: result.insertId });
    }
  );
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/payroll", (req, res) => {
  const { year, month } = req.query;
  const query = `
    SELECT e.name, e.base_salary, p.bonus, p.deduction, p.month, p.year
    FROM payroll p
    JOIN employees e ON e.id = p.employee_id
    WHERE p.year = ? AND p.month = ?
  `;
  db.query(query, [year, month], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
