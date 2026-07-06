# E-Commerce Store 🛒

A full-stack e-commerce web application built with React, Express, Sequelize and Tailwind CSS. The app supports product browsing, cart management, user authentication, and an admin dashboard for managing products and orders.

## 🚀 Tech Stack

- **Frontend**: React 18, Framer Motion, Tailwind CSS
- **Backend**: Express, Sequelize ORM, SQLite
- **Auth**: JWT with bcrypt password hashing
- **Payments**: Stripe Checkout
- **Uploads**: Multer (image uploads)

## 📁 Project Structure

```
├── src/                    # React client
│   ├── components/         # Reusable components
│   ├── context/           # React Context (Cart)
│   ├── pages/             # Page components (Login)
│   ├── services/          # API services
│   ├── App.jsx            # Main app component
│   └── index.css          # Global styles
├── backend/               # Express API server
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/           # Sequelize models
│   ├── routes/           # API routes
│   ├── uploads/          # Uploaded images
│   ├── config/           # Configuration
│   ├── seed.js           # Database seeding
│   └── server.js         # Server entry point
├── public/               # Static files
├── package.json          # Frontend dependencies
└── README.md             # This file
```

## 📋 Prerequisites

- Node.js >= 16
- npm or yarn

## 🔧 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mahaaltaki/ecommerce-store.git
cd ecommerce-store
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 3. Setup Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cd backend
cp .env.example .env
```

Or create it manually with:

```env
JWT_SECRET=your-super-secret-key-change-in-production
STRIPE_SECRET_KEY=sk_test_your_stripe_key_here
PORT=5000
```

### 4. Start the Backend Server

```bash
cd backend
node server.js
```

Server runs on `http://localhost:5000`.

### 5. Start the Frontend Development Server

```bash
# In a new terminal
npm start
```

Client runs on `http://localhost:3000`.

## ✨ Features

- 🛍️ **Product Browsing**: Browse products by category with search and filtering
- 🛒 **Shopping Cart**: Add to cart with local persistence
- 🔐 **User Authentication**: Registration and login with JWT
- 👨‍💼 **Admin Dashboard**: Product and order management
- 💳 **Stripe Integration**: Secure payment processing
- 📸 **Image Upload**: Upload product images
- 🌐 **RTL Support**: Arabic language support with RTL layout
- 🎨 **Modern UI**: Glassmorphism design with Framer Motion animations

## 🔑 Default Admin Credentials

```
Email: admin@store.com
Password: admin123
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)
- `GET /api/products/stats` - Get product statistics (Admin only)
- `POST /api/products/upload` - Upload product image (Admin only)

### Orders
- `GET /api/orders` - Get all orders (Admin only)
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get single order

## 🗄️ Database

The application uses SQLite for development. The database file (`database.sqlite`) is created automatically when the server starts.

## 📝 License

MIT

## 👤 Author

[Maha Altaki](https://github.com/Mahaaltaki)
