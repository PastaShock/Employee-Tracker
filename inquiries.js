// import { selectRole, selectManager } from 'index' 
const inquirer = require('inquirer')
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
            choices: [...mainMenuChoices]
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
    }
]

// AddEmployee = JSON.stringify(personNameRole)

module.exports = { inquiries, mainMenuChoices, AddEmployee }