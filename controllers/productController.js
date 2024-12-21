const { Product, Category } = require('../models');
const Sequelize = require('sequelize');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: [],
        }
      ],
      attributes: {
        include: [
          [Sequelize.col('category.name'), 'categoryName']
        ],
        exclude: ['category_id']
      }
    });

    if (!products || products.length === 0) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findByPk(productId, {
      include: [
        {
          model: Category,
          as: 'category',
          attributes: [],
        }
      ],
      attributes: {
        include: [
          [Sequelize.col('category.name'), 'categoryName']
        ],
        exclude: ['category_id']
      }
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { name, description, unit_price, reorder_level, category_id } = req.body;

    if (!name || !description || !unit_price || !category_id) {
      return res.status(400).json({ message: 'Name, description, unit price, and category ID are required' });
    }

    const category = await Category.findByPk(category_id);
    if (!category) {
      return res.status(404).json({ message: 'Invalid category ID' });
    }

    const newProduct = await Product.create({
      name,
      description,
      unit_price,
      reorder_level: reorder_level || 0, 
      category_id,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, unit_price, reorder_level, category_id } = req.body;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (category_id) {
      const category = await Category.findByPk(category_id);
      if (!category) {
        return res.status(404).json({ message: 'Invalid category ID' });
      }
    }

    if (name) product.name = name;
    if (description) product.description = description;
    if (unit_price) product.unit_price = unit_price;
    if (reorder_level !== undefined) product.reorder_level = reorder_level;
    if (category_id) product.category_id = category_id;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
