'use strict';

module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('OrderProduct', {
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
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Product ID is required
      references: {
        model: 'Products',  // References the Products table
        key: 'id',          // References the id field in Products
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,  // Quantity cannot be null
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
    tableName: 'OrderProducts',  // Explicitly specify the table name
    timestamps: true,            // Automatically manage createdAt and updatedAt
  });

  // Define associations if needed
  OrderProduct.associate = function(models) {
    OrderProduct.belongsTo(models.Order, { foreignKey: 'order_id' });
    OrderProduct.belongsTo(models.Product, { foreignKey: 'product_id' });
  };

  return OrderProduct;
};
