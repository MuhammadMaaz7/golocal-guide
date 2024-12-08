import express from 'express';
import authMiddleware from '../../middleware/auth.js'; // Ensure this middleware checks authentication

import Guide from '../../models/guide/guideModel.js';

const router = express.Router();
router.get('/guide/profile', authMiddleware, async (req, res) => {
  try {
    console.log('User ID from middleware:', req.user.id); // Log the user ID
    const guide = await Guide.findOne({ userID: req.user.id }).populate(
      'userID',
      'name email profilePictureURL'
    );
    console.log('Guide Data:', guide); // Log the guide data
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    res.status(200).json(guide);
  } catch (error) {
    console.error('Error fetching guide info:', error);
    res.status(500).json({ message: 'Error fetching guide info' });
  }
});

router.put('/guide/profile', authMiddleware, async (req, res) => {
  console.log("Udating info");
  try {
    const { id } = req.user; // Extract user ID from auth middleware
    const { bio, specialties, availability, profilePictureURL } = req.body; // Add other fields as needed

    // Ensure the user is authenticated and guide exists
    const guide = await Guide.findOne({ userID: id });
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    console.log("Guide Found");


    // Update the guide profile with the provided data
    if (bio !== undefined) guide.bio = bio;
    if (specialties !== undefined) guide.specialties = specialties;
    if (availability !== undefined) guide.availability = availability;
    if (profilePictureURL !== undefined) guide.profilePictureURL = profilePictureURL;

    // Save the updated guide profile
    const updatedGuide = await guide.save();
    console.log("User updated Successfully in the router");

    console.log('Updated Guide Data:', updatedGuide); // Log the updated guide data
    res.status(200).json({ message: 'Guide profile updated successfully', guide: updatedGuide });
  } catch (error) {
    console.error('Error updating guide profile:', error);
    res.status(500).json({ message: 'Error updating guide profile' });
  }
});



export default router;
