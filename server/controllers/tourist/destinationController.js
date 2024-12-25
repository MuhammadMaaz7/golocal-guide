import Destination from '../../models/tourist/Destination.js';  // Make sure the path and extension are correct
import axios from 'axios';

const WEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

const destinationController = {
  // Get all destinations with filters
  async getDestinations(req, res) {
    try {
      const { 
        search, 
        minPrice, 
        maxPrice, 
        activities, 
        tags,
        page = 1,
        limit = 10
      } = req.query;
  
      let query = {};
  
      // Text search
      if (search) {
        query.$text = { $search: search };
      }
  
      // Price filter
      if (minPrice || maxPrice) {
        query.price = query.price || {};
        if (minPrice) query.price.$gte = Number(minPrice);
        if (maxPrice) query.price.$lte = Number(maxPrice);
      }
  
      // Activities filter
      if (activities) {
        const activitiesArray = activities.split(',').map(activity => activity.trim());
        query.activities = { $in: activitiesArray };
      }
  
      // Tags filter
      if (tags) {
        const tagsArray = tags.split(',').map(tag => tag.trim());
        query.tags = { $in: tagsArray };
      }
  
      const skip = (parseInt(page) - 1) * parseInt(limit);
  
      // Fetch destinations
      const destinations = await Destination.find(query)
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 });
  
      // Update weather for each destination
      const weatherUpdatePromises = destinations.map(async (destination) => {
        if (destination.location && destination.location.city) {
          try {
            await destinationController.updateWeather(destination);
          } catch (error) {
            console.error(`Error updating weather for destination ${destination._id}:`, error);
          }
        } else {
          console.log('Missing city for destination:', destination._id);
        }
      });
  
      await Promise.all(weatherUpdatePromises);
  
      const total = await Destination.countDocuments(query);
  
      res.json({
        destinations,
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        total
      });
    } catch (error) {
      console.error('Error in getDestinations:', error);
      res.status(500).json({ message: 'An error occurred while fetching destinations', error: error.message });
    }
  },
  

  // Get single destination
  async getDestination(req, res) {
    try {
      const destination = await Destination.findById(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }
  
      // Always update the weather
      await destinationController.updateWeather(destination);
  
      res.json(destination);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },  

  // Update weather data
  async updateWeather(destination) {
    try {
      const city = destination.location && destination.location.city;
      
      // Fetch weather data from OpenWeather API
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
      );
    
      destination.weather = {
        temperature: response.data.main.temp,
        condition: response.data.weather[0].main,
        icon: response.data.weather[0].icon,
        lastUpdated: new Date()
      };
    
      await destination.save();
    } catch (error) {
      console.error('Error updating weather:', error.message);
    }
  },  

  // Toggle favorite
  async toggleFavorite(req, res) {
    try {
      console.log('Toggling favorite for destination:', req.params.id);
      console.log('User ID:', req.user.id);
  
      const destination = await Destination.findById(req.params.id);
      if (!destination) {
        return res.status(404).json({ message: 'Destination not found' });
      }
  
      const userId = req.user.id;
      const favoriteIndex = destination.favorites.indexOf(userId);
  
      if (favoriteIndex === -1) {
        destination.favorites.push(userId);
        console.log('Added user to favorites');
      } else {
        destination.favorites.splice(favoriteIndex, 1);
        console.log('Removed user from favorites');
      }
  
      await destination.save();
      console.log('Updated destination:', destination);
  
      res.json(destination);
    } catch (error) {
      console.error('Error in toggleFavorite:', error);
      res.status(500).json({ message: error.message });
    }
  }
};

export default destinationController;