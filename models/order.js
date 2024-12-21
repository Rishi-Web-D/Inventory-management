'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false,  // Order date cannot be null
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2), // DECIMAL for precise money value
      allowNull: false,  // Total amount cannot be null
    },
    customer_id: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Customer ID is required
      references: {
        model: 'Customers',  // References the Customers table
        key: 'id',           // References the id field in Customers
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Employee ID is required
      references: {
        model: 'Employees',  // References the Employees table
        key: 'id',           // References the id field in Employees
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
    tableName: 'Orders',  // Explicitly specify the table name
    timestamps: true,     // Automatically manage createdAt and updatedAt
  });

  // Define associations if needed
  Order.associate = function(models) {
    Order.belongsTo(models.Customer, { foreignKey: 'customer_id' });
    Order.belongsTo(models.Employee, { foreignKey: 'employee_id' });
  };

  return Order;
};
