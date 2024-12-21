'use strict';

module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,  // Employee name cannot be null
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,  // Role cannot be null
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,  // Email cannot be null
      unique: true,      // Ensures that email addresses are unique
      validate: {
        isEmail: true,   // Validates that the email has a correct format
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    tableName: 'Employees',  // Explicitly specify the table name
    timestamps: true,        // Automatically manage createdAt and updatedAt
  });

  return Employee;
};
