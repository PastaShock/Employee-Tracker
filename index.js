const inquirer = require('inquirer');
const express = require('express');
const routes = require('routes');
const mysql = require('mysql2');
const { inquiries, addEmployee } = require('./inquiries')
import { Sequelize, Model, DataTypes } from ('sequelize');

// print the splash image to the terminal
// console.log(
//     `
//     ======================================
//     ████████╗███████╗'█████╗'███╗'''███╗''
//     ╚══██╔══╝██╔════╝██╔══██╗████╗'████║''
//     '''██║'''█████╗''███████║██╔████╔██║''
//     '''██║'''██╔══╝''██╔══██║██║╚██╔╝██║''
//     '''██║'''███████╗██║''██║██║'╚═╝'██║''
//     '''╚═╝'''╚══════╝╚═╝''╚═╝╚═╝'''''╚═╝''
//     ███╗'''███╗███╗'''██╗'██████╗'██████╗'
//     ████╗'████║████╗''██║██╔════╝'██╔══██╗
//     ██╔████╔██║██╔██╗'██║██║''███╗██████╔╝
//     ██║╚██╔╝██║██║╚██╗██║██║'''██║██╔══██╗
//     ██║'╚═╝'██║██║'╚████║╚██████╔╝██║''██║
//     ╚═╝'''''╚═╝╚═╝''╚═══╝'╚═════╝'╚═╝''╚═╝
//     ======================================
//     =welcome to the SQL team manager app!=
//    `
// )

function main() {
    let answersObj = [];
    inquirer.prompt(inquiries).then(answers => {
        answersObj = answers;
    })
    if (inquiries.choices.indexOf(answersObj) === 5) {
        console.log('\tadd an employee:');
        inquirer.prompt(addEmployee).then(() => {
            // add the mySQL post reqs
            // create and shape the data:
            // answers.first + last
            // role: answers.role
            // manager: answers.manager
        });
    }
    // if (this.options === "View all employees") {
    //     inquirer.prompt()
    // };
}

main()
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
