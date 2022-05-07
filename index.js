const inquirer = require('inquirer');
// const express = require('express');
// const routes = require('./routes');
const mysql = require('mysql2');
// const { inquiries, mainMenuChoices, AddEmployee } = require('./inquiries')
const connection = require('./config/connection');

const PORT = process.env.PORT || 3001;

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

const mainMenuChoices = [
    'View all employees',
    'employees by role',
    'Employes by department',
    'Update employees',
    'Add employee',
    'View role',
    'Add Role',
    'update role',
    'View departments',
    'Add Department',
    'quit'
]

const inquiries = 
        {
            type: 'list',
            message: 'please choose an option',
            name: 'option',
            choices: [
                'View all employees',
                'employees by role',
                'Employes by department',
                'Update employees',
                'Add employee',
                'View role',
                'Add Role',
                'update role',
                'View departments',
                'Add Department',
                'quit'
            ]
        }

const AddEmployee = [
    {
        name: 'firstname',
        type: 'input',
        message: 'Enter the employee\'s first name'
    },
    {
        name: 'lastname',
        type: 'input',
        message: 'Enter the Employee\'s last name'
    },
    {
        name: 'role',
        type: 'list',
        message: 'What is the Employee\'s role?',
        choices: ['array', 'of', 'stuff']
    },
    {
        name: 'manager',
        type: 'rawlist',
        message: 'Who does the employee report to?',
        choices: ['array', 'of', 'stuff']
    },
]

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
    inquirer.prompt(AddEmployee).tben(answers => {
        console.log(answers)
    })
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

mainMenuFunctions = {
    addEmployee: () => {
        addEmployee();
    }
}

function main() {
    let option = inquirer.prompt(inquiries)
    .then(answers => {return answers}).then(() => {
    for (let i = 0; i < mainMenuChoices.length; i++) {
        console.log(mainMenuChoices[i])
        if (option === mainMenuChoices[i]) {
            mainMenuFunctions[i]
        }
    }})
}
main()