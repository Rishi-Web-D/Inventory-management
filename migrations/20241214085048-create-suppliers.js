'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Suppliers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Supplier name cannot be null
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, // Email cannot be null
        unique: true, // Ensures that email addresses are unique
        validate: {
          isEmail: true, // Validates the format of the email
        },
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false, // Phone cannot be null
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Suppliers');
  },
};
