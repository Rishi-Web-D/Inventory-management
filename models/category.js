'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,  // You can set it as required if necessary
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,  // You can set it as required if necessary
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
    tableName: 'Categories',  // Specify the table name if it's different from the default (which is pluralized)
    timestamps: true,  // Enable automatic timestamps for createdAt and updatedAt
  });

  return Category;
};
