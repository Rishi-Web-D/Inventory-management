const { Sequelize } = require('sequelize');
const { Order, Customer, Employee } = require('../models');

exports.createOrder = async (req, res) => {
  try {
    const { order_date, total_amount, customer_id, employee_id } = req.body;
    if (!order_date || !total_amount || !customer_id || !employee_id) {
      return res.status(400).json({ message: 'Order date, total amount, customer ID, and employee ID are required.' });
    }
    const customer = await Customer.findByPk(customer_id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found.' });
    }
    const employee = await Employee.findByPk(employee_id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found.' });
    }
    const newOrder = await Order.create({ order_date, total_amount, customer_id, employee_id });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: Customer, attributes: [] }, { model: Employee, attributes: [] }],
      attributes: {
        include : [
          [Sequelize.col('customer.name'), 'customerName'],
          [Sequelize.col('customer.email'), 'customerEmail'],
          [Sequelize.col('customer.phone'), 'customerPhone'],
          [Sequelize.col('employee.name'), 'employeeName'],
          [Sequelize.col('employee.role'), 'employeeRole'],
        ]
      }
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [{ model: Customer, attributes: [] }, { model: Employee, attributes: [ ] }],
      attributes: {
        include : [
          [Sequelize.col('customer.name'), 'customerName'],
          [Sequelize.col('customer.email'), 'customerEmail'],
          [Sequelize.col('customer.phone'), 'customerPhone'],
          [Sequelize.col('employee.name'), 'employeeName'],
          [Sequelize.col('employee.role'), 'employeeRole'],
        ]
      }
    });
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_date, total_amount, customer_id, employee_id } = req.body;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    if (customer_id) {
      const customer = await Customer.findByPk(customer_id);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found.' });
      }
    }
    if (employee_id) {
      const employee = await Employee.findByPk(employee_id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found.' });
      }
    }
    await order.update({ order_date, total_amount, customer_id, employee_id });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    await order.destroy();
    res.status(200).json({ message: 'Order deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
