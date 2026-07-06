// Products controller
const { Product } = require('../models');

// Get all products with filtering
exports.getProducts = async (req, res) => {
  try {
    const { category, subCategory, search } = req.query;
    let where = {};

    if (category) where.category = category;
    if (category === 'Shoes' && subCategory) where.subCategory = subCategory;
    if (search) where.name = { [require('sequelize').Op.like]: `%${search}%` };

    const products = await Product.findAll({ where });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Get a single product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

// Create a product (admin only)
exports.createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Product image is required' });
    }

    const product = await Product.create({
      ...req.body,
      imageUrl: `/uploads/${req.file.filename}`
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: 'Error creating product' });
  }
};

// Update a product (admin only)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const updateData = { ...req.body };
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    await product.update(updateData);
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: 'Error updating product' });
  }
};

// Delete a product (admin only)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    await product.destroy();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};

// Get product statistics
exports.getProductStats = async (req, res) => {
  try {
    const stats = {
      Shoes: await Product.count({ where: { category: 'Shoes' } }),
      Toys: await Product.count({ where: { category: 'Toys' } }),
      Perfumes: await Product.count({ where: { category: 'Perfumes' } }),
      Accessories: await Product.count({ where: { category: 'Accessories' } }),
      total: await Product.count()
    };
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product stats' });
  }
};

// Upload a product image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No uploaded file' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ imageUrl });
  } catch (error) {
    res.status(500).json({ error: 'Error uploading image' });
  }
};