const API_BASE_URL = 'http://localhost:5000/api';

export const myBookingsService = {
  // Helper function to get headers with auth token
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
  },

  // Fetch all table bookings for the logged-in user
  getTableBookings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/table-bookings/my-bookings`, {
        headers: myBookingsService.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Error fetching table bookings:', error);
      throw error;
    }
  },

  // Fetch all room bookings for the logged-in user
  getRoomBookings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/room-bookings/my-bookings`, {
        headers: myBookingsService.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching room bookings:', error);
      throw error;
    }
  },

  // Fetch all guide booking requests for the logged-in user
  getGuideRequests: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/guide-requests`, {
        headers: myBookingsService.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data.requests;
    } catch (error) {
      console.error('Error fetching guide requests:', error);
      throw error;
    }
  }
};