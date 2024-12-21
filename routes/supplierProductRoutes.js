const express = require('express');
const router = express.Router();
const supplierProductController = require('../controllers/supplierProductController');

router.post('/', supplierProductController.createSupplierProduct); 

router.get('/', supplierProductController.getAllSupplierProducts); 

router.get('/:id', supplierProductController.getSupplierProductById); 

router.put('/:id', supplierProductController.updateSupplierProduct); 

router.delete('/:id', supplierProductController.deleteSupplierProduct); 

module.exports = router;
