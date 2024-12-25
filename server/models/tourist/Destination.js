import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    address: String,
    city: String
  },
  images: [{
    url: String,
    alt: String
  }],
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  price: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    },
    per: {
      type: String,
      default: 'Day'
    }
  },
  activities: [{
    type: String
  }],
  tags: [{
    type: String
  }],
  weather: {
    temperature: Number,
    condition: String,
    icon: String,
    lastUpdated: Date
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  guides: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guide' }], // Related Guides
  hotels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }], // Related Hotels
  restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }] // Related Restaurants
}, {
  timestamps: true
});

// Add text index for search functionality
destinationSchema.index({ 
  name: 'text', 
  description: 'text',
  'location.city': 'text'
});

export default mongoose.model('Destination', destinationSchema);
