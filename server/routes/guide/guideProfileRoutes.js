import express from 'express';
import { uploadImage, updateGuideProfile } from '../../controllers/guide/guideProfileController.js';
import multer from 'multer';

// Multer middleware to handle image uploads
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

// Route to upload image to Cloudinary
router.post('/upload-image', upload.single('image'), uploadImage);

// Route to update the guide's profile
router.put('/update', updateGuideProfile);

export default router;
