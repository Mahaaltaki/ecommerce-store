const db = require('./models');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
  try {
    const existingAdmin = await db.User.findOne({ where: { email: 'admin@store.com' } });
    
    if (existingAdmin) {
      if (existingAdmin.role !== 'admin') {
        await existingAdmin.update({ role: 'admin' });
        console.log('✅ Admin role updated to admin');
      } else {
        console.log('✅ Admin account already exists');
      }
      console.log('📧 Email: admin@store.com');
      console.log('🔑 Password: admin123');
      console.log('🛡️ Current role: admin');
      return;
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = await db.User.create({
      name: 'Admin',
      email: 'admin@store.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('✅ Admin account created successfully!');
    console.log('📧 Email: admin@store.com');
    console.log('🔑 Password: admin123');
    console.log('🛡️ Role:', admin.role);
  } catch (error) {
    console.error('❌ Error creating admin account:', error);
  }
};

module.exports = seedAdmin;
