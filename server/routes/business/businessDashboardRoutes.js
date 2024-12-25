import express from 'express';
import { getBusinessProfile } from '../../controllers/business/businessDashboardController.js';
import auth from '../../middleware/auth.js';
import { getBookings } from '../../controllers/business/ManageBookingController.js';

const router = express.Router();

router.get('/:userId', auth, getBusinessProfile);
router.get('/',auth,getBookings);

export default router;