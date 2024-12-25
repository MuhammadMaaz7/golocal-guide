import express from 'express';
import destinationController from '../../controllers/tourist/destinationController.js';

const router = express.Router();

import auth from '../../middleware/auth.js';

// Public routes
router.get('/', destinationController.getDestinations);
router.get('/:id', destinationController.getDestination);

// Protected routes
// router.post('/:id/favorite', auth, destinationController.toggleFavorite);
router.post('/:id/favorite', auth, destinationController.toggleFavorite);

export default router;