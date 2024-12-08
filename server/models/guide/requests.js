const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the booking schema
const bookingSchema = new Schema(
  {
    tourist: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model for the tourist
      required: true,
    },
    guide: {
      type: Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model for the guide
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    requestStatus: {
      type: Boolean,
      default: false, // false = request not made, true = request made
    },
    area: {
      type: String,
      required: true, // Area where the guide will provide service
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Create the model
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
