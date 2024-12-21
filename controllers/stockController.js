// controllers/stockController.js

const { Sequelize } = require('sequelize');
const { Stock, Product } = require('../models'); // Import Stock and Product models

// Create a new stock record
exports.createStock = async (req, res) => {
  try {
    const { product_id, quantity, warehouse_location } = req.body;

    // Validations
    if (!product_id || !quantity || !warehouse_location) {
      return res.status(400).json({ message: 'All fields (product_id, quantity, warehouse_location) are required.' });
    }

    if (quantity < 0) {
      return res.status(400).json({ message: 'Quantity cannot be negative.' });
    }

    // Check if the product exists
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Create stock record
    const newStock = await Stock.create({ product_id, quantity, warehouse_location });
    res.status(201).json(newStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all stock records
exports.getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.findAll({
      include: { model: Product , as : 'product', attributes: [] } ,
      attributes: {
        include: [[Sequelize.col('product.name'), 'productName'], [Sequelize.col('product.description'), 'productDescription']],
        exclude: ['product_id']
                  }                   });
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single stock record by ID
exports.getStockById = async (req, res) => {
  try {
    const { id } = req.params;

    const stock = await Stock.findByPk(id, {
      include: { model: Product , as : 'product' , attributes: [] },
      attributes: {
        include: [[Sequelize.col('product.name'), 'productName'], [Sequelize.col('product.description'), 'productDescription']],
        exclude: ['product_id']
                  }});

    if (!stock) {
      return res.status(404).json({ message: 'Stock record not found.' });
    }

    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a stock record
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity, warehouse_location } = req.body;

    // Validations
    if (quantity !== undefined && quantity < 0) {
      return res.status(400).json({ message: 'Quantity cannot be negative.' });
    }

    const stock = await Stock.findByPk(id);

    if (!stock) {
      return res.status(404).json({ message: 'Stock record not found.' });
    }

    // Update stock details
    await stock.update({ quantity, warehouse_location });
    res.status(200).json(stock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a stock record
exports.deleteStock = async (req, res) => {
  try {
    const { id } = req.params;

    const stock = await Stock.findByPk(id);

    if (!stock) {
      return res.status(404).json({ message: 'Stock record not found.' });
    }

    // Delete stock
    await stock.destroy();
    res.status(200).json({ message: 'Stock record deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
