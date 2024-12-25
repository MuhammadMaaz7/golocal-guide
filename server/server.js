import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import businessSetupRoutes from './routes/business/businessSetupRoutes.js';
import serviceRoutes from './routes/business/serviceRoutes.js';
import ManageBookingRoutes from './routes/business/ManageBookingRoutes.js'
import businessdasboardRoutes from './routes/business/businessDashboardRoutes.js'

import userRoutes from './routes/tourist/userRoutes.js';
import destinationRoutes from './routes/tourist/destinationRoutes.js';
import hotelsRestaurantsRoutes from './routes/tourist/HotelsRestaurantsRoutes.js';
import hotelRoomRoutes from './routes/tourist/hotelRoomRoutes.js';  
import roomBookingRoutes from './routes/tourist/roomBookingRoutes.js';
import tableBookingRoutes from './routes/tourist/tableBookingRoutes.js';
import guideRequestRoutes from './routes/tourist/guideRequestRoutes.js';

import guideRoutes from './routes/guide/guideProfileRoutes.js';  // Default import
import experienceRoutes from './routes/guide/guideExperienceRoutes.js';  // Default import
import packageRoutes from './routes/guide/packagesRoutes.js';  // Default import
import guidereqsRoutes from './routes/guide/guideRequestsRoutes.js';

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
app.use(cors());
app.use(express.json());

connectDB(); // Connect to the database

// Mount routes with proper prefixes
app.use('/api/users', userRoutes);
app.use('/api/destinations', destinationRoutes); // Added proper prefix for consistency
app.use('/api', hotelsRestaurantsRoutes);
app.use('/api/hotel-rooms', hotelRoomRoutes);  
app.use('/api/room-bookings', roomBookingRoutes);
app.use('/api/table-bookings', tableBookingRoutes);
app.use('/api/guide-requests', guideRequestRoutes);

app.use('/api/guide', guideRoutes); // Changed to /api/guides to match frontend requests
app.use('/api', packageRoutes);  // Prefix all package routes with /api
app.use('/api', experienceRoutes);  // Prefix all package routes with /api
app.use('/api', guidereqsRoutes);

app.use('/api/business-setup', businessSetupRoutes);
app.use('/api/manage-services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/business-setup', businessSetupRoutes);
app.use('/api/manage-services', serviceRoutes);
app.use('/api/manage-bookings', ManageBookingRoutes);
app.use('/api/business-dashboard',businessdasboardRoutes);



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