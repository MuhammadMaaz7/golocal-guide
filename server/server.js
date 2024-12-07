import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import guideRoutes from './routes/guide/guideProfileRoutes.js';  // Default import

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api', guideRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
