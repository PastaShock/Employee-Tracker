const inquirer = require('inquirer');
// const express = require('express');
// const routes = require('./routes');
const mysql = require('mysql2');
const { inquiries, mainMenuChoices} = require('./inquiries')
const connection = require('./config/connection');

// const app = express();
const PORT = process.env.PORT || 3001;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// turn on routes
// app.use(routes);

// turn on connection to db and server
// sequelize.sync({ force: false }).then(() => { app.listen(PORT, () => console.log('Now listening'));
// });


// print the splash image to the terminal
console.log(
    `
    ======================================
    ████████╗███████╗'█████╗'███╗'''███╗''
    ╚══██╔══╝██╔════╝██╔══██╗████╗'████║''
    '''██║'''█████╗''███████║██╔████╔██║''
    '''██║'''██╔══╝''██╔══██║██║╚██╔╝██║''
    '''██║'''███████╗██║''██║██║'╚═╝'██║''
    '''╚═╝'''╚══════╝╚═╝''╚═╝╚═╝'''''╚═╝''
    ███╗'''███╗███╗'''██╗'██████╗'██████╗'
    ████╗'████║████╗''██║██╔════╝'██╔══██╗
    ██╔████╔██║██╔██╗'██║██║''███╗██████╔╝
    ██║╚██╔╝██║██║╚██╗██║██║'''██║██╔══██╗
    ██║'╚═╝'██║██║'╚████║╚██████╔╝██║''██║
    ╚═╝'''''╚═╝╚═╝''╚═══╝'╚═════╝'╚═╝''╚═╝
    ======================================
    =welcome to the SQL team manager app!=
   `
)


function main() {
    let answersObj = [];
    inquirer.prompt(inquiries).then(answers => {
        answersObj = answers;
    }).then(() => {
        for (let i = 0; i < mainMenuChoices.length; i++) {
            if (answersObj === mainMenuChoices[i]) {
                mainMenuFunctions[i]();
            }
        }
    })
}

// selectRole = () => {
//     connection.promise().query(
//         `SELECT role.id, role.title, department.name AS department
//         FROM role
//         INNER JOIN department ON role.department_id = department.id`, ( err, rows ) => {
//             if (err) throw err;
//             console.table(rows);
//             main();
//         });
// };

// run the inquirer prompts
// list database tasks
// what would you like to do?
// view all employees
function viewEmployees() {
    // get employees from mysql instance
    console.log('viewing employees...')
}
function employeeByRole() {
    console.log('viewing employee by role')
}
function employeeByDept() {
    console.log('viewing employee by department')
}
// add employee
function addEmployee() {
    console.log('adding employee')
}
    // employee name?
    // employee role?
    // employee's manager?
function updateEmployee() {
    console.log('updating employee')
}
// update
    // select employee
    // select role
function viewRole() {
    console.log('viewing roles')
}
    // view roles
    // get all roles from db
function addRole() {
    console.log('adding role')
}
function updateRole() {
    console.log('updating role')
}
// add role
    // prompt for role name
    // for the salary
    // for the department the role belongs to
function viewDept() {
    console.log('viewing departments')
}
    // view depts
    // get a list of all depts from the db
function addDept() {
    console.log('adding departments')
}
// add depts
// add dept to the db
function quit() {
    console.log('quitting')
    connection.end()
}


mainMenuFunctions = [
    viewEmployees(),
    employeeByRole(),
    employeeByDept(),
    updateEmployee(),
    addEmployee(),
    viewRole(),
    addRole(),
    updateRole(),
    viewDept(),
    addDept(),
    quit()
]

connection.connect(err => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}` )
    // main();
})

main();