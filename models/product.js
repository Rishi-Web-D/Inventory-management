'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,  // You can set it as required if necessary
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,  // You can set it as required if necessary
    },
    unit_price: {
      type: DataTypes.DECIMAL,
      allowNull: true,  // You can set it as required if necessary
    },
    reorder_level: {
      type: DataTypes.INTEGER,
      allowNull: true,  // You can set it as required if necessary
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Categories', // Table name being referenced
        key: 'id',           // Column being referenced
      },
      onDelete: 'CASCADE',   // Action on delete
      onUpdate: 'CASCADE',   // Action on update
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
    tableName: 'Products', // Explicitly specifying table name
    timestamps: true,      // Automatically manage createdAt and updatedAt
  });

  // Association to Category
  Product.associate = function(models) {
    Product.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
  };

  return Product;
};
