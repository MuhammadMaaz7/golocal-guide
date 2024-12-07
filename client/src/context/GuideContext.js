import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

// Create the context
const GuideContext = createContext();

export const useGuide = () => useContext(GuideContext);

export const GuideProvider = ({ children }) => {
  const [guideData, setGuideData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assuming you have an endpoint like '/api/guide/profile'
    const fetchGuideData = async () => {
      try {
        console.log('Fetching guide data...');
        
        const response = await axios.get('http://localhost:5000/api/guide/profile');
        console.log('Fetched guide data:', response.data); // Log the data here
        
        // Check if the response data is valid and not empty
        if (response.data && response.data.name) {
          setGuideData(response.data); // Assuming response.data is an object
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
  }, []); // Empty dependency array to fetch data only on mount

  return (
    <GuideContext.Provider value={{ guideData, loading }}>
      {children}
    </GuideContext.Provider>
  );
};
