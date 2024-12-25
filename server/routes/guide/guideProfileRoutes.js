import express from 'express';
import authMiddleware from '../../middleware/auth.js'; // Ensure this middleware checks authentication

import Guide from '../../models/guide/guideModel.js';

const router = express.Router();
router.get('/profile', authMiddleware, async (req, res) => {
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

router.post('/profile', authMiddleware, async (req, res) => {
  console.log("Updating guide profile...");
  try {
    const { id } = req.user; // Extract user ID from the auth middleware
    const {
      bio,
      specialties,
      availability,
      profilePictureURL,
      phone,
      languages,
      yearsOfExperience,
      expertiseAreas,
      guideType,
      rating,
      totalReviews,
      specialization,
      experience,  // Other fields as needed based on the input
    } = req.body; // Destructure fields to update from the request body

    // Ensure the guide exists based on userID
    const guide = await Guide.findOne({ userID: id });
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    console.log("Guide Found");

    // Update guide profile with provided data
    if (bio !== undefined) guide.bio = bio;
    if (specialties !== undefined) guide.specialties = specialties;
    if (availability !== undefined) guide.availability = availability;
    if (profilePictureURL !== undefined) guide.profilePictureURL = profilePictureURL;
    if (phone !== undefined) guide.phone = phone;  // Update phone number
    if (languages !== undefined) guide.languages = languages;  // Update languages
    if (yearsOfExperience !== undefined) guide.yearsOfExperience = yearsOfExperience;
    if (expertiseAreas !== undefined) guide.expertiseAreas = expertiseAreas;
    if (guideType !== undefined) guide.guideType = guideType;
    if (rating !== undefined) guide.rating = rating;
    if (totalReviews !== undefined) guide.totalReviews = totalReviews;
    if (specialization !== undefined) guide.specialization = specialization;
    if (experience !== undefined) guide.experience = experience;  // Update experience if provided

    // Save the updated guide profile
    const updatedGuide = await guide.save();
    console.log("User updated successfully in the router");

    console.log('Updated Guide Data:', updatedGuide); // Log the updated guide data
    res.status(200).json({ message: 'Guide profile updated successfully', guide: updatedGuide });
  } catch (error) {
    console.error('Error updating guide profile:', error);
    res.status(500).json({ message: 'Error updating guide profile' });
  }
});

// Route for fetching guide data by guide ID
router.get('/:id', async (req, res) => {
  try {
    const guideId = req.params.id;

    // Fetch guide data by ID
    const guide = await Guide.findById(guideId);

    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    res.status(200).json(guide);
  } catch (error) {
    console.error('Error fetching guide by ID:', error);
    res.status(500).json({ message: 'Error fetching guide by ID' });
  }
});

// Route for fetching all guides
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const guides = await Guide.find()
      .skip(skip)
      .limit(limit)
      .populate('userID', 'name email profilePictureURL');

    const total = await Guide.countDocuments();

    res.status(200).json({
      guides,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalGuides: total
    });
  } catch (error) {
    console.error('Error fetching all guides:', error);
    res.status(500).json({ message: 'Error fetching all guides' });
  }
});



export default router;
