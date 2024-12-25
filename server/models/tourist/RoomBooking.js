import mongoose from 'mongoose';

const roomBookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  hotelRoom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HotelRoom',
    required: true
  },
  businessUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessUser',
    required: true
  },
  checkIn: {
    type: Date,
    required: true
  },
  checkOut: {
    type: Date,
    required: true
  },
  numberOfGuests: {
    adults: {
      type: Number,
      required: true,
      min: 1
    },
    children: {
      type: Number,
      default: 0
    }
  },
  totalPrice: {
    type: Number
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  specialRequests: {
    type: String
  },
  contactInformation: {
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    }
  },
  cancellationReason: {
    type: String
  },
  cancellationDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Add index for faster queries
roomBookingSchema.index({ user: 1, status: 1 });
roomBookingSchema.index({ businessUser: 1, status: 1 });
roomBookingSchema.index({ hotelRoom: 1, status: 1 });

const RoomBooking = mongoose.model('RoomBooking', roomBookingSchema);

export default RoomBooking;

