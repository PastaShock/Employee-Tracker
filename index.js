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
                        return viewEmployees();
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
                        return updateRole();
                    case 'View departments':
                        return showDeps().then((res) => { console.log(res) })
                    case 'Add department':

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

const updateEmployee = async () => {
    // set up for the update
    // get the employees list to prompt in inquierer:
    let choices = await employees();
    // prompt the user to select an employee to update:
    const answer = await inquirer.prompt([
        {
            name: 'employee',
            type: 'list',
            message: 'Select an employee to edit',
            // choices is pulled from an sql query
            choices: choices
        }
    ]);
    // the return from inquierer is answer, we create an index to match that employee since sql starts at 1, not 0
    empInd = choices.indexOf(answer.employee) + 1;
    // log the selection to the user:
    console.log(`selected employee ${answer.employee} @ ${empInd}`)
    // get the information for the employee from the db
    connection.promise().query(`SELECT * FROM employees
                                LEFT JOIN roles on employees.role_id = roles.id
                                WHERE employees.id = ${empInd};
    `).then(
        ([rows, fields]) => {
            console.table(rows)
        }
    )
    await inquirer.prompt([
        {
            name: 'empProps',
            type: 'list',
            message: 'Select a property to edit:',
            choices: ['first_name', 'last_name', 'role', 'exit'],
        }
    ])
        .then(async answer => {
            switch (answer.empProps) {
                case 'first_name':
                    console.log('selected first')
                    return inquirer.prompt([{
                        name: 'first',
                        type: 'input',
                        message: 'Please enter the new first name',
                    }]).then(answer => {
                        connection.promise().query(`
                        UPDATE employees SET first_name = '${answer.first}'
                        WHERE id = ${empInd};
                    `)
                        console.log('Updated first name!')
                        connection.promise().query(`
                        SELECT * FROM employees
                        LEFT JOIN roles ON employees.role_id = roles.id
                        WHERE employees.id = ${empInd};
                    `).then(([rows, fields]) => {
                            console.table(rows)
                        })
                        mainMenu();
                    })
                case 'last_name':
                    console.log('selected last')
                    return inquirer.prompt([{
                        name: 'last',
                        type: 'input',
                        message: 'Please enter the new last name',
                    }]).then(answer => {
                        connection.promise().query(`
                        UPDATE employees SET last_name = '${answer.last}'
                        WHERE id = ${empInd};
                    `)
                        console.log('Updated last name!')
                        connection.promise().query(`
                        SELECT * FROM employees
                        LEFT JOIN roles ON employees.role_id = roles.id
                        WHERE employees.id = ${empInd};
                    `).then(([rows, fields]) => {
                            console.table(rows)
                        })
                        mainMenu();
                    })
                case 'role':
                    console.log('selected role')
                    let choices = await roles();
                    return inquirer.prompt([{
                        name: 'role',
                        type: 'list',
                        message: 'Please enter the new role',
                        choices: choices,
                    }]).then(answer => {
                        connection.promise().query(`
                        UPDATE employees SET role_id = '${choices.indexOf(answer.role) + 1}'
                        WHERE id = ${empInd};
                    `)
                        console.log('Updated role name!')
                        connection.promise().query(`
                        SELECT * FROM employees
                        LEFT JOIN roles ON employees.role_id = roles.id
                        WHERE employees.id = ${empInd};
                    `).then(([rows, fields]) => {
                            console.table(rows)
                        })
                        mainMenu();
                    })
                case 'exit':
                    return mainMenu();
                default:
                    console.log('error')
                    return process.exit();
            }
        })

}

const menuAddEmployee = async () => {
    let choices = await roles();
    const answer = await inquirer.prompt([
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
            choices: choices,
        },
    ]);
    console.log(choices.indexOf(answer.role));
    connection.promise().query(`
            INSERT INTO employees (first_name, last_name, role_id)
            VALUES ('${answer.firstname}', '${answer.lastname}', ${choices.indexOf(answer.role) + 1});
        `)
    console.log('added employee as:');
    console.table(answer);
    mainMenu();
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
        // then asyncronously take the answer from the previous inquirer prompt and prompt for the department
        // the department list is pulled from the db
        .then(async (answer) => {
            let choices = await departments();
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: 'Please select the department for this role:',
                    choices: choices,
                    // validate: department => {
                    //     if (!department) {
                    //         console.log('please select an option')
                    //     }
                    // }
                }
                // then async'ly take the dep choice from the prev inquiry and append it to
                // answers from the first inquiry
                // and add it to the db
            ]).then(async (depChoice) => {
                answer.department = depChoice.department;
                connection.promise().query(
                    `
                    INSERT INTO roles (title, salary, department_id)
                    VALUES ('${answer.title}',${answer.salary},${choices.indexOf(answer.department) + 1});
                `
                )
                console.log('added role as:')
                console.table(answer)
                mainMenu();
            })
        });
};

