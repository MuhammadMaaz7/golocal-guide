import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the Request schema
const requestSchema = new Schema(
  {
    tourist: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Tourist is required'], // Reference to User model
    },
    guide: {
      type: Schema.Types.ObjectId,
      ref: 'Guide',
      required: [true, 'Guide is required'], // Reference to Guide model
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
      validate: {
        validator: function (value) {
          return value > Date.now(); // Ensure start date is in the future
        },
        message: 'Start date must be in the future',
      },
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required'],
      validate: {
        validator: function (value) {
          return value > this.startDate; // Ensure end date is after start date
        },
        message: 'End date must be after the start date',
      },
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'confirmed', 'completed', 'cancelled'],
        message: 'Invalid status value',
      },
      default: 'pending',
    },
    area: {
      type: String,
      required: [true, 'Area is required'],
      minlength: [3, 'Area name must be at least 3 characters long'],
      maxlength: [100, 'Area name must not exceed 100 characters'],
    },
    phone: {
      type: String,
      validate: {
        validator: function (value) {
          return /^\+?[1-9]\d{1,14}$/.test(value); // Validates international phone number format
        },
        message: 'Invalid phone number format',
      },
    },
    message: {
      type: String,
      maxlength: [500, 'Message must not exceed 500 characters'],
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
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

// Create the model
const Request = mongoose.model('Request', requestSchema);

export default Request;
