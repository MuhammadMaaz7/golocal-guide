import cloudinary from '../../config/cloudinary.js';
import Guide from '../../models/guide/guideModel.js';
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

const getGuideProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Retrieved from auth middleware
    const guide = await Guide.findOne({ userID: req.user.id }).populate('userID', 'name email profilePictureURL');

      
    if (!guide) return res.status(404).json({ message: 'Guide not found' });
    guide.profilePictureURL='https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png';

    res.status(200).json(guide);
  } catch (error) {
    console.error('Error fetching guide profile:', error);
    res.status(500).json({ message: 'Error fetching guide profile.' });
  }
};


// Update guide profile, including the profile picture URL
const updateGuideProfile = async (req, res) => {
  console.log("UpdateGuideProfile in controller,", req);
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

    // Check if the profilePictureURL is empty
    guide.profilePictureURL =  guide.profilePictureURL || 
      "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper.png";

    await guide.save();
    console.log("Updated guide in controller");

    res.json(guide);
  } catch (error) {
    console.error('Error updating guide profile:', error);
    res.status(500).send('Server error');
  }
};


export { uploadImage, updateGuideProfile };
