const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// Define models
const Product = require('./product.model')(sequelize, Sequelize.DataTypes);
const User = require('./user.model')(sequelize, Sequelize.DataTypes);
const Order = require('./order.model')(sequelize, Sequelize.DataTypes);
const CartItem = require('./cartItem.model')(sequelize, Sequelize.DataTypes);

// Define associations
User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Order, { through: CartItem });

module.exports = {
  sequelize,
  db: { sequelize },
  Product,
  User,
  Order,
  CartItem
};