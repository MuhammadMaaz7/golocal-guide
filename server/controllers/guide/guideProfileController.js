import cloudinary from '../../config/cloudinary.js';
import Guide from '../../models/guideModel.js';
import multer from 'multer';

// Multer setup to handle file uploads
const storage = multer.memoryStorage(); // Store image in memory
const upload = multer({ storage: storage });

// Upload profile image to Cloudinary
const uploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send('No file uploaded.');

    const result = await cloudinary.uploader.upload(file.buffer, {
      folder: 'guide_profile_images', // Customize the folder name if needed
    });

    res.json({ imageUrl: result.secure_url }); // Send the URL of the uploaded image
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send('Server error');
  }
};

// Update guide profile, including the profile picture URL
const updateGuideProfile = async (req, res) => {
  const { guideId, name, guideType, yearsOfExperience, fee, languages, expertiseAreas, profilePictureURL } = req.body;

  try {
    const guide = await Guide.findById(guideId);
    if (!guide) return res.status(404).send('Guide not found.');

    guide.name = name || guide.name;
    guide.guideType = guideType || guide.guideType;
    guide.yearsOfExperience = yearsOfExperience || guide.yearsOfExperience;
    guide.fee = fee || guide.fee;
    guide.languages = languages || guide.languages;
    guide.expertiseAreas = expertiseAreas || guide.expertiseAreas;
    guide.profilePictureURL = profilePictureURL || guide.profilePictureURL;

    await guide.save();
    res.json(guide);
  } catch (error) {
    console.error('Error updating guide profile:', error);
    res.status(500).send('Server error');
  }
};

export { uploadImage, updateGuideProfile };
