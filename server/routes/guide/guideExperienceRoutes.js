// server/routes/experienceRoutes.js

import express from 'express';
import {
  addExperience,
  getExperiencesByGuide,
  updateExperience,
  deleteExperience,
  uploadFiles
} from '../../controllers/guide/guideExperienceController.js';

const router = express.Router();

// Add experience
router.post('/', uploadFiles, addExperience);

// Get experiences by guide ID
router.get('/:guideID', getExperiencesByGuide);

// Update an experience
router.put('/:id', uploadFiles, updateExperience);

// Delete an experience
router.delete('/:id', deleteExperience);

export default router;
