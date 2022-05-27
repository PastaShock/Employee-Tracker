const inquirer = require('inquirer');
require('dotenv').config();
const connection = require('./config/connection');
const { inquiries, mainMenuChoices, AddEmployee } = require('./inquiries');

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
// prompt the user with menu 
const mainMenu = () => {
    // call inquirer with the inquiries for the main menu
    inquirer.prompt([inquiries])
    // on selection return an answer
        .then(answer => { return answer })
        // with the answer select the next function
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
                    case 'Remove employee':
                        return menuRemoveEmployee();
                    case 'View roles':
                        return viewRoles();
                    case 'Add Role':
                        return addRole();
                    case 'Update role':
                        return updateRole();
                    case 'View departments':
                        return menuShowDepartments();
                    case 'Add department':
                        return menuAddDept();
                    case 'quit':
                        process.exit();
                        // on error case:
                    default:
                        console.log('no options selected? YEETing')
                        process.exit();
                }
            }
        )
}
// menu functions 

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
    // get the employee id from the text of the queries concat
    empInd = (answer.employee.split(':')[0]);
    // the return from inquierer is answer, we create an index to match that employee since sql starts at 1, not 0
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
    // pull the list of employees from the db
    let choices = await roles();
    // ask for what employee property is to be changed
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

const menuRemoveEmployee = async () => {
    let choices = await employees();
    const answer = await inquirer.prompt([{
        name: 'prop',
        type: 'list',
        message: 'Select an employee to delete',
        choices: choices,
    }]).then( answer => {
        empInd = answer.prop.split(':')[0];
        console.log(`employee index: ${empInd}`);
        connection.promise().query(`
            DELETE FROM employees WHERE id = ${empInd};
        `)
        console.log('delete employee');
        connection.promise().query(`
            SELECT * FROM employees;
        `).then(([rows, fields]) => {
            console.table(rows);
            mainMenu();
        })
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
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter in the salary:',
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

const menuShowDepartments = () => {
    connection.promise().query(`
        SELECT * FROM department LEFT JOIN roles ON department.id = roles.department_id;
    `).then(([rows, fields]) => {
        console.table(rows)
        mainMenu();
    })
}

const menuAddDept = () => {
    inquirer.prompt([{
        name: 'prop',
        type: 'input',
        message: 'Please enter a name for a new department',
    }]).then(answer => {
        connection.promise().query(`
            INSERT INTO department (dep_name)
            VALUES ('${answer.prop}');
        `)
        console.log('Update table department!')
        connection.promise().query(`
            SELECT * from department
        `).then(([rows, fields]) => {
            console.table(rows);
        })
        mainMenu();
    })
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
            return rolArr
        })
}

let employees = () => {
    return new Promise((res, rej) => {
        connection.query(
            `SELECT CONCAT(id, ': ', first_name, ' ', last_name) AS emp_name FROM employees;`,
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
            return empArr
        })
}