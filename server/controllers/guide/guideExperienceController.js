// guideExperienceController.js
import GuideExperience from '../../models/guide/guideExperienceModel.js';
// Fetch all experiences
export const getExperiences = async (req, res) => {
  console.log("Fetching all experiences in controller", req.ip, req.headers);
  try {
    const experiences = await GuideExperience.find();
    console.log("Fetched all experiences in controller");

    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching experiences' });
  }
};

// Add a new experience
export const addExperience = async (req, res) => {
  console.log("Adding experience in controller",req);
  const { guideID, title, description, startDate, endDate, status, location, tags, images, videos } = req.body;

  try {
    const newExperience = new GuideExperience({
      guideID,
      title,
      description,
      startDate,
      endDate,
      status,
      location,
      tags,
      images,
      videos,
    });

    const savedExperience = await newExperience.save();
    console.log("Experience saved");

    res.status(201).json(savedExperience);
  } catch (err) {
    res.status(500).json({ message: 'Error adding experience' });
  }
};

// Delete an experience
export const deleteExperience = async (req, res) => {
  try {
    await GuideExperience.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Experience deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting experience' });
  }
};