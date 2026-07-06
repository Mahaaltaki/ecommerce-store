const db = require('./models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config');

const testLogin = async () => {
  try {
    const email = 'admin@store.com';
    const password = 'admin123';

    console.log('🔍 Searching for user...');
    const user = await db.User.findOne({ where: { email } });

    if (!user) {
      console.log('❌ User not found');
      return;
    }

      console.log('✅ User found:', user.email);
      console.log('🛡️ Role:', user.role);

    console.log('🔑 Verifying password...');
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      console.log('❌ Password incorrect');
      return;
    }

    console.log('✅ Password correct');

    console.log('🎫 Generating token...');
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    console.log('✅ Token generated successfully');
    console.log('🎫 Token:', token.substring(0, 50) + '...');
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit();
  }
};

testLogin();
