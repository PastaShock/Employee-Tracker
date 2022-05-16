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
    INDEX dep_ind (department_id),
    CONSTRAINT dep_ind FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

CREATE TABLE employees (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id int,
    INDEX role_ind (role_id),
    CONSTRAINT role_ind FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL
    -- department_id int,
    -- INDEX dep_ind (department_id),
    -- FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

show tables;

SELECT
    'schemed successfully! Now sourcing seed data...';

source db/seed.sql;