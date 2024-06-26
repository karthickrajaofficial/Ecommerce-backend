import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

// Import routes and utility functions
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

dotenv.config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Middleware configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://jewelfrontend.vercel.app'], // add all allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);

// Example route to fetch PayPal client ID
// Uncomment if needed
// app.get('/api/config/paypal', (req, res) => {
//   res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
// });

// Example route to fetch Razorpay key ID
app.get('/api/config/razorpay-key-id', (req, res) => {
  const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  res.json({ razorpayKeyId });
});

// Payment routes
app.use('/api/payment', paymentRoutes);

// Serve uploaded files
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Serve static files from the React app
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
  });
}

// Start server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
