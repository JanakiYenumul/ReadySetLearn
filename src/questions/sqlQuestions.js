const sqlQuestions = {
  problems: [
    // =========================
    // PROBLEM 1 (EASY)
    // =========================
    {
      title: "Find employees earning more than 50000",
      description: `
You are given an Employees table with the following columns:

Employees(
  id INT,
  name TEXT,
  age INT,
  department TEXT,
  salary INT
)

Data in the Employees table:
(1,'Alice',25,'HR',40000),
(2,'Bob',28,'IT',60000),
(3,'Charlie',30,'Finance',55000),
(4,'David',35,'IT',70000),
(5,'Eve',29,'HR',50000);

Write a SQL query to return the id, name, and salary
of all employees whose salary is greater than 50000.

The result should be ordered by id.
      `,
      schemaSql: `
CREATE TABLE Employees(
  id INT,
  name TEXT,
  age INT,
  department TEXT,
  salary INT
);

INSERT INTO Employees VALUES
(1,'Alice',25,'HR',40000),
(2,'Bob',28,'IT',60000),
(3,'Charlie',30,'Finance',55000),
(4,'David',35,'IT',70000),
(5,'Eve',29,'HR',50000);
      `,
      starterCode: `
SELECT id, name, salary
FROM Employees
WHERE salary > 50000
ORDER BY id;
      `,
      solution: `
SELECT id, name, salary
FROM Employees
WHERE salary > 50000
ORDER BY id;
      `,
      hints: [
        "Use a WHERE clause to filter rows",
        "Compare salary with 50000",
        "Sort the result using ORDER BY id"
      ]
    },

    // =========================
    // PROBLEM 2 (MEDIUM)
    // =========================
    {
      title: "Find average salary per department",
      description: `
You are given the Employees table.
(ID,Name,Age,Department,Salary)
(1,'Alice',25,'HR',40000),
(2,'Bob',28,'IT',60000),
(3,'Charlie',30,'Finance',55000),
(4,'David',35,'IT',70000),
(5,'Eve',29,'HR',50000)

Write a SQL query to return:
- department
- average salary of employees in that department

The average salary should be rounded to 2 decimal places.
Order the result by department name.
      `,
      schemaSql: `
CREATE TABLE Employees(
  id INT,
  name TEXT,
  age INT,
  department TEXT,
  salary INT
);

INSERT INTO Employees VALUES
(1,'Alice',25,'HR',40000),
(2,'Bob',28,'IT',60000),
(3,'Charlie',30,'Finance',55000),
(4,'David',35,'IT',70000),
(5,'Eve',29,'HR',50000);
      `,
      starterCode: `
SELECT department,
       ROUND(AVG(salary), 2) AS avg_salary
FROM Employees
GROUP BY department
ORDER BY department;
      `,
      solution: `
SELECT department,
       ROUND(AVG(salary), 2) AS avg_salary
FROM Employees
GROUP BY department
ORDER BY department;
      `,
      hints: [
        "Use GROUP BY on department",
        "Use AVG(salary) to calculate average",
        "Use ROUND(value, 2) for rounding"
      ]
    }
  ],
  performance: [],
  refactor: [],
  unitTests: []
};

export default sqlQuestions;
