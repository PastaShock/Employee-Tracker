--  show databases;
use employee_db;

CREATE TABLE department (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    INDEX dep_ind (department_id),
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE
    SET
        NULL
);

create table if not exists employees (
    id integer primary key auto_increment,
    first_name varchar(30) not null,
    last_name varchar(30) not null,
    role_id integer,
    index role_index (role_id),
    constraint fk_role foreign key (role_id) references roles(id) on delete
    set
        null,
        manager_id integer,
        index manager_index (manager_id),
        constraint fk_manager foreign key (manager_id) references employees(id) on delete
    set
        null
);