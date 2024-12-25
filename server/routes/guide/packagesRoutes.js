import express from 'express';
import { 
  getAllPackages, 
  getPackageById, 
  addPackage, 
  updatePackage, 
  deletePackage 
} from '../../controllers/guide/packagesController.js';  // Ensure .js extension
import authMiddleware from '../../middleware/auth.js'; // Ensure this middleware checks authentication

const router = express.Router();

// Routes for package management
router.get('/packages',getAllPackages);  // Get all packages
router.get('/packages/:id',authMiddleware, getPackageById);  // Get a specific package by ID
router.post('/packages', addPackage);  // Handles POST requests to /api/packages
router.put('/packages/:id',authMiddleware, updatePackage);  // Update an existing package
router.delete('/packages/:id',authMiddleware, deletePackage);  // Delete a package

export default router;  // Export the router
