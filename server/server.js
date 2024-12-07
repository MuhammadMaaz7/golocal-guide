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

// Example login route for issuing JWT tokens
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Simulate user authentication (replace this with real database check)
  if (username === 'admin' && password === 'password') {
    const user = { username }; // This can be expanded to include more user details
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
