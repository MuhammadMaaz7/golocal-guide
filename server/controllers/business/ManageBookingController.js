// controllers/bookingController.js
import RoomBooking from '../../models/tourist/RoomBooking.js';
import TableBooking from '../../models/tourist/TableBooking.js';
import { BusinessUser } from '../../models/business/BusinessUser.js';

export const getBookings = async (req, res) => {
  try {
    const businessUser = await BusinessUser.findOne({ user: req.user._id });
    if (!businessUser) {
      return res.status(404).json({ message: 'Business user not found' });
    }

    let bookings;
    if (businessUser.businessType === 'hotel') {
      bookings = await RoomBooking.find({ businessUser: businessUser._id }).populate('user hotelRoom');
    } else if (businessUser.businessType === 'restaurant') {
      bookings = await TableBooking.find({ businessId: businessUser._id }).populate('userId');
    } else {
      return res.status(400).json({ message: 'Invalid business type' });
    }

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await RoomBooking.findByIdAndUpdate(id, { status: 'confirmed' }, { new: true });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error confirming booking', error: error.message });
  }
};

export const declineBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await RoomBooking.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error declining booking', error: error.message });
  }
};