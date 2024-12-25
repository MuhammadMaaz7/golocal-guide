import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const destinationService = {
  async getDestinations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${API_URL}/destinations?${queryString}`);
    return response.data;
  },

  async getRecommendedDestinations(params = {}) {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
  
      const queryString = new URLSearchParams(params).toString();
      const response = await axios.get(`${API_URL}/destinations?${queryString}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      return response.data.destinations || [];
    } catch (error) {
      console.error('Error fetching destinations:', error);
      throw error;
    }
  },  

  async getDestination(id) {
    const response = await axios.get(`${API_URL}/destinations/${id}`);
    return response.data;
  },

  async toggleFavorite(id) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    try {
      console.log('Sending favorite toggle request for destination:', id);
      const response = await axios.post(
        `${API_URL}/destinations/${id}/favorite`,
        {},
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('Server response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error in toggleFavorite:', error.response || error);
      throw error;
    }
  },

  async getFavorites() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }
    const response = await axios.get(`${API_URL}/destinations/favorites`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

