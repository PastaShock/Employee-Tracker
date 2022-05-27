const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

// create an error case for a connection fail
connection.connect(err => {
    if (err) throw err;
    console.log(`connect as id ${connection.threadId}`)
    mainMenu();
});

module.exports = connection;
