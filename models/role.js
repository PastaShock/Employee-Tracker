const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Role model
class Role extends Model {}

// create fields/columns for Role model
Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    role_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'role'
  }
);

module.exports = Role;
