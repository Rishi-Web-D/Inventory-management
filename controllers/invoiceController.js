const { Sequelize } = require('sequelize');
const { Invoice, Order } = require('../models');

exports.createInvoice = async (req, res) => {
  try {
    const { order_id, invoice_date, amount_paid, payment_status } = req.body;
    if (!order_id || !invoice_date || !amount_paid || !payment_status) {
      return res.status(400).json({ message: 'Order ID, invoice date, amount paid, and payment status are required.' });
    }
    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    const newInvoice = await Invoice.create({ order_id, invoice_date, amount_paid, payment_status });
    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [{ model: Order, attributes: [] }],
      attributes : {
        include : [
          [Sequelize.col('order.order_date'), 'order_date'],
          [Sequelize.col('order.total_amount'), 'order_total_amount']
        ]
      }
    });
    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInvoiceById = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByPk(id, {
      include: [{ model: Order, attributes: [] }],
      attributes : {
        include : [
          [Sequelize.col('order.order_date'), 'order_date'],
          [Sequelize.col('order.total_amount'), 'order_total_amount']
        ]
      }
    });
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found.' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const { invoice_date, amount_paid, payment_status } = req.body;
    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found.' });
    }
    await invoice.update({ invoice_date, amount_paid, payment_status });
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findByPk(id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found.' });
    }
    await invoice.destroy();
    res.status(200).json({ message: 'Invoice deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
