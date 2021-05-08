- Drops the animals_db if it exists currently --
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
    salary DECIMAL NOT NULL,
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



-- Creates new rows containing data in all named columns --
INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Ahmed", TRUE, "Rockington", 100);

INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Ahmed", TRUE, "Rockington", 100);

INSERT INTO people (name, has_pet, pet_name, pet_age)
VALUES ("Jacob", TRUE, "Misty", 10);

INSERT INTO people (name, has_pet)
VALUES ("Peter", false);
