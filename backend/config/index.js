// Core configuration file
module.exports = {
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpiresIn: '7d',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY || 'sk_test_your_stripe_key',
  stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET || 'whsec_your_webhook_secret',
};