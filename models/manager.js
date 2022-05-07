const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Manager model
class Manager extends Model {}

// create fields/columns for Manager model
Manager.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    employee_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'employee',
        key: 'id',
        unique: false
      }
    },
    role_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'role',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'manager'
  }
);

module.exports = Manager;
