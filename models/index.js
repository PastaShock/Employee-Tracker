const Employee = require('./Employee');
const Role = require('./Role');
const Manager = require('./Manager');

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
