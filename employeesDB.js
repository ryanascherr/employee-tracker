const mysql = require('mysql');
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port, if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'rootroot',
  database: 'employees_db',
});

const start = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "answer",
            message: "How to you want to do?",
            choices: ["Add a department", "Add a role", "Add an employee", "View departments", "View roles", "View employees", "Update employee roles"],
        }
    ]).then(({answer}) => {
        switch(answer) {
            case "Add a department":
                addDepartment();
                break;
            case "Add a role":
                addRole();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "View departments":
                viewDepartments();
                break;
            case "View roles":
                viewRoles();
                break;
            case "View employees":
                viewEmployees();
                break;
            case "Update employee roles":
                updateEmployeeRole();
                break;
        }
    })
}

const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "answer",
            message: "Please enter the name of the department you wish to add:"
        }
    ]).then(({answer}) => {
        const query = connection.query('INSERT INTO department SET ?',
        {
            department_name: answer,
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} department inserted!\n`);
            start();
        })
    })
}

const addRole = () => {
    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the title of the role?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the salary of the role?"
        },
        {
            name: "department_id",
            type: "input",
            message: "What is the department id of the role?"
        }
    ]).then((answer) => {
        console.log(answer)
        connection.query('INSERT INTO role SET ?',
        {
            title: answer.title,
            salary: answer.salary,
            department_id: answer.department_id
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} role inserted!\n`);
            start();
        })
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the first name of the employee?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the last name of the employee?"
        },
        {
            name: "role_id",
            type: "input",
            message: "What is the role id of the employee?"
        },
        {
            name: "manager_id",
            type: "input",
            message: "What is the manager id of the employee?"
        }
    ]).then((answer) => {
        console.log(answer)
        connection.query('INSERT INTO employee SET ?',
        {
            first_name: answer.first_name,
            last_name: answer.last_name,
            role_id: answer.role_id,
            manager_id: answer.manager_id
        },
        (err, res) => {
            if (err) throw err;
            console.log(`${res.affectedRows} employee inserted!\n`);
            start();
        })
    })
}

const viewDepartments = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
}

const viewRoles = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
}

const viewEmployees = () => {
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    })
}

const updateEmployeeRole = () => {
    let arrayOfNames = [];
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            let fullName = res[i].first_name + " " + res[i].last_name;
            arrayOfNames.push(fullName);
        }
        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "Which employee do you want to update?",
                choices: arrayOfNames, 
            },
        ]).then((answer) => {
            testFunction(answer);
        })
    })
}

const testFunction = (name) => {
    let arrayOfRoles = [];
    console.log(name);
    let firstName = name.split(" ");
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            let role = res[i].role_id;
            arrayOfRoles.push(role);
        }
        inquirer.prompt([
            {
                name: "role",
                type: "list",
                message: `What is ${firstName[0]}'s new role?`,
                choices: arrayOfRoles, 
            },
        ]).then((answer) => {
            console.log("Hey!");
        })
    })
}

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    start();
  });

