INSERT INTO department (dep_name)
VALUES
    ('it'),
    ('product'),
    ('support');

SELECT
    'created departments, creating roles...';

INSERT INTO roles (title, salary, department_id)
VALUES
    ('technical officer', 0, 2),
    ('customer support', 0, 1),
    ('ip sec', 0, 1),
    ('developer', 0, 1),
    ('botanist', 0, 1);

SELECT
    'created roles. creating employees';

-- removed department from user, it'll be sourced from the role
INSERT INTO employees (first_name, last_name, role_id)
VALUES
    ('george', 'pasta', 1),
    ('daniel', 'mayo', 3),
    ('taras', 'gorba', 1),
    ('mel', 'gavri', 1),
    ('les', 'mayo', 2),
    ('stan', 'berd', 2),
    ('olesya', 'byrd', 4);