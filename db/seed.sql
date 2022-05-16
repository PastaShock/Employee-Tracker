INSERT INTO department (dep_name)
VALUES
    ('it'),
    ('product'),
    ('support');

SELECT
    'created departments, creating roles...';

INSERT INTO roles (title, salary, department_id)
VALUES
    ('technical officer', 0, 3),
    ('customer support', 0, 2),
    ('ip sec', 0, 1),
    ('developer', 0, 1),
    ('botanist', 0, 3);

SELECT
    'created roles. creating employees';

-- removed department from user, it'll be sourced from the role
INSERT INTO employees (first_name, last_name, role_id)
VALUES
    ('george', 'pasta', 1),
    ('daniel', 'mayo', 4),
    ('taras', 'gorba', 2),
    ('mel', 'gavri', 2),
    ('les', 'mayo', 3),
    ('stan', 'berd', 3),
    ('olesya', 'byrd', 5);