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

const mainMenu = () => {
    return inquirer.prompt([
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
    ])
    // .then(answer => {return answer})
}

const menuAddEmployee = () => {
    return inquirer.prompt([
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
]).then(answer => {console.log(answer)})}

// inquirer.prompt(inquiries[0]).then(answer => {console.log(answer)})
mainMenu().then(menuAddEmployee())