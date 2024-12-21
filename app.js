const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models'); 
const app = express();
const port = process.env.PORT || 3000;
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const stockRoutes = require('./routes/stockRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const supplierProductRoutes = require('./routes/supplierProductRoutes');
const customerRoutes = require('./routes/customerRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const orderProductRoutes = require('./routes/orderProductRoutes');



// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('API is running...');
});


app.use('/api/products', productRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/stocks', stockRoutes);
app.use('/api/supplier', supplierRoutes);
app.use('/api/supplier-products', supplierProductRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/order-products', orderProductRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: error.message,
    error: process.env.NODE_ENV === 'development' ? error : {},
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
