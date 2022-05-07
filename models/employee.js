const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Employee model
class Employee extends Model {}

// create fields/columns for Employee model
Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    manager: {
      type: DataTypes.STRING,
      references: {
        model: 'manager',
        key: 'id',
        unique: false
      }
    }
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true,
    //   validate: {
    //     isEmail: true
    //   }
    // }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'employee'
  }
);

module.exports = Employee;
