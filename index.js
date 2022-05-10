const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
// const connection = require('./config/connection');
const { inquiries, mainMenuChoices, AddEmployee } = require('./inquiries');
const cTable = require('console.table');

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
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});
connection.connect(err => {
    if (err) throw err;
    console.log(`connect as id ${connection.threadId}`)
});
// const mainMenuChoices = [
//     'View all employees',
//     'employees by role',
//     'Employes by department',
//     'Update employees',
//     'Add employee',
//     'View role',
//     'Add Role',
//     'update role',
//     'View departments',
//     'Add Department',
//     'quit'
// ]

const mainMenu = () => {
    return inquirer.prompt([inquiries])
        .then(answer => { return answer })
}

const menuAddEmployee = () => {
    return inquirer.prompt(AddEmployee
    ).then(answer => { console.log(answer) })
}

// inquirer.prompt(inquiries[0]).then(answer => {console.log(answer)})
mainMenu().then(
    answer => {
        console.log(answer.option)
        switch (answer.option) {
            case 'View all employees':
                console.log('view all');
                // create an SQL query that looks in the table employees and lists all
                let sql = `SELECT employees.id, 
                      employees.first_name, 
                      employees.last_name, 
                      roles.title, 
                      department.name AS department,
                      roles.salary, 
                      CONCAT (managers.first_name, " ", managers.last_name) AS manager
               FROM employees
                      LEFT JOIN roles ON employees.role_id = roles.id
                      LEFT JOIN department ON roles.department_id = department.id
                      LEFT JOIN employees managers ON employees.manager_id = managers.id`;
                      connection.query(sql, (err, rows) => {
                          if (err) throw err;
                          console.table(rows);
                      }) 
                break;
            case 'employees by role':
                console.log('role: [...employees]')
                mysql.query(`SHOW DATABASES;`, (err, rows) => {
                    if (err) throw err;
                    console.table.apply(rows);
                })
                break;
            case 'Employees by department':

                break;
            case 'Update employees':
            
                break;
            case 'Add employee':
                menuAddEmployee();
                break;
            case 'View role':

                break;
            case 'Add role':

                break;
            case 'Update role':

                break;
            case 'View departments':

                break;
            case 'Add department':

                break;
            case 'quit':
                process.exit();
            default:
                process.exit();
        }
    }
)