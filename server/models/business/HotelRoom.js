import mongoose from 'mongoose';

const hotelRoomSchema = new mongoose.Schema({
  businessUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BusinessUser',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  capacity: {
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
  amenities: {
    type: [String],
   },
  bedType: {
    type: String,
    enum: ['Single', 'Double', 'Queen', 'King', 'Twin']
  },
  roomSize: {
    type: Number,
    min: 0
  },
  viewType: {
    type: String,
    enum: ['City View', 'Ocean View', 'Garden View', 'Mountain View', 'No View']
  },
  images: [String],
  availability: {
    type: String,
    default: 'All year round'
  },
  specialFeatures: [String],
  policies: {
    smokingAllowed: {
      type: Boolean,
      default: false
    },
    petFriendly: {
      type: Boolean,
      default: false
    },
    checkInTime: String,
    checkOutTime: String
  },
  status: {
    type: String,
    enum: ['Available', 'Occupied', 'Under Maintenance'],
    default: 'Available'
  },
  discounts: [{
    type: {
      type: String,
      enum: ['Seasonal', 'Long Stay', 'Early Bird', 'Last Minute']
    },
    percentage: {
      type: Number,
      min: 0,
      max: 100
    },
    validFrom: Date,
    validTo: Date
  }]
}, {
  timestamps: true
});

const HotelRoom = mongoose.model('HotelRoom', hotelRoomSchema);

export default HotelRoom;

