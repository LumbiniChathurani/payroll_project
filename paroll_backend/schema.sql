CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  base_salary DECIMAL(10, 2)
);

CREATE TABLE payroll (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT,
  year INT,
  month INT,
  salary DECIMAL(10, 2),
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);
