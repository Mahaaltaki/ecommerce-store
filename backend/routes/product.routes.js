// Product API routes
const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { authenticate } = require('../middleware/authenticate');
const { authorizeAdmin } = require('../middleware/authorizeAdmin');
const { validate, schemas } = require('../middleware/validator');
const upload = require('../middleware/upload');

// Public routes
router.get('/', productController.getProducts);
router.get('/stats', productController.getProductStats);
router.get('/:id', productController.getProduct);

// Admin-only routes
router.post('/', authenticate, authorizeAdmin, upload.single('image'), validate(schemas.product), productController.createProduct);
router.post('/upload', authenticate, authorizeAdmin, upload.single('image'), productController.uploadImage);
router.put('/:id', authenticate, authorizeAdmin, upload.single('image'), validate(schemas.product), productController.updateProduct);
router.delete('/:id', authenticate, authorizeAdmin, productController.deleteProduct);

module.exports = router;