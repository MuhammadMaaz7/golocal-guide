import RoomBooking from '../../models/tourist/RoomBooking.js';
import HotelRoom from '../../models/business/HotelRoom.js';

export const createRoomBooking = async (req, res) => {
  try {
    const {
      hotelRoomId,
      checkIn,
      checkOut,
      numberOfGuests,
      specialRequests,
      contactInformation
    } = req.body;

    // Verify the room exists and get its details
    const hotelRoom = await HotelRoom.findById(hotelRoomId);
    if (!hotelRoom) {
      return res.status(404).json({ message: 'Hotel room not found' });
    }

    // Verify room capacity
    if (numberOfGuests.adults + numberOfGuests.children > 
        hotelRoom.capacity.adults + hotelRoom.capacity.children) {
      return res.status(400).json({ 
        message: 'Number of guests exceeds room capacity' 
      });
    }

    // Calculate total price (assuming price per night)
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const numberOfNights = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
    );
    const totalPrice = hotelRoom.price * numberOfNights;

    // Create the booking
    const booking = new RoomBooking({
      user: req.user._id, // Assuming user is attached by auth middleware
      hotelRoom: hotelRoomId,
      businessUser: hotelRoom.businessUser,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      numberOfGuests,
      totalPrice,
      specialRequests,
      contactInformation
    });

    await booking.save();

    // Populate necessary fields for response
    await booking.populate('hotelRoom');
    await booking.populate('businessUser', 'businessName contactInfo');

    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating room booking:', error);
    res.status(500).json({ 
      message: 'Error creating room booking', 
      error: error.message 
    });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await RoomBooking.find({ user: req.user._id })
      .populate('hotelRoom')
      .populate('businessUser', 'businessName contactInfo')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching user bookings:', error);
    res.status(500).json({ 
      message: 'Error fetching bookings', 
      error: error.message 
    });
  }
};

export const getBookingById = async (req, res) => {
  try {
    const booking = await RoomBooking.findById(req.params.id)
      .populate('hotelRoom')
      .populate('businessUser', 'businessName contactInfo');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Verify user owns this booking or is the business owner
    if (booking.user.toString() !== req.user._id.toString() && 
        booking.businessUser._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    res.status(500).json({ 
      message: 'Error fetching booking', 
      error: error.message 
    });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await RoomBooking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Only allow business owner to update status
    if (booking.businessUser.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    booking.status = status;
    if (status === 'cancelled') {
      booking.cancellationDate = new Date();
      booking.cancellationReason = req.body.cancellationReason;
    }

    await booking.save();
    await booking.populate('hotelRoom');
    await booking.populate('businessUser', 'businessName contactInfo');

    res.json(booking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ 
      message: 'Error updating booking', 
      error: error.message 
    });
  }
};

// New function to get completed bookings
export const getCompletedBookings = async (req, res) => {
  try {
    const completedBookings = await RoomBooking.find({
      user: req.user._id,
      status: 'completed'
    })
    .populate('hotelRoom', 'name')
    .populate('businessUser', 'businessName')
    .sort('-checkOut');

    res.json(completedBookings);
  } catch (error) {
    console.error('Error fetching completed bookings:', error);
    res.status(500).json({ 
      message: 'Error fetching completed bookings', 
      error: error.message 
    });
  }
};