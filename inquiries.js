// import { selectRole, selectManager } from 'index' 
const inquirer = require('inquirer')
const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

const mainMenuChoices = [
    'View all employees',
    'employees by role',
    'Employees by department',
    'Update employees',
    'Add employee',
    'View roles',
    'Add Role',
    'Update role',
    'View departments',
    'Add Department',
    'quit'
]

let roles = async () => {
    const res_1 = await new Promise((res, rej) => {
        connection.query(
            `SELECT title FROM roles;`,
            (err, rows) => {
                if (rows === undefined) {
                    rej(new Error("Error"));
                } else {
                    res(rows);
                }
            });
    });
    let rolArr = [];
    res_1.forEach(element => {
        rolArr.push(element.title);
    });
    return rolArr;
}

rolesArr = roles()

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
        choices: rolesArr,
    },
]

// AddEmployee = JSON.stringify(personNameRole)

module.exports = { inquiries, mainMenuChoices, AddEmployee }