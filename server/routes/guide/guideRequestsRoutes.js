import express from 'express';
import { getGuideRequests, updateGuideRequestStatus, getChatMessages, sendChatMessage } from '../../controllers/guide/guideRequestsController.js';
import authMiddleware from '../../middleware/auth.js'; // Ensure this middleware checks authentication

const router = express.Router();

router.use(authMiddleware); // Apply authentication middleware to all routes

router.get('/guide/requests', getGuideRequests);
router.put('/guide/requests/:requestId/status', updateGuideRequestStatus);
router.get('/guide/requests/:requestId/chat', getChatMessages);
router.post('/guide/requests/:requestId/chat', sendChatMessage);


export default router;

