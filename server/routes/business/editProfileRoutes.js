import express from 'express';
import { getBusinessUserDetails, updateUserProfile } from '../../controllers/business/businessSetupController.js';
import auth from '../../middleware/auth.js';

const router = express.Router();

// Fetch user profile details
router.get('/:id', auth, getBusinessUserDetails);

// Update user profile
router.put('/:id', auth, updateUserProfile);

export default router;