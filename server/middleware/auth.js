import jwt from 'jsonwebtoken';
import User from '../models/tourist/User.js';  // Use .js for ES Modules

// Authentication middleware to check if the user is authenticated
const auth = async (req, res, next) => {
  try {
    // Extract token from the Authorization header
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log("Received Token:", token); // Log the token to debug
    console.log("JWT Secret:", process.env.JWT_SECRET); // Debuggin
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const user = await User.findOne({ _id: decoded.id });
    console.log("User:", user);  // Check if the user exists in the DB

    // If the user is not found, throw an error
    if (!user) {
      throw new Error();
    }

    // Attach the token and user to the request object
    req.token = token;
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    // If an error occurs (e.g., invalid token, user not found), return a 401 status
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

export default auth;  // Use export default
