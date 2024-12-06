const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
  return jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

exports.signup = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = generateToken(user);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await user.comparePassword(req.body.password))) {
      return res.status(401).send({ error: 'Invalid login credentials' });
    }
    const token = generateToken(user);
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.googleSignIn = async (req, res) => {
  try {
    const { token, role, additionalInfo } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    
    let user = await User.findOne({ googleId: payload.sub });
    
    if (!user) {
      user = new User({
        googleId: payload.sub,
        email: payload.email,
        name: payload.name,
        role: role,
        profilePicture: payload.picture,
        ...additionalInfo
      });
      await user.save();
    }
    
    const jwtToken = generateToken(user);
    res.send({ user, token: jwtToken });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getProfile = async (req, res) => {
  res.send(req.user);
};

exports.updateProfile = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'phone', 'experience', 'languages', 'specialization', 'businessName', 'businessType', 'location'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach((update) => req.user[update] = req.body[update]);
    await req.user.save();
    res.send(req.user);
  } catch (error) {
    res.status(400).send(error);
  }
};

