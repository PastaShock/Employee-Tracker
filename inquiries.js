 const inquiries = [
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
    },
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
        name: 'choice',
        type: 'rawlist',
        message: 'Who does the employee report to?',
        choices: selectManager()
    },
    {
        name: 'lastName',
        type: 'rawlist',
        choices: () => {
            let lastName = [];
            for (let i = 0; i < resizeBy.length; i++) {
                lastName.push(res[i].last_name);
            }
            return lastName
        }
    },
    {
        message: 'What is the employee\'s last name?'
    }
]

function selectRole() {
    console.log('placeholder')
}

function selectManager() {
    console.log('placeholder')
}

module.exports = inquiries