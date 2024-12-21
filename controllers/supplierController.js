const { Supplier } = require('../models');

exports.createSupplier = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ message: 'Name, email, and phone are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format.' });
    }

    const existingSupplier = await Supplier.findOne({ where: { email } });
    if (existingSupplier) {
      return res.status(409).json({ message: 'Supplier with this email already exists.' });
    }
    const newSupplier = await Supplier.create({ name, email, phone });
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    if(suppliers.length === 0) {
      return res.status(200).json({ message: 'No suppliers found.' });
    }
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found.' });
    }

    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found.' });
    }

    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format.' });
      }

      // Check if a different supplier with the same email exists
      const existingSupplier = await Supplier.findOne({ where: { email } });
      if (existingSupplier && existingSupplier.id !== supplier.id) {
        return res.status(409).json({ message: 'Supplier with this email already exists.' });
      }
    }

    // Update supplier
    await supplier.update({ name, email, phone });
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const supplier = await Supplier.findByPk(id);

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found.' });
    }

    await supplier.destroy();
    res.status(200).json({ message: 'Supplier deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
