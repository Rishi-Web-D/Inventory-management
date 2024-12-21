'use strict';

module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define('Invoice', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Order ID is required
      references: {
        model: 'Orders',  // References the Orders table
        key: 'id',        // References the id field in Orders
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    invoice_date: {
      type: DataTypes.DATE,
      allowNull: false,  // Invoice date cannot be null
    },
    amount_paid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,  // Amount paid cannot be null
    },
    payment_status: {
      type: DataTypes.STRING(50),
      allowNull: false,  // Payment status cannot be null
      defaultValue: 'Pending',  // Default value is 'Pending'
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
    tableName: 'Invoices',  // Explicitly specify the table name
    timestamps: true,       // Automatically manage createdAt and updatedAt
  });

  // Define associations if needed
  Invoice.associate = function(models) {
    Invoice.belongsTo(models.Order, { foreignKey: 'order_id' });
  };

  return Invoice;
};
