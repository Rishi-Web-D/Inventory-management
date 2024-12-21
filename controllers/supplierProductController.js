const { Sequelize } = require('sequelize');
const { SupplierProduct, Supplier, Product } = require('../models');

exports.createSupplierProduct = async (req, res) => {
  try {
    const { supplier_id, product_id, price, supply_date } = req.body;

    if (!supplier_id || !product_id || !price || !supply_date) {
      return res.status(400).json({
        message: 'Supplier ID, Product ID, Price, and Supply Date are required.',
      });
    }

    if (price <= 0) {
      return res.status(400).json({ message: 'Price must be greater than zero.' });
    }

    const supplierExists = await Supplier.findByPk(supplier_id);
    if (!supplierExists) {
      return res.status(404).json({ message: 'Supplier not found.' });
    }

    const productExists = await Product.findByPk(product_id);
    if (!productExists) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const newSupplierProduct = await SupplierProduct.create({
      supplier_id,
      product_id,
      price,
      supply_date,
    });

    res.status(201).json(newSupplierProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSupplierProducts = async (req, res) => {
  try {
    const supplierProducts = await SupplierProduct.findAll({
      include: [
        { model: Supplier, as: 'supplier', attributes: [] },
        { model: Product, as: 'product', attributes: [] },
      ],
      attributes : {
        include : [
            [Sequelize.col('supplier.name'), 'supplierName'],
            [Sequelize.col('supplier.email'), 'supplierEmail'],
            [Sequelize.col('supplier.phone'), 'supplierPhone'],
            [Sequelize.col('product.name'), 'productName'],
            [Sequelize.col('product.unit_price'), 'productUnitPrice'],
        ]
      }
    });
    res.status(200).json(supplierProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSupplierProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const supplierProduct = await SupplierProduct.findByPk(id, {
      include: [
        { model: Supplier, as: 'supplier', attributes: [] },
        { model: Product, as: 'product', attributes: [] },
      ],
      attributes : {
        include : [
            [Sequelize.col('supplier.name'), 'supplierName'],
            [Sequelize.col('supplier.email'), 'supplierEmail'],
            [Sequelize.col('supplier.phone'), 'supplierPhone'],
            [Sequelize.col('product.name'), 'productName'],
            [Sequelize.col('product.unit_price'), 'productUnitPrice'],
        ]
      }
    });

    if (!supplierProduct) {
      return res.status(404).json({ message: 'SupplierProduct not found.' });
    }

    res.status(200).json(supplierProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSupplierProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { supplier_id, product_id, price, supply_date } = req.body;

    const supplierProduct = await SupplierProduct.findByPk(id);

    if (!supplierProduct) {
      return res.status(404).json({ message: 'SupplierProduct not found.' });
    }

    if (supplier_id) {
      const supplierExists = await Supplier.findByPk(supplier_id);
      if (!supplierExists) {
        return res.status(404).json({ message: 'Supplier not found.' });
      }
    }

    if (product_id) {
      const productExists = await Product.findByPk(product_id);
      if (!productExists) {
        return res.status(404).json({ message: 'Product not found.' });
      }
    }

    await supplierProduct.update({ supplier_id, product_id, price, supply_date });
    res.status(200).json(supplierProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSupplierProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const supplierProduct = await SupplierProduct.findByPk(id);

    if (!supplierProduct) {
      return res.status(404).json({ message: 'SupplierProduct not found.' });
    }
    await supplierProduct.destroy();
    res.status(200).json({ message: 'SupplierProduct deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
