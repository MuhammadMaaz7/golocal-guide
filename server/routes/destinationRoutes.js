import express from 'express';
import destinationController from '../controllers/destinationController.js';

const router = express.Router();

// const auth = require('../middleware/auth');

// Public routes
router.get('/destinations', destinationController.getDestinations);
router.get('/destinations/:id', destinationController.getDestination);

// Protected routes
// router.post('/destinations/:id/favorite', auth, destinationController.toggleFavorite);
router.post('/destinations/:id/favorite', destinationController.toggleFavorite);

export default router;