const express = require('express');
const router = express.Router();
const orderProductController = require('../controllers/orderProductController');

router.post('/', orderProductController.createOrderProduct);

router.get('/', orderProductController.getAllOrderProducts);

router.get('/:id', orderProductController.getOrderProductById);

router.put('/:id', orderProductController.updateOrderProduct);

router.delete('/:id', orderProductController.deleteOrderProduct);

module.exports = router;
