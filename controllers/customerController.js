const { Customer } = require('../models');

exports.createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    
    if (!name || !email || !phone ) {
      return res.status(400).json({ message: 'Name , email , phone are required.' });
    }
    const existingCustomer = await Customer.findOne({ where: { email } });
    if (existingCustomer) {
      return res.status(400).json({ message: 'Email already exists.' });
    }
    const newCustomer = await Customer.create({ name, email, phone, address });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found.' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found.' });
    }
    if (email) {
      const existingCustomer = await Customer.findOne({ where: { email, id: { $ne: id } } });
      if (existingCustomer) {
        return res.status(400).json({ message: 'Email already exists.' });
      }
    }
    await customer.update({ name, email, phone, address });
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found.' });
    }
    await customer.destroy();
    res.status(200).json({ message: 'Customer deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
