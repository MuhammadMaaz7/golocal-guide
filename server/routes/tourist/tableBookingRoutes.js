import express from 'express';
import {
  createTableBooking,
  getUserBookings,
  getBusinessBookings,
  updateBookingStatus,
  cancelBooking
} from '../../controllers/tourist/tableBookingController.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

// Protected routes (require authentication)
router.use(auth);

// Create new booking
router.post('/', createTableBooking);

// Get user's Table bookings
router.get('/my-bookings', getUserBookings);

// Get business bookings
router.get('/business/:businessId', getBusinessBookings);

// Update booking status (could be restricted to business owners)
router.patch('/:bookingId/status', updateBookingStatus);

// Cancel booking
router.patch('/:bookingId/cancel', cancelBooking);

export default router;