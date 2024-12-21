'use strict';

module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define('Stock', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products', // Refers to the Products model
        key: 'id',         // Refers to the id field in Products
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    warehouse_location: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: 'Stocks',  // Specifies the table name
    timestamps: true,     // Enable automatic createdAt and updatedAt handling
  });

  // Association to Product
  Stock.associate = function(models) {
    // A stock belongs to a product
    Stock.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return Stock;
};
