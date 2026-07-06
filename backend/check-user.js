const db = require('./models');

const checkUser = async () => {
  try {
    const user = await db.User.findOne({
      where: { email: 'admin@store.com' }
    });

    if (user) {
      console.log('✅ User found:');
      console.log('📧 Email:', user.email);
      console.log('👤 Name:', user.name);
      console.log('🛡️ Role:', user.role);
      console.log('🔑 Password (hashed):', user.password.substring(0, 20) + '...');
    } else {
      console.log('❌ User not found');
    }
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit();
  }
};

checkUser();
