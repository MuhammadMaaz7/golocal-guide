import TableBooking from '../../models/tourist/TableBooking.js';

// Create a new table booking
export const createTableBooking = async (req, res) => {
  try {
    const { businessId, date, time, numberOfPeople, specialRequests } = req.body;
    const userId = req.user._id; // Assuming user is authenticated

    // Create new booking
    const booking = new TableBooking({
      userId,
      businessId,
      date,
      time,
      numberOfPeople,
      specialRequests
    });

    await booking.save();

    res.status(201).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const bookings = await TableBooking.find({ userId })
      .populate('businessId', 'name location')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all bookings for a business
export const getBusinessBookings = async (req, res) => {
  try {
    const { businessId } = req.params;
    
    // if (!validateObjectId(businessId)) {
    //   return res.status(400).json({ message: 'Invalid business ID' });
    // }

    const bookings = await TableBooking.find({ businessId })
      .populate('userId', 'name email')
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    // if (!validateObjectId(bookingId)) {
    //   return res.status(400).json({ message: 'Invalid booking ID' });
    // }

    const booking = await TableBooking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const userId = req.user._id;

    // if (!validateObjectId(bookingId)) {
    //   return res.status(400).json({ message: 'Invalid booking ID' });
    // }

    const booking = await TableBooking.findOne({ _id: bookingId, userId });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};