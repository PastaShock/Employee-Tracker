--  show databases;
use employee_db;

DROP TABLE IF EXISTS employees;

DROP TABLE IF EXISTS roles;

DROP TABLE IF EXISTS department;

CREATE TABLE department (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    dep_name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE roles (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id int,
    -- INDEX department_ind (department_id),
    CONSTRAINT department_ind FOREIGN KEY (department_id) REFERENCES department(id)
);

-- CREATE TABLE IF NOT EXISTS manager (
--     id int PRIMARY KEY auto_increment,
--     first_name VARCHAR(30) NOT NULL,
--     last_name VARCHAR(30) NOT NULL,
--     INDEX role_index (ROLE),
--     CONSTRAINT roleId
--         FOREIGN KEY (role_id)
--         REFERENCES roles(id)
--         ON DELETE SET NULL
-- )
CREATE TABLE employees (
    id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id int,
    INDEX role_index (role_id),
    CONSTRAINT FK_roleId FOREIGN KEY (role_id) REFERENCES roles(id)
    department_id int,
    -- INDEX department_ind (id),
    CONSTRAINT department_ind FOREIGN KEY (department_id) REFERENCES department(id) -- manager_name VARCHAR(30) NOT NULL
    -- INDEX manager_index (manager_id),
    -- CONSTRAINT managerId
    --     FOREIGN KEY (manager_id)
    --     REFERENCES manager(id)
    --     ON DELETE SET NULL
);

SELECT
    'schemed successfully! Now sourcing seed data...';

source db/seed.sql;