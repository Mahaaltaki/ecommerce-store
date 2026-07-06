# E-Commerce Store

A full-stack e-commerce web application built with React, Express, Sequelize and Tailwind CSS. The app supports product browsing, cart management, user authentication, and an admin dashboard for managing products and orders.

## Tech Stack

- **Frontend**: React 18, Framer Motion, Tailwind CSS
- **Backend**: Express, Sequelize ORM, SQLite
- **Auth**: JWT with bcrypt password hashing
- **Payments**: Stripe Checkout
- **Uploads**: Multer (image uploads)

## Project Structure

```
├── frontend/          # React client
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   └── public/
├── backend/           # Express API server
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   └── server.js
```

## Prerequisites

- Node.js >= 16
- npm or yarn

## Getting Started

### Backend

```bash
cd backend
npm install
npm run dev
```

Server runs on `http://localhost:5000`.

### Frontend

```bash
npm install
npm start
```

Client runs on `http://localhost:3000`.

## Environment Variables

Create a `.env` file in the backend root:

```env
PORT=5000
JWT_SECRET=your-jwt-secret
JWT_EXPIRES_IN=7d
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Features

- Browse products by category with search and filtering
- Shopping cart with local persistence
- User registration and login
- Admin dashboard with product and order management
- Stripe payment integration
- Image upload for products
- RTL layout support

## Default Admin Credentials

```
Email: admin@store.com
Password: admin123
```

## License

MIT
