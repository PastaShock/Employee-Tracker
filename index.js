const inquirer = require('inquirer');
const mysql = require('mysql2');
const connection = require('./config/connection');
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
                let sql = `SELECT employee.id, 
                      employee.first_name, 
                      employee.last_name, 
                      role.title, 
                      department.name AS department,
                      role.salary, 
                      CONCAT (manager.first_name, " ", manager.last_name) AS manager
               FROM employee
                      LEFT JOIN role ON employee.role_id = role.id
                      LEFT JOIN department ON role.department_id = department.id
                      LEFT JOIN employee manager ON employee.manager_id = manager.id`;
                      connection.promise().query(sql, (err, rows) => {
                          if (err) throw err;
                          console.table(rows);
                      }) 
                break;
            case 'employees by role':
                console.log('role: [...employees]')
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