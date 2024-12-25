// guideExperienceRoutes.js
import express from 'express';
import multer from 'multer';
import { getExperiences, addExperience, deleteExperience } from '../../controllers/guide/guideExperienceController.js';

const router = express.Router();

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.get('/experiences', getExperiences);
router.post('/experiences', addExperience);
router.delete('/experiences/:id', deleteExperience);
export default router;
