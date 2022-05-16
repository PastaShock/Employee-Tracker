--  show databases;
use employee_db;

DROP TABLE IF EXISTS employees;

DROP TABLE IF EXISTS roles;

DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dep_name VARCHAR(30) NOT NULL UNIQUE
);

show tables;

CREATE TABLE roles (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary int NOT NULL,
    department_id int,
    -- INDEX department_ind (department_id),
    CONSTRAINT department_ind FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employees (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id int,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    department_id int,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

show tables;

SELECT
    'schemed successfully! Now sourcing seed data...';

source db/seed.sql;