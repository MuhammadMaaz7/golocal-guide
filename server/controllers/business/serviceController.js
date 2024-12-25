import { BusinessUser, Hotel, Restaurant } from '../../models/business/BusinessUser.js';
import HotelRoom from '../../models/business/HotelRoom.js';
import MenuItem from '../../models/business/MenuItem.js';
import multer from 'multer';
import path from 'path';

export const getServices = async (req, res) => {
  try {
    const businessUser = await BusinessUser.findOne({ user: req.user._id });
    if (!businessUser) {
      return res.status(404).json({ message: 'Business user not found' });
    }

    let services;
    if (businessUser.businessType === 'hotel') {
      services = await HotelRoom.find({ businessUser: businessUser._id });
    } else if (businessUser.businessType === 'restaurant') {
      services = await MenuItem.find({ businessUser: businessUser._id });
    } else {
      return res.status(400).json({ message: 'Invalid business type' });
    }

    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export const addService = async (req, res) => {
  try {

    upload.array('images', 10)(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading files', error: err.message });
      }

    const businessUser = await BusinessUser.findOne({ user: req.user._id });
    if (!businessUser) {
      return res.status(404).json({ message: 'Business user not found' });
    }

    const imagePaths = req.files.map(file => file.path);

    let newService;
    if (businessUser.businessType === 'hotel') {
      newService = new HotelRoom({
        ...req.body,
        images: imagePaths,
        businessUser: businessUser._id
      });
    } else if (businessUser.businessType === 'restaurant') {
      newService = new MenuItem({
        ...req.body,
        images: imagePaths,
        businessUser: businessUser._id
      });
    } else {
      return res.status(400).json({ message: 'Invalid business type' });
    }

    await newService.save();
    
    // Update the BusinessUser's services array
    businessUser.services.push(newService._id);
    await businessUser.save();

    res.status(201).json(newService);
  });
  } catch (error) {
    res.status(500).json({ message: 'Error adding service', error: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const businessUser = await BusinessUser.findOne({ user: req.user._id });
    if (!businessUser) {
      return res.status(404).json({ message: 'Business user not found' });
    }

    let updatedService;
    if (businessUser.businessType === 'hotel') {
      updatedService = await HotelRoom.findOneAndUpdate(
        { _id: req.params.id, businessUser: businessUser._id },
        req.body,
        { new: true }
      );
    } else if (businessUser.businessType === 'restaurant') {
      updatedService = await MenuItem.findOneAndUpdate(
        { _id: req.params.id, businessUser: businessUser._id },
        req.body,
        { new: true }
      );
    } else {
      return res.status(400).json({ message: 'Invalid business type' });
    }

    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(updatedService);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const businessUser = await BusinessUser.findOne({ user: req.user._id });
    if (!businessUser) {
      return res.status(404).json({ message: 'Business user not found' });
    }

    let deletedService;
    if (businessUser.businessType === 'hotel') {
      deletedService = await HotelRoom.findOneAndDelete({
        _id: req.params.id,
        businessUser: businessUser._id
      });
    } else if (businessUser.businessType === 'restaurant') {
      deletedService = await MenuItem.findOneAndDelete({
        _id: req.params.id,
        businessUser: businessUser._id
      });
    } else {
      return res.status(400).json({ message: 'Invalid business type' });
    }

    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }

    // Remove the service from the BusinessUser's services array
    businessUser.services = businessUser.services.filter(
      serviceId => serviceId.toString() !== req.params.id
    );
    await businessUser.save();

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};

export const getBusinessType = async (req, res) => {
  try {
    const businessUser = await BusinessUser.findOne({ user: req.user._id });
    
    if (!businessUser) {
      return res.status(404).json({ message: 'Business user not found' });
    }

    res.json({ businessType: businessUser.businessType });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching business type', error: error.message });
  }
};

