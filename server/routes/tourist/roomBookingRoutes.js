import express from 'express';
import { 
  createRoomBooking, 
  getUserBookings,
  getBookingById,
  updateBookingStatus,
  getCompletedBookings // New controller function
} from '../../controllers/tourist/roomBookingController.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

// Create a new booking
router.post('/', createRoomBooking);

// Get all Room bookings for the logged-in user
router.get('/my-bookings', getUserBookings);

// Get completed bookings for the logged-in user
router.get('/completed', getCompletedBookings); // New route

// Get a specific booking by ID
router.get('/:id', getBookingById);

// Update booking status (for business owners)
router.patch('/:id/status', updateBookingStatus);

export default router;