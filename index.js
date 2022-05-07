const inquirer = require('inquirer');
const mysql = require('mysql2');
const inquiries = require('./inquiries')
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

function initial() {
    inquirer.prompt(inquiries[0]).then(answers => {
        console.info('Selection: ', answers.option)
    })
}

initial();
// run the inquirer prompts
    // list database tasks
        // what would you like to do?
        // view all employees
            // get employees from mysql instance
        // add employee
            // employee name?
            // employee role?
            // employee's manager?
        // update
            // select employee
            // select role
        // view roles
            // get all roles from db
        // add role
            // prompt for role name
            // for the salary
            // for the department the role belongs to
        // view depts
            // get a list of all depts from the db
        // add depts
            // add dept to the db
        // quit
