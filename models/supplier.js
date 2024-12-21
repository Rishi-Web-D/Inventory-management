'use strict';

module.exports = (sequelize, DataTypes) => {
  const Supplier = sequelize.define('Supplier', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,  // Supplier name cannot be null
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
      allowNull: false,  // Phone cannot be null
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
    tableName: 'Suppliers',  // Explicitly specify table name
    timestamps: true,        // Automatically manage createdAt and updatedAt
  });

  return Supplier;
};