const updateRole = async () => {
    // set up for updating
    // set the choices to array of roles
    let choices = await roles();
    // prompt the user to select a role
    const answer = await inquirer.prompt([
        {
            name: 'prop',
            type: 'list',
            message: 'Please select a role to update:',
            // choices is array from sql query
            choices: choices
        }
    ])
    // set the index of the role to a value
    let roleInd = choices.indexOf(answer.prop) + 1;
    // log the selection to the user
    console.log(`selected role: ${answer.prop} @ ${roleInd}`)
    // get the information from the db
    connection.promise().query(`
        SELECT * FROM roles
        LEFT JOIN department on roles.department_id = department.id
        WHERE roles.id = ${roleInd};
    `).then(
        ([rows, fields]) => {
            console.table(rows)
        }
    )
    await inquirer.prompt([
        {
            name: 'prop',
            type: 'list',
            message: 'Please select a property to update',
            choices: ['title', 'salary', 'department'],
        }
    ])
    .then(
        async answer => {
            console.log(answer.prop)
            switch (answer.prop) {
                case 'title':
                    console.log('selected title')
                    return inquirer.prompt([{
                        name: 'prop',
                        type: 'input',
                        message: 'Enter the name of the role:',
                        // validate: prop => {
                        //     if (!prop) {
                        //         console.log('please enter a value')
                        //     } else if (typeof (prop) != String) {
                        //         console.log('wrong type of input')
                        //     }
                        // }
                    }]).then(
                        answer => {
                            connection.promise().query(`
                                UPDATE roles SET title = '${answer.prop}'
                                WHERE id = ${roleInd};
                            `)
                            console.log('updated!');
                            connection.promise().query(`
                                SELECT * FROM roles
                                LEFT JOIN department on roles.department_id = department.id
                                WHERE roles.id = ${roleInd};
                            `).then(([rows, fields]) => {
                                console.table(rows)
                            })
                            mainMenu();
                        }
                    )
                case 'salary':
                    return inquirer.prompt([{
                        name: 'prop',
                        type: 'input',
                        message: 'enter the new salary:',
                        // validate: prop => {
                        //     if (!prop) {
                        //         console.log('please enter a value')
                        //     } else if (typeof (prop) != number) {
                        //         console.log('wrong type of input')
                        //     }
                        // }
                    }]).then(
                        answer => {
                            connection.query(`
                                update roles set salary = ${answer.prop}
                                where id = ${roleInd};
                            `)
                            mainMenu();
                        }
                    )
                case 'department':
                    let choices = await departments();
                    return inquirer.prompt([{
                        name: 'prop',
                        type: 'list',
                        message: 'select a department:',
                        choices: choices,
                    }]).then(
                        answer => {
                            connection.query(`
                                update roles set department_id = ${choices.indexOf(answer.prop) + 1}
                                where id = ${roleInd};
                            `);
                            connection.promise().query(`
                                SELECT * FROM roles LEFT JOIN department on roles.department_id = department.id
                                WHERE roles.id = ${roleInd}; 
                            `)
                                .then(([rows, fields]) => {
                                    console.table(rows)
                                })
                            mainMenu();
                        }
                    )
                case 'default':
                    console.log('error')
                    return mainMenu();
            }
        }
    )
}

let departments = () => {
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
            // console.log(depArr)
            return depArr
        })
}

let roles = () => {
    return new Promise((res, rej) => {
        connection.query(
            `SELECT title FROM roles;`,
            (err, rows) => {
                if (rows === undefined) {
                    rej(new Error("Error"));
                } else {
                    res(rows);
                }
            })
    }).then(
        (res) => {
            let rolArr = []
            res.forEach(element => {
                rolArr.push(element.title)
            })
            // console.log(depArr)
            return rolArr
        })
}

let employees = () => {
    return new Promise((res, rej) => {
        connection.query(
            `SELECT CONCAT(first_name, ' ', last_name) AS emp_name FROM employees;`,
            (err, rows) => {
                if (rows === undefined) {
                    rej(new Error("Error"));
                } else {
                    res(rows);
                }
            })
    }).then(
        (res) => {
            let empArr = []
            res.forEach(element => {
                empArr.push(element.emp_name)
            })
            // console.log(empArr)
            return empArr
        })
}