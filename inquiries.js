// pull in the connection from config
// because we need to access the db for inquirer list options
const connection = require('./config/connection');

// always double check capitalizations on menu options
const mainMenuChoices = [
    'View all employees',
    'employees by role',
    'Employees by department',
    'Update employees',
    'Add employee',
    'Remove employee',
    'View roles',
    'Add Role',
    'Update role',
    'View departments',
    'Add department',
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

module.exports = { inquiries, mainMenuChoices, AddEmployee }