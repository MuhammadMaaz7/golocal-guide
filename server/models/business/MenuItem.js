import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
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
  category: {
    type: String,
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'Side Dish'],
    required: true
  },
  cuisine: {
    type: String,
    required: true
  },
  ingredients: [String],
  allergens: [String],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbohydrates: Number,
    fat: Number
  },
  preparationTime: {
    type: Number,
    min: 0
  },
  spicyLevel: {
    type: Number,
    min: 0,
    max: 5
  },
  isVegetarian: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: false
  },
  isGlutenFree: {
    type: Boolean,
    default: false
  },
  image: String,
  availability: {
    type: String,
    enum: ['Always Available', 'Seasonal', 'Limited Time', 'Weekends Only'],
    default: 'Always Available'
  },
  portionSize: String,
  customizationOptions: [{
    name: String,
    price: Number
  }],
  pairingRecommendations: [String],
  status: {
    type: String,
    enum: ['Available', 'Out of Stock', 'Removed'],
    default: 'Available'
  },
  specialOffers: [{
    type: {
      type: String,
      enum: ['Discount', 'Bundle', 'Happy Hour']
    },
    description: String,
    validFrom: Date,
    validTo: Date
  }]
}, {
  timestamps: true
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

export default MenuItem;

