import express from 'express';
import { getHotelRoomsByBusinessUserId } from '../../controllers/tourist/hotelRoomController.js';

const router = express.Router();

router.get('/business/:businessUserId', getHotelRoomsByBusinessUserId);

export default router;

