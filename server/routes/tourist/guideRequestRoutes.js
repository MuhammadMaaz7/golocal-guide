// routes/tourist/guideRequestRoutes.js
import express from 'express';
import { createGuideRequest, getGuideRequests, updateGuideRequest } from '../../controllers/tourist/guideRequestController.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(auth);

router.post('/',createGuideRequest);
router.get('/', getGuideRequests);
router.patch('/:id',updateGuideRequest);

export default router;