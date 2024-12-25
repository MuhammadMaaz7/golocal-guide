import express from 'express';
import HotelsRestaurantsController from '../../controllers/tourist/HotelsRestaurantsController.js';

const router = express.Router();

router.get('/hotels/:city', HotelsRestaurantsController.getHotelsByCity);

// Get restaurants by city
router.get('/restaurants/:city', HotelsRestaurantsController.getRestaurantsByCity);


export default router;