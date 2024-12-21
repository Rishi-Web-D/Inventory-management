'use strict';

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,  // Customer name cannot be null
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,  // Email cannot be null
      unique: true,      // Ensures that email addresses are unique
      validate: {
        isEmail: true,   // Validates that the email has a correct format
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,   // Phone number is optional
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true,   // Address is optional
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
    tableName: 'Customers',  // Explicitly specify the table name
    timestamps: true,        // Automatically manage createdAt and updatedAt
  });

  return Customer;
};
