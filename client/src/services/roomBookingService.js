const API_BASE_URL = 'http://localhost:5000/api';

export const roomBookingService = {
  // Helper function to get headers with auth token
  getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
  },

  // Fetch completed bookings for the logged-in user
  getCompletedBookings: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/room-bookings/completed`, {
        headers: roomBookingService.getHeaders()
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching completed bookings:', error);
      throw error;
    }
  }
};

