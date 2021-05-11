const mysql = require('mysql');
const inquirer = require("inquirer");
let employeeID;

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
                chooseEmployee();
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

const chooseEmployee = () => {
    let arrayOfNames = [];
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            let fullName = res[i].first_name + " " + res[i].last_name;
            arrayOfNames.push(fullName);
            employeeID = res[i].id;
            console.log(employeeID);
        }
        inquirer.prompt([
            {
                name: "employee",
                type: "list",
                message: "Which employee do you want to update?",
                choices: arrayOfNames, 
            },
        ]).then((answer) => {
            chooseRole(answer);
        })
    })
}

const chooseRole = (name) => {
    let arrayOfRoles = [];
    name = JSON.stringify(name);
    let test = name.split(':');
    test = test[1];
    test = test.slice(0, -2).slice(1).split(" ");
    let firstName = test[0];
    let lastName = test[1];
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            let role = res[i].title;
            arrayOfRoles.push(role);
        }
        inquirer.prompt([
            {
                name: "role",
                type: "list",
                message: `What is ${firstName}'s new role?`,
                choices: arrayOfRoles, 
            },
        ]).then((answer) => {
            updateEmployee(answer, firstName, lastName);
        })
    })
}

const updateEmployee = (role, firstName, lastName) => {
    console.log(firstName);
    console.log(lastName);
    connection.query('UPDATE employee SET ? WHERE ?'),
    [
        {
            role_id: 7,
        },
        {
            last_name: lastName,
        },
    ],
    (err, res) => {
        if (err) throw err;
        console.log(`${res.affectedRows} employee updated!\n`);
        start();
      }
  
}

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);
    start();
  });

