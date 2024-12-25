// routes/bookingRoutes.js
import express from 'express';
import { getBookings, confirmBooking, declineBooking } from '../../controllers/business/ManageBookingController.js';
import auth from '../../middleware/auth.js'; // Assuming you have an authentication middleware

const router = express.Router();

router.get('/', auth, getBookings);
router.put('/confirm/:id', auth, confirmBooking);
router.put('/decline/:id', auth, declineBooking);

export default router;