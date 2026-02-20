const sqlQuestions = {
  problems: [
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
      starterCode: ``,
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
      starterCode: ``,
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
    },

    {
      title: "Find employees earning more than 50000",
      description: `
    Let's say you're administering a SQL database system for a school. The 
    existing database is already in place when you arrive, and has a large
    amount of existing data. The schema is provided below.

    1.Gets each student’s average grade across all assignments
2.Keeps only those students in the top half of performers. Ranks them by score (descending)

Expected Output –

+------------+-----------+
| student_id | avggrade  |
+------------+-----------+
|          2 | 100.00000 |
|          6 |  90.00000 |
|         10 |  85.00000 |
|          4 |  80.50000 |
+------------+-----------+
      `,
      schemaSql: `
Create table Teachers (
  id int primary key,
  name varchar(16) not null,
  classroom int not null
);
create table Students (
  id int primary key,
  name varchar(16),
  primary_teacher_id int,
  FOREIGN KEY (primary_teacher_id) REFERENCES Teachers(id)
);

create table Assignments (
  id int primary key,
  teacher_id int not null,
  FOREIGN KEY (teacher_id) REFERENCES Teachers(id)
);

create table Grades (
  student_id int,
  assignment_id int,
  grade decimal (4,1),
  PRIMARY KEY (student_id, assignment_id),
  FOREIGN KEY (student_id) REFERENCES Students(id),
  FOREIGN KEY (assignment_id) REFERENCES Assignments(id)
);
insert into Teachers values
  (4, 'Mr. Feeny', 301), (8, 'Mr. Cooper', 260), (30, 'Ms. Finster', 301);

insert into Students values
  (1, 'Bobby', 4), (2, 'Susie', 8), (3, 'Deborah', 8),
  (4, 'Anand', 4), (5, 'Robert', 4), (6, 'Claire', 4),
  (8, 'Petra', 4), (9, 'Bruce', null), (10, 'Andrew', 4),
  (11, 'Kim', 4);
  
insert into Assignments values(1, 4), (2, 8);

insert into Grades values
  (1, 1, 100), (1, 2, 50),
  (2, 1, 100), (2, 2, 100),
  (3, 1, 40), (3, 2, 8),
  (4, 1, 80), (4, 2, 81),
  (5, 1, 30), (5, 2, 60),
  (6, 2, 90),
  (9, 1, 65), (9, 2, 65),
  (10, 1, 85);

      `,
      starterCode: ``,
      solution: `
      WITH StudentAverages AS (
    SELECT 
        g.student_id,
        AVG(g.grade) AS avggrade
    FROM Grades g
    GROUP BY g.student_id
),
Ranked AS (
    SELECT 
        student_id,
        avggrade,
        ROW_NUMBER() OVER (ORDER BY avggrade DESC) AS rn,
        COUNT(*) OVER () AS total_students
    FROM StudentAverages
)
SELECT 
    student_id,
    CAST(avggrade AS DECIMAL(10,5)) AS avggrade
FROM Ranked
WHERE rn <= total_students / 2   -- Keep only top half
ORDER BY avggrade DESC;
      `,
      hints: [
        "First, figure out how to calculate each students average grade.You’ll need to GROUP BY student_id in the Grades table and use AVG(grade)",
        "Once you have averages, you need to rank students from highest to lowest.Think about using a window function like ROW_NUMBER() or RANK() with ORDER BY avggrade DESC.",
        "To keep only the top half of performers, you’ll need to know the total number of students in your ranked list.You can get this with COUNT(*) OVER () and then filter where the rank is less than or equal to half that count."
      ]
    },

    {
      title: "The management team is now interested in analyzing the efficiency and volume of their shipments over the recent months. They want a detailed report that identifies, for each product, the month with the highest quantity shipped in the year 2023. Additionally, for products with shipments, they want to see the total quantity shipped in that peak month, alongside the product name and the month.IMPORTANT: The month should be represented by its **full name** in **text format** (e.g., August) rather than its numeric value.Products that have not been shipped at all in 2023 should not appear in the report. The report should be ordered by the product name."
     /* "Expected output:"
 "Desktop      August     30                             "
 "Laptop       April      60                             "
 "Smartphone   May        35                             "
 "Tablet       June       75"*/
,
      description: `List all products with order details including products with NO orders
      `,
      schemaSql: `
      DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Shipments CASCADE;
DROP TABLE IF EXISTS Products CASCADE;
DROP TABLE IF EXISTS Customers CASCADE;
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(255)
);
 
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(255),
    Price DECIMAL(10,2)
);
 
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    ProductID INT,
    OrderDate DATE,
    Quantity INT,
    Discount DECIMAL(5,2),
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID),
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
 
CREATE TABLE Shipments (
    ShipmentID INT PRIMARY KEY,
    ProductID INT,
    ShipmentDate DATE,
    Quantity INT,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);
 
/* End schema */
 
/* Begin test data */
 
INSERT INTO Products (ProductID, ProductName) VALUES 
(1, 'Laptop'),
(2, 'Smartphone'),
(3, 'Tablet'), 
(4, 'Desktop');
 
INSERT INTO Customers (CustomerID, CustomerName) VALUES 
(1, 'John Doe'),
(2, 'Jane Smith'),
(3, 'Emily Johnson');
 
INSERT INTO Orders (OrderID, CustomerID, ProductID, OrderDate) VALUES 
(1, 1, 1, '2023-01-01'),
(2, 2, 2, '2023-01-02'),
(3, 1, 3, '2023-02-01'),
(4, 3, 1, '2023-03-01');
 
INSERT INTO Shipments (ShipmentID, ProductID, ShipmentDate, Quantity) VALUES 
(1, 1, '2022-12-25', 20),
(2, 2, '2022-12-26', 30),
(3, 3, '2022-12-27', 15),
(4, 1, '2023-01-25', 20),
(5, 4, '2023-01-30', 25),
(6, 1, '2023-04-01', 40),
(7, 1, '2023-04-15', 20),
(8, 2, '2023-05-01', 35),
(9, 3, '2023-06-01', 60),
(10, 3, '2023-06-15', 15),
(11, 4, '2023-07-01', 25),
(12, 4, '2023-08-01', 30);

 `,
      starterCode: ``,
      solution: `
      WITH MonthlyTotals AS (
    SELECT 
        p.ProductName,
        TO_CHAR(s.ShipmentDate, 'Month') AS MonthName,
        SUM(s.Quantity) AS TotalQuantity,
        RANK() OVER (
            PARTITION BY p.ProductID 
            ORDER BY SUM(s.Quantity) DESC
        ) AS rnk
    FROM Shipments s
    JOIN Products p ON s.ProductID = p.ProductID
    WHERE EXTRACT(YEAR FROM s.ShipmentDate) = 2023
    GROUP BY p.ProductID, p.ProductName, TO_CHAR(s.ShipmentDate, 'Month')
)
SELECT 
    ProductName,
    TRIM(MonthName) AS MonthName, -- Remove extra spaces from TO_CHAR
    TotalQuantity
FROM MonthlyTotals
WHERE rnk = 1
ORDER BY ProductName;
      `,
      hints: [
        "You first need to filter shipments to only the year 2023.",
        "To find the month with the highest quantity shipped per product,",
        "To display the month name in text format (e.g., August)"
      ]
    }

  ],
  performance: [],
  refactor: [],
  unitTests: []
};

export default sqlQuestions;
