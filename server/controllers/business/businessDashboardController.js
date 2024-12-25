import { BusinessUser } from '../../models/business/BusinessUser.js';

export const getBusinessProfile = async (req, res) => {
  try {
    const { userId } = req.params; // Extract userId from the URL
    const businessUser = await BusinessUser.findOne({ user: userId });
    if (!businessUser) {
      return res.status(404).json({ message: 'Business user not found' });
    }
    res.json(businessUser);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business profile', error: error.message });
  }
};