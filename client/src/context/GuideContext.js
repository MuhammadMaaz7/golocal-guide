import React, { createContext, useState, useContext } from 'react';

// Create Context
const GuideContext = createContext();

// Hook to Use Context
export const useGuide = () => useContext(GuideContext);

// GuideProvider Component
export const GuideProvider = ({ children }) => {
  // Initialize guideData with default values
  const [guideData, setGuideData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    guideType: 'Historical Guide',
    yearsOfExperience: 5,
    fee: 200,
    languages: ['English', 'French'],
    expertiseAreas: ['Museums', 'Castles'],
    profilePictureURL: 'https://via.placeholder.com/150',
    rating: 4.5,
    totalReviews: 120,
  });

  // Function to update guide data
  const updateGuideData = (updatedData) => {
    setGuideData((prev) => ({ ...prev, ...updatedData }));
  };

  return (
    <GuideContext.Provider value={{ guideData, updateGuideData }}>
      {children}
    </GuideContext.Provider>
  );
};
