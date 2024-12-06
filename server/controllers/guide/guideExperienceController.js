// server/controllers/experienceController.js

import Experience from '../../models/guide/GuideExperienceModel.js';
import multer from 'multer';
import path from 'path';

// Configure multer for file storage (images, videos, attachments)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export const uploadFiles = upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'videos', maxCount: 2 },
  { name: 'attachments', maxCount: 3 },
]);

// Add experience
export const addExperience = async (req, res) => {
  try {
    const { title, description, startDate, endDate, guideID, status, location, rating, skillsLearned, tags } = req.body;
    const newExperience = new Experience({
      title,
      description,
      startDate,
      endDate,
      guideID,
      status,
      location,
      rating,
      skillsLearned,
      tags,
      images: req.files.images ? req.files.images.map((file) => file.path) : [],
      videos: req.files.videos ? req.files.videos.map((file) => file.path) : [],
      attachments: req.files.attachments ? req.files.attachments.map((file) => file.path) : [],
    });

    await newExperience.save();
    res.status(201).json(newExperience);
  } catch (error) {
    res.status(400).json({ message: 'Error adding experience', error });
  }
};

// Get all experiences for a specific guide
export const getExperiencesByGuide = async (req, res) => {
  try {
    const experiences = await Experience.find({ guideID: req.params.guideID });
    res.status(200).json(experiences);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching experiences', error });
  }
};

// Update experience
export const updateExperience = async (req, res) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedExperience);
  } catch (error) {
    res.status(400).json({ message: 'Error updating experience', error });
  }
};

// Delete experience
export const deleteExperience = async (req, res) => {
  try {
    await Experience.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting experience', error });
  }
};
