import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

// Create the context
const GuideContext = createContext();

export const useGuide = () => useContext(GuideContext);

export const GuideProvider = ({ children }) => {
  const [guideData, setGuideData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuideData = async () => {
      try {
        console.log('Fetching guide data');
        
        // Get the token from localStorage (or wherever it is stored)
        const token = localStorage.getItem('token'); // Adjust key name as needed
        console.log(token);

        // If the token is not available, handle the case (e.g., redirect or set an error)
        if (!token) {
          console.error('No token found');
          setGuideData(null); // Or handle the error appropriately
          setLoading(false);
          return;
        }

        // Use axios to send the GET request with the Authorization header
        const response = await axios.get('http://localhost:5000/api/guide/profile', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Ensure this is the correct token format
          },
        });

        console.log('Fetched guide data:', response.data);
        if (response.data) {
          console.log('setting guide.data:');

          setGuideData(response.data); // Store the guide data
        } else {
          setGuideData(null); // Or some default empty state
        }
      } catch (error) {
        console.error('Error fetching guide data:', error);
        setGuideData(null); // Optionally set to null on error
      } finally {
        setLoading(false);
      }
    };

    fetchGuideData();
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <GuideContext.Provider value={{ guideData, loading }}>
      {children}
    </GuideContext.Provider>
  );
};
