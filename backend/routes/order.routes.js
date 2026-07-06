// Orders routes
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authenticate } = require('../middleware/authenticate');
const { authorizeAdmin } = require('../middleware/authorizeAdmin');
const { validate, schemas } = require('../middleware/validator');

// User routes
router.post('/', authenticate, validate(schemas.order), orderController.createOrder);
router.get('/my-orders', authenticate, orderController.getUserOrders);

// Admin routes
router.get('/', authenticate, authorizeAdmin, orderController.getAllOrders);
router.put('/:id/status', authenticate, authorizeAdmin, orderController.updateOrderStatus);

module.exports = router;