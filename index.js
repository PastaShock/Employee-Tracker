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
                        return getDeps();
                        // return viewEmployees();
                    case 'employees by role':
                        return employeesByRole();
                    case 'Employees by department':
                        return employeesByDep();
                    case 'Update employees':
                        return updateEmployee();
                    case 'Add employee':
                        return menuAddEmployee();
                    case 'View roles':
                        return viewRoles();
                    case 'Add Role':
                        return addRole();
                    case 'Update role':

                    // mainMenu();
                    case 'View departments':
                        return showDeps().then((res) => { console.log(res) })
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
    connection.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows)
        }).then(
            mainMenu()
        )
}

const employeesByRole = () => {
    console.log('role: [...employees]')
    let sql = `SELECT * FROM roles
                LEFT JOIN employees ON roles.id = employees.role_id
                LEFT JOIN department ON roles.department_id = department.id;
            `
    connection.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows)
        }).then(
            mainMenu()
        )
}

const employeesByDep = () => {
    console.log('dep: [...employees]')
    let sql = `SELECT * FROM department
                LEFT JOIN roles ON department.id = roles.department_id
                LEFT JOIN employees ON roles.id = employees.role_id;
            `;
    connection.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows)
        }).then(
            mainMenu()
        )
}

const updateEmployee = () => {
    inquirer.prompt(AddEmployee).then(answer => {
        console.log(AddEmployee[2].choices.indexOf(answer.role));
        connection.promise().query(`
            INSERT INTO employees (first_name, last_name, role_id)
            VALUES ('${answer.firstname}', '${answer.lastname}', ${AddEmployee[2].choices.indexOf(answer.role) + 1});
        `)
            .then(([rows, fields]) => {
                console.table(rows)
            })
            .then(
                mainMenu()
            )
    })
    // mainMenu();
}

const menuAddEmployee = () => {
    return inquirer.prompt(AddEmployee).then(answer => {
        console.log(AddEmployee[2].choices.indexOf(answer.role));
        connection.promise().query(`
            INSERT INTO employees (first_name, last_name, role_id)
            VALUES ('${answer.firstname}', '${answer.lastname}', ${AddEmployee[2].choices.indexOf(answer.role) + 1});
        `)
            .then(([rows, fields]) => {
                console.table(rows)
            })
            .then(
                mainMenu()
            )
    })
}

const viewRoles = () => {
    let sql = `
        SELECT title, salary, department_id, dep_name from roles
        LEFT JOIN department on roles.department_id = department.id;
    `
    connection.promise().query(sql)
        .then(([rows, fields]) => {
            console.table(rows)
        })
        .then(
            mainMenu()
        )
}

const addRole = () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Name the role\'s title: ',
            // validate: title => {
            //     if (!title) {
            //         console.log('please enter a name');
            //     };
            // }
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter in the salary:',
            // validate: salary => {
            //     if (typeof (salary !== Number)) {
            //         console.log('please enter a valid salary')
            //     }
            // }
        }
    ])
        .then(answer => {
            // connection.promise().query(`SELECT dep_name, id FROM department`)
            //     .then(([rows, fields]) => {
            //         // let departments = rows.map(({ name, id }) => ({ name: name, value: id }))
            //         let departments = connection.query(`SELECT dep_name FROM department`, deps => {
            //             return deps;
            //         })
            answer.department = inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'Please select the department for this role:',
                    choices: ((getDeps())),
                    validate: department => {
                        if (!department) {
                            console.log('please select an option')
                        }
                    }
                }
            ])})
            // console.log(answer)
        // }).then( answer => {
        //     console.log(answer);
        //     mainMenu();
        // });
    // connection.query(`
    // INSERT INTO roles (title, salary, department_id)
    // VALUES ('${answer.title}', ${answer.salary}, ${answer.department_id})
    // `)
    // })
};

const getDeps = () => {
    return new Promise((res, rej) => {
        connection.query(
            `SELECT dep_name FROM department;`,
            (err, rows) => {
                if (rows === undefined) {
                    rej(new Error("Error"));
                } else {
                    res(rows);
                }
            })
    }).then(
        (res) => {
            let depArr = []
            res.forEach(element => {
                depArr.push(element.dep_name) 
            })
            console.log(depArr)
            return depArr
        })
}