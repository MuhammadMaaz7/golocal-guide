import { BusinessUser } from '../../models/business/BusinessUser.js';

const HotelsRestaurantsController = {
  async getHotelsByCity(req, res) {
    try {
      const { city } = req.params;
      const hotels = await BusinessUser.find({
        'location.city': city,
        businessType: 'hotel'
      }).populate('user', 'name email');

      res.json(hotels);
    } catch (error) {
      console.error('Error fetching hotels:', error);
      res.status(500).json({ message: 'Error fetching hotels', error: error.message });
    }
  },

  async getRestaurantsByCity(req, res) {
    try {
      const { city } = req.params;
      const restaurants = await BusinessUser.find({
        'location.city': city,
        businessType: 'restaurant'
      }).populate('user', 'name email');

      res.json(restaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      res.status(500).json({ message: 'Error fetching restaurants', error: error.message });
    }
  }
};

export default HotelsRestaurantsController;

