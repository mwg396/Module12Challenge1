const mysql = require('mysql2');
const inquirer = require("inquirer");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "P@ssw0rd",
    database: "employees_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected");
});

inquirer
.prompt ([
  
{
    type:"list",
    name:"initial",
    message:"What do you want to do?",
    choices: [
    "View all employees",
    "View employees by Department",
    "View all departments",
    "View all roles", 
    "Add an employee",
    "Add a department", 
    "Add a role",
     "Update an employee role"
    ]    
}
])
.then(result => {

const {initial}=result
switch (initial) {
    case "View all employees":
        viewAllEmployees()
        break;
    case "View all departments":
        viewAllDepartments()
        break;
    case "View employees by Department":
        viewEmployeesByDepartment()
        break;
    case "View all roles":
        viewAllRoles()
        break; 
    case "Add a department":
        addADeparment()
        break; 
    case "Add a role":
        addARole()
        break;
    case "Add an employee":
        addAnEmployee()
        break;
     case "Update an employee role":
        updateAnEmployeeRole()
        break;
    default:
        break;
}
})


function viewAllEmployees() {
    connection.query("SELECT * FROM employee", 
    function (err, data) {
        console.table(data);

    })
}


function viewAllDepartments() {
    connection.query("SELECT * FROM department", 
    function (err, data) {
        console.table(data);
    })
}

function viewEmployeesByDepartment() {
    connection.query("SELECT * FROM role",
    function (err, data) {
        console.table(data);
  
    })
}

function viewAllRoles() {
    connection.query("SELECT * FROM role",
    function (err, data) {
        console.table(data);
  
    })
}



function addAnEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "firstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "What is the employees role ID"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is the employees manager's ID?"
        }
    ])
        .then(function(res) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', 
        [res.firstName, res.lastName, res.roleId, res.managerId],
        function(err, data) {
            if (err) throw err;
 
        })
    })
}

function addADepartment() {
    inquirer.prompt([{
        type: "input",
        name: "addADepartment",
        message: "What is the department that you want to add?"
    },
    ])
        .then(function(res) {
        connection.query('INSERT INTO department (name) VALUES (?)', 
        [res.department], 
        function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");

        })
    })
}

function addARole() {
    inquirer.prompt([
        {
            message: "What is the Title?",
            type: "input",
            name: "title"
        }, {
            message: "What is the Salary?",
            type: "number",
            name: "salary"
        }, {
            message: "What is the Department ID Number?",
            type: "number",
            name: "department_id"
        }
    ])
        .then(function (response) {
        connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", 
        [response.title, response.salary, response.department_id], function (err, data) {
            console.table(data);
        })

    })
}

function updateAnEmployeeRole() {
    inquirer.prompt([
        {
            message: "which employee needs to be updated?",
            type: "input",
            name: "name"
        }, {
            message: "What is the new role ID?",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", 
        [response.role_id, response.name], function (err, data) {
            console.table(data);
        })

    })

}
