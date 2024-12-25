import HotelRoom from '../../models/business/HotelRoom.js';
import { BusinessUser } from '../../models/business/BusinessUser.js';

export const getHotelRoomsByBusinessUserId = async (req, res) => {
  try {
    const { businessUserId } = req.params;

    // Check if the business user exists and is a hotel
    const businessUser = await BusinessUser.findById(businessUserId);
    if (!businessUser) {
      return res.status(404).json({ message: 'Business user not found' });
    }
    if (businessUser.businessType !== 'hotel') {
      return res.status(400).json({ message: 'Business user is not a hotel' });
    }

    // Fetch all hotel rooms for the given business user
    const hotelRooms = await HotelRoom.find({ businessUser: businessUserId });

    res.json(hotelRooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching hotel rooms', error: error.message });
  }
};

