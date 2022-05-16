INSERT INTO department (dep_name)
VALUES
    ('it'),
    ('product'),
    ('support');

SELECT
    'created departments, creating roles...'
INSERT INTO
    roles (title, salary, department_id)
VALUES
    ('technical officer', 0, 2),
    ('customer support', 0, 1),
    ('ip sec', 0, 0),
    ('developer', 0, 0),
    ('botanist', 0, 1);

SELECT
    'created roles. creating employees'
INSERT INTO
    employees (first_name, last_name, role_id, department_id)
VALUES
    ('george', 'pasta', 0, 1),
    ('daniel', 'mayo', 3, 1),
    ('taras', 'gorba', 1, 1),
    ('mel', 'gavri', 1, 1),
    ('les', 'mayo', 2, 0),
    ('stan', 'berd', 2, 0),
    ('olesya', 'byrd', 4, 1);