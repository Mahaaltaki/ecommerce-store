const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');
const path = require('path');
const seedAdmin = require('./seed');

dotenv.config();

const app = express();

// ==========================================
// CORS - Correct configuration
// ==========================================
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==========================================
// Routes
// ==========================================

// Register /api/health before other routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running successfully!',
    timestamp: new Date().toISOString()
  });
});

// Main routes
try {
  const authRoutes = require('./routes/auth.routes');
  const productRoutes = require('./routes/product.routes');
  const orderRoutes = require('./routes/order.routes');

  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/orders', orderRoutes);
  
  console.log('✅ All routes loaded successfully');
} catch (err) {
  console.error('❌ Error loading routes:', err.message);
}

// ==========================================
// Error Handling
// ==========================================
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({ 
    message: 'An internal server error occurred',
    error: err.message
  });
});

// ==========================================
// Start server
// ==========================================
const PORT = process.env.PORT || 5000;

db.sequelize.sync({ alter: true }).then(async () => {
  console.log('✅ Database connected and synced');
  await seedAdmin();
  
  app.listen(PORT, () => {
    console.log('========================================');
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📡 Test: http://localhost:${PORT}/api/health`);
    console.log('========================================');
  });
}).catch(err => {
  console.error('❌ Database connection error:', err);
});