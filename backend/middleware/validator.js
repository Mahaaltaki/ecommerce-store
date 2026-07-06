const Joi = require('joi');

// Validation schemas
const schemas = {
  // Product validation
  product: Joi.object({
    name: Joi.string().min(3).max(200).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().min(10).max(1000).required(),
    imageUrl: Joi.string().allow('').optional(), // Optional for upload endpoint
    category: Joi.string().valid('Shoes', 'Toys', 'Perfumes', 'Accessories').required(),
    subCategory: Joi.string().valid('Athletic', 'Regular').optional(),
    rating: Joi.number().min(0).max(5).optional()
  }),

  // User registration validation
  register: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required()
  }),

  // User login validation
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),

  // Order creation validation
  order: Joi.object({
    userId: Joi.number().integer().positive().required(),
    items: Joi.array().items(
      Joi.object({
        productId: Joi.number().integer().positive().required(),
        quantity: Joi.number().integer().positive().required(),
        price: Joi.number().positive().required(),
        name: Joi.string().required()
      })
    ).min(1).required()
  })
};

// Validation middleware factory
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      const errorMessage = error.details.map(detail => detail.message).join(', ');
      return res.status(400).json({ 
        error: 'Validation failed',
        details: errorMessage 
      });
    }

    req.body = value;
    next();
  };
};

module.exports = { validate, schemas };
