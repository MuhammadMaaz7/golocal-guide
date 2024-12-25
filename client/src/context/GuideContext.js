import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const GuideContext = createContext();

export const useGuide = () => useContext(GuideContext);

export const GuideProvider = ({ children }) => {
  const [guideData, setGuideData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Define error state

  useEffect(() => {
    const fetchGuideData = async () => {
      try {
        console.log('Fetching guide data');
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found');
          setError('No token found');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/guide/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Fetched guide data:', response.data);
        setGuideData(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching guide data:', error);
        setError('Error fetching guide data');
      } finally {
        setLoading(false);
      }
    };

    fetchGuideData();
  }, []);

  const updateGuideData = async (updatedData) => {
    try {
      console.log('Updating guide data Photo url:', updatedData);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await axios.post(
        'http://localhost:5000/api/guide/profile',
        updatedData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log('Updated guide data:', response.data);
      setGuideData(response.data.guide);
      setError(null); // Clear any previous errors
      return { success: true, message: 'Guide profile updated successfully' };
    } catch (error) {
      console.error('Error updating guide data:', error);
      setError('Error updating guide data');
      return {
        success: false,
        message: error.response?.data?.message || 'Error updating guide data',
      };
    }
  };
  
  return (
    <GuideContext.Provider value={{ guideData, loading, error, updateGuideData }}>
      {children}
    </GuideContext.Provider>
  );
};
