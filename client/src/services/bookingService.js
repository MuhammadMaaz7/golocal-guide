const API_BASE_URL = 'http://localhost:5000/api';

export const bookingService = {
  // Destination related calls
  async getDestination(destinationId) {
    const response = await fetch(`${API_BASE_URL}/destinations/${destinationId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch destination ${destinationId}`);
    }
    return await response.json();
  },

  async searchDestinations(searchTerm) {
    const response = await fetch(`${API_BASE_URL}/destinations?search=${encodeURIComponent(searchTerm)}`);
    if (!response.ok) {
      throw new Error('Failed to search destinations');
    }
    return await response.json();
  },

  // Guide related calls
  async getGuides(guideIds) {
    const guidePromises = guideIds.map(async (guideId) => {
      try {
        const guideResponse = await fetch(`${API_BASE_URL}/guide/${guideId}`);
        if (!guideResponse.ok) {
          throw new Error(`Failed to fetch guide ${guideId}`);
        }
        const guideData = await guideResponse.json();

        if (!guideData.userID) {
          return { ...guideData, user: { name: 'Unknown Guide' } };
        }

        const userResponse = await fetch(`${API_BASE_URL}/users/${guideData.userID}`);
        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user for guide ${guideId}`);
        }
        const userData = await userResponse.json();

        return { ...guideData, user: userData };
      } catch (error) {
        console.error(`Error processing guide ${guideId}:`, error);
        return null;
      }
    });

    const guideData = await Promise.all(guidePromises);
    return guideData.filter(guide => guide !== null);
  },

  // Hotel related calls
  async getHotelsByCity(city) {
    const response = await fetch(`${API_BASE_URL}/hotels/${encodeURIComponent(city)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch hotels for city ${city}`);
    }
    return await response.json();
  },

  // New function to get hotel rooms by business user ID
  async getHotelRoomsByBusinessId(businessUserId) {
    const response = await fetch(`${API_BASE_URL}/hotel-rooms/business/${businessUserId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch hotel rooms for business user ${businessUserId}`);
    }
    return await response.json();
  },

  // Restaurant related calls
  async getRestaurantsByCity(city) {
    const response = await fetch(`${API_BASE_URL}/restaurants/${encodeURIComponent(city)}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch restaurants for city ${city}`);
    }
    return await response.json();
  },

  // Booking related calls
  async createRoomBooking(bookingData) {
    const response = await fetch(`${API_BASE_URL}/room-bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT in localStorage
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create room booking');
    }

    return await response.json();
  },

  // New function to create table booking
  async createTableBooking(bookingData) {
    const response = await fetch(`${API_BASE_URL}/table-bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT in localStorage
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create table booking');
    }

    return await response.json();
  },

  // Add this function to the bookingService object in bookingService.js
  async requestGuide(requestData) {
    const response = await fetch(`${API_BASE_URL}/guide-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you store the JWT in localStorage
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create guide request');
    }

    return await response.json();
  },
  
};

