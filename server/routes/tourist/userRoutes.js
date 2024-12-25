import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/tourist/User.js';
import auth from '../../middleware/auth.js';
import {updateProfile} from '../../controllers/tourist/userController.js'

const router = express.Router();


const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Google Sign In/Sign Up
router.post('/google-auth', async (req, res) => {
  try {
    const { email, name, googleId, photoURL } = req.body;
    
    let user = await User.findOne({ $or: [{ email }, { googleId }] });
    
    if (user) {
      // User exists, log them in
      const token = generateToken(user);
      res.status(200).json({ user, token, message: 'Successfully logged in with Google' });
    } else {
      // New user, send back info for frontend to complete registration
      res.status(202).json({ 
        message: 'Please complete your profile',
        partialUser: { email, name, googleId, photoURL }
      });
    }
  } catch (error) {
    console.error('Google auth error:', error);
    res.status(500).json({ message: 'Error during Google authentication', error: error.message });
  }
});


// Complete Google Sign Up
router.post('/complete-google-signup', async (req, res) => {
  try {
    const { email, name, googleId, photoURL, role, ...additionalInfo } = req.body;
    
    const user = new User({
      email,
      name,
      googleId,
      photoURL,
      role,
      ...additionalInfo,
      isProfileComplete: true
    });
    
    await user.save();
    
    const token = generateToken(user);
    res.status(201).json({ user, token, message: 'User created successfully' });
  } catch (error) {
    console.error('Complete Google signup error:', error);
    res.status(500).json({ message: 'Error completing Google signup', error: error.message });
  }
});

// Regular Sign Up
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name, role, ...additionalInfo } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }
    
    const user = new User({
      email,
      password,
      name,
      role,
      ...additionalInfo,
      isProfileComplete: Object.keys(additionalInfo).length > 0
    });
    
    await user.save();
    
    const token = generateToken(user);
    res.status(201).json({ user, token, message: 'User created successfully' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});


// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    const token = generateToken(user);
    res.status(200).json({ user, token, message: 'Logged in successfully' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// Check if user exists
router.post('/check-exists', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    res.status(200).json({ exists: !!user });
  } catch (error) {
    console.error('Error checking user existence:', error);
    res.status(500).json({ message: 'Error checking user existence', error: error.message });
  }
});

// Update user profile
router.put('/profile', auth, updateProfile);


export default router;