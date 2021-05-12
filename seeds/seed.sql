-- Creates new rows containing data in all named columns --
INSERT INTO department (department_name)
VALUES ("Ministry of the Arcane");

INSERT INTO department (department_name)
VALUES ("Gladiators");

INSERT INTO department (department_name)
VALUES ("Divine Magiks");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 100000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Worker", 50000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Intern", 25000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bob", "Jobs", 1, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Katie", "Kaminksi", 1, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Ray", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sarah", "Ray", 2, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jeremy", "Bearimy", 3, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Mary", "Berry", 3, 2);