import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const destinationService = {
  async getDestinations(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await axios.get(`${API_URL}/destinations?${queryString}`);
    return response.data;
  },

  async getDestination(id) {
    const response = await axios.get(`${API_URL}/destinations/${id}`);
    return response.data;
  },

  async toggleFavorite(id) {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${API_URL}/destinations/${id}/favorite`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    return response.data;
  }
};

