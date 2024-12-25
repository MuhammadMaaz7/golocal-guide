import mongoose from 'mongoose';

const businessUserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  businessName: {
    type: String,
    trim: true
  },
  description: {
    type: String
  },
  businessType: {
    type: String,
    enum: ['hotel', 'restaurant']
  },
  contactInfo: {
    phone: {
      type: String
    },
    email: {
      type: String,
      lowercase: true,
      trim: true
    },
    website: String,
    businessHours: String
  },
  location: {
    street: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zip: {
      type: String
    },
    country: {
      type: String
    },
    additionalInfo: String
  },
  media: {
    images: [String],
    videos: [String]
  },
  paymentMethods: {
    creditCard: Boolean,
    digitalWallet: Boolean,
    bankTransfer: Boolean,
    additionalInfo: String
  },
  policies: {
    cancellation: {
      type: String
    },
    refund: {
      type: String
    },
    pets: Boolean,
    smoking: Boolean
  },
  socialMedia: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'businessType'
  }],
  ratings: {
    average: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  features: [String],
  certifications: [String],
  tags: [String]
}, {
  timestamps: true,
  discriminatorKey: 'businessType'
});

const BusinessUser = mongoose.model('BusinessUser', businessUserSchema);
// Hotel-specific schema
const hotelSchema = new mongoose.Schema({
  starRating: {
    type: Number,
    min: 1,
    max: 5
  },
  amenities: [String],
  roomTypes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HotelRoom'
  }],
  checkInTime: String,
  checkOutTime: String
});

// Restaurant-specific schema
const restaurantSchema = new mongoose.Schema({
  cuisine: [String],
  menuItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem'
  }],
  seatingCapacity: Number,
  reservationPolicy: String,
  averageCost: Number
});

const Hotel = BusinessUser.discriminator('hotel', hotelSchema);
const Restaurant = BusinessUser.discriminator('restaurant', restaurantSchema);


export { BusinessUser, Hotel, Restaurant };

