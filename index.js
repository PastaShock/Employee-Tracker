const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();
// const connection = require('./config/connection');
const { inquiries, mainMenuChoices, AddEmployee } = require('./inquiries');

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
    mainMenu();
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

// end of file
// () => {
//     connection.query(`SOURCE db/seed.sql`)
//     return;
// }

const mainMenu = () => {
    inquirer.prompt([inquiries])
        .then(answer => { return answer })
        // inquirer.prompt(inquiries[0]).then(answer => {console.log(answer)})
        .then(
            answer => {
                console.log(answer.option)
                switch (answer.option) {
                    case 'View all employees':
                        viewEmployees();
                    case 'employees by role':
                        employeesByRole();
                    case 'Employees by department':
                        connection.query(`
                    SELECT * FROM department 
                    left join roles on roles.department_id = department.id 
                    left join employees on roles.id = employees.role_id;
                `, (err, rows) => {
                            if (err) throw err;
                            console.table.apply(rows);
                        })
                    // mainMenu();
                    case 'Update employees':
                        inquirer.prompt(AddEmployee).then(answer => {
                            console.log(AddEmployee[2].choices.indexOf(answer.role));
                            connection.query(`
                    INSERT INTO employees (first_name, last_name, role_id)
                    VALUES ('${answer.firstname}', '${answer.lastname}', ${AddEmployee[2].choices.indexOf(answer.role) + 1})
                    ;`)
                        })
                    // mainMenu();
                    case 'Add employee':
                        menuAddEmployee();
                    // inquirer.prompt(AddEmployee).then(answer => {
                    //     console.log(AddEmployee[2].choices.indexOf(answer.role));
                    //     connection.query(`
                    //     INSERT INTO employees (first_name, last_name, role_id)
                    //     VALUES ('${answer.firstname}', '${answer.lastname}', ${AddEmployee[2].choices.indexOf(answer.role) + 1})
                    //     ;`)
                    // })
                    // mainMenu();
                    case 'View roles':
                        connection.query(`
                    SELECT roles.title, roles.salary, department.dep_name AS department FROM roles
                    INNER JOIN department ON roles.department_id = department.id;
                `, (err, rows) => {
                            if (err) throw err;
                            // console.log(rows);
                            console.table(rows);
                        })
                    // mainMenu();
                    case 'Add Role':
                        addRole();
                    case 'Update role':

                    // mainMenu();
                    case 'View departments':

                    // mainMenu();
                    case 'Add department':

                    // mainMenu();
                    case 'quit':
                        process.exit();
                    default:
                        console.log('no options selected? YEETing')
                        process.exit();
                }
            }
        )
}

const viewEmployees = () => {
    console.log('view all');
    // create an SQL query that looks in the table employees and lists all
    let sql = `SELECT * FROM employees
                LEFT JOIN roles ON employees.role_id = roles.id
                LEFT JOIN department ON roles.department_id = department.id`;
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        console.table(rows);
    })
    mainMenu();
}

const employeesByRole = () => {
    console.log('role: [...employees]')
    connection.query(`
                SELECT * FROM roles
                LEFT JOIN employees ON roles.id = employees.role_id
                LEFT JOIN department ON roles.department = department.id;
                            `, (err, rows) => {
        if (err) throw err;
        console.table.apply(rows);
    })
    mainMenu();
}

addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Name the role\'s title: ',
            validate: title => {
                if (!title) {
                    console.log('please enter a name');
                };
            }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter in the salary:',
            validate: salary => {
                if (typeof (salary !== Number)) {
                    console.log('please enter a valid salary')
                }
            }
        }
    ])
        //.then(answer => {
        //     connection.promise().query(`SELECT dep_name, id FROM department`, (err, rows) => {
        //         if (err) throw err;
        //         let departments = rows.map(({ name, id }) => ({ name: name, value: id }))
        //         inquirer.prompt([
        //             {
        //                 type: 'list',
        //                 name: 'department',
        //                 message: 'Please select the department for this role:',
        //                 choices: departments,
        //                 validate: department => {
        //                     if (!department) {
        //                         console.log('please select an option')
        //                     }
        //                 }
        //             }
        //         ]).then(answer => {
        //             dep_choice = answer.department;
        //             console.log(answer)
        //         })
        //     })
        // })
        .then(answer => {
            console.log(answer);
            mainMenu();
        })
    // connection.query(`
    // INSERT INTO roles (title, salary, department_id)
    // VALUES ('${answer.title}', ${answer.salary}, ${answer.department_id})
    // `)
}

const menuAddEmployee = () => {
    return inquirer.prompt(AddEmployee).then(answer => {
        console.log(AddEmployee[2].choices.indexOf(answer.role));
        connection.query(`
                    INSERT INTO employees (first_name, last_name, role_id)
                    VALUES ('${answer.firstname}', '${answer.lastname}', ${AddEmployee[2].choices.indexOf(answer.role) + 1})
                    ;`)
    })
        .then(
            mainMenu()
        )
}