-- Drops the employees_db if it exists currently --
DROP DATABASE IF EXISTS employees_db;
-- Creates the "animals_db" database --
CREATE DATABASE employees_db;

-- Makes it so all of the following code will affect animals_db --
USE employees_db;

-- Creates the table "people" within animals_db --
CREATE TABLE department (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INTEGER(10)
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT(10) NOT NULL,
    manager_id INT(10) NOT NULL,
    PRIMARY KEY (id)
);

-- Get title and department based on ID

SELECT title, department_name
FROM role
INNER JOIN department ON role.department_id = department.id;


SELECT first_name, last_name, salary
FROM employee
INNER JOIN role ON employee.role_id = role.id;