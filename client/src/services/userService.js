import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const userService = {
  updateProfile: async (userData) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      const { data } = await axios.put(
        `${API_URL}/users/profile`,
        userData,
        config
      );
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw new Error('Please login again to update your profile');
      }
      throw new Error(error.response?.data?.message || 'Failed to update profile');
    }
  }
};

