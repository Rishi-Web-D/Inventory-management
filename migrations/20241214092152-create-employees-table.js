'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false, // Employee name cannot be null
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false, // Role cannot be null
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false, // Email cannot be null
        unique: true, // Ensure no duplicate emails
        validate: {
          isEmail: true, // Validate the email format
        },
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
    await queryInterface.dropTable('Employees');
  },
};
