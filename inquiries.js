 const inquiries =
    {
        type: 'list',
        message: 'please choose an option',
        name: 'option',
        choices: [
            'View all employees',
            'employees by role',
            'Employes by department',
            'Update employees',
            'Add employee',
            'Add Role',
            'Add Department'
        ]
    };

const addEmployee = [
    {
        name: 'firstname',
        type: 'input',
        message: 'Enter the employee\'s first name'
    },
    {
        name: 'lastname',
        type: 'input',
        message: 'Enter the Employee\'s last name'
    },
    {
        name: 'role',
        type: 'list',
        message: 'What is the Employee\'s role?',
        choices: selectRole()
    },
    {
        name: 'manager',
        type: 'rawlist',
        message: 'Who does the employee report to?',
        choices: selectManager()
    },
]

function selectRole() {
    console.log('placeholder')
}

function selectManager() {
    console.log('placeholder')
}

module.exports = inquiries, addEmployee