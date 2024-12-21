const { Sequelize } = require('sequelize');
const { OrderProduct, Order, Product } = require('../models');

exports.createOrderProduct = async (req, res) => {
  try {
    const { order_id, product_id, quantity } = req.body;
    if (!order_id || !product_id || !quantity) {
      return res.status(400).json({ message: 'Order ID, Product ID, and Quantity are required.' });
    }
    const order = await Order.findByPk(order_id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    const newOrderProduct = await OrderProduct.create({ order_id, product_id, quantity });
    res.status(201).json(newOrderProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllOrderProducts = async (req, res) => {
  try {
    const orderProducts = await OrderProduct.findAll({
      include: [
        { model: Order, attributes: [] },
        { model: Product, attributes: [] },
      ],
      attributes : {
        include : [
          [Sequelize.col('order.order_date'), 'order_date'],
          [Sequelize.col('order.total_amount'), 'total_amount'],
          [Sequelize.col('product.name'), 'product_name'],
          [Sequelize.col('product.unit_price'), 'unit_price']
        ]
      }
    });
    res.status(200).json(orderProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderProduct = await OrderProduct.findByPk(id, {
      include: [
        { model: Order, attributes: [] },
        { model: Product, attributes: [] },
      ],
      attributes : {
        include : [
          [Sequelize.col('order.order_date'), 'order_date'],
          [Sequelize.col('order.total_amount'), 'total_amount'],
          [Sequelize.col('product.name'), 'product_name'],
          [Sequelize.col('product.unit_price'), 'unit_price']
        ]
      }
    });
    if (!orderProduct) {
      return res.status(404).json({ message: 'OrderProduct not found.' });
    }
    res.status(200).json(orderProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const orderProduct = await OrderProduct.findByPk(id);
    if (!orderProduct) {
      return res.status(404).json({ message: 'OrderProduct not found.' });
    }
    await orderProduct.update({ quantity });
    res.status(200).json(orderProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteOrderProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const orderProduct = await OrderProduct.findByPk(id);
    if (!orderProduct) {
      return res.status(404).json({ message: 'OrderProduct not found.' });
    }
    await orderProduct.destroy();
    
    res.status(200).json({ message: 'OrderProduct deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
