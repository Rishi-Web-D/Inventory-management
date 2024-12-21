'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Invoices', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Orders', // References the Orders table
          key: 'id', // References the id field in Orders
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      invoice_date: {
        type: Sequelize.DATE,
        allowNull: false, // Invoice date cannot be null
      },
      amount_paid: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false, // Amount paid cannot be null
      },
      payment_status: {
        type: Sequelize.STRING(50),
        allowNull: false, // Payment status cannot be null
        defaultValue: 'Pending', // Default value of 'Pending'
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
    await queryInterface.dropTable('Invoices');
  },
};
