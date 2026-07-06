// Orders controller
const { Order, CartItem, Product } = require('../models');
const stripe = require('stripe')(require('../config').stripeSecretKey);

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { userId, items } = req.body;

    // Calculate total amount
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        totalAmount += product.price * item.quantity;
      }
    }

    // Create a Stripe checkout session for payment
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name
          },
          unit_amount: Math.round(item.price * 100)
        },
        quantity: item.quantity
      })),
      mode: 'payment',
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`
    });

    // Create order in the database
    const order = await Order.create({
      userId,
      totalAmount,
      stripeSessionId: session.id
    });

    res.status(201).json({
      orderId: order.id,
      sessionId: session.id
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.id);

    if (!order) return res.status(404).json({ error: 'Order not found' });

    await order.update({ status });
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: 'Error updating order status' });
  }
};

// Get orders for the authenticated user
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
    }
  };

// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']]
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};