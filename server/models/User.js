const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId;
    },
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ['Tourist', 'Guide', 'Business Owner'],
    required: true,
  },
  // Fields for Guide
  experience: {
    type: Number,
    required: function() { return this.role === 'Guide'; },
  },
  languages: {
    type: [String],
    required: function() { return this.role === 'Guide'; },
  },
  specialization: {
    type: String,
    required: function() { return this.role === 'Guide'; },
  },
  // Fields for Business Owner
  businessName: {
    type: String,
    required: function() { return this.role === 'Business Owner'; },
  },
  businessType: {
    type: String,
    required: function() { return this.role === 'Business Owner'; },
  },
  location: {
    type: String,
    required: function() { return this.role === 'Business Owner'; },
  },
  // Common fields
  phone: {
    type: String,
    required: function() { return this.role === 'Guide' || this.role === 'Business Owner'; },
  },
  photoURL: {
    type: String,
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password') && this.password) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
