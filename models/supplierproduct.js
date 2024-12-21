'use strict';

module.exports = (sequelize, DataTypes) => {
  const SupplierProduct = sequelize.define('SupplierProduct', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Suppliers', // Refers to the Suppliers table
        key: 'id',         // Refers to the id field in Suppliers
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products', // Refers to the Products table
        key: 'id',         // Refers to the id field in Products
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,  // You can set it as required if needed
    },
    supply_date: {
      type: DataTypes.DATE,
      allowNull: true,  // You can set it as required if needed
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
    tableName: 'SupplierProducts', 
    timestamps: true,             
  });

  
  SupplierProduct.associate = function(models) {
    
    SupplierProduct.belongsTo(models.Supplier, { foreignKey: 'supplier_id', as: 'supplier' });

    
    SupplierProduct.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };

  return SupplierProduct;
};
