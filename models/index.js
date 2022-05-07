const Employee = require('./employee');
const Role = require('./role');
const Manager = require('./manager');

Employee.belongsToMany(Role, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Manager,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'planned_managers'
});

Role.belongsToMany(Employee, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Manager,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'location_employees'
});

module.exports = { Employee, Role, Manager };
