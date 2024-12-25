import React, { createContext, useState, useContext, useEffect } from 'react';
import Axios from 'axios';

// Create a Context for Experiences
const ExperienceContext = createContext();

// Custom hook to access the ExperienceContext
export const useExperience = () => useContext(ExperienceContext);

export const ExperienceProvider = ({ children }) => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch experiences from the backend
  const fetchExperiences = async () => {
    console.log("Fetching experiences...");
    setLoading(true);
    try {
      const response = await Axios.get('http://localhost:5000/api/experiences');
      console.log("Fetched experiences:", response.data);
      setExperiences(response.data);
    } catch (err) {
      setError('Error fetching experiences');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  

  // Add a new experience
  const addExperience = async (newExperience) => {
    console.log("Add experience in context");

    try {
      const response = await Axios.post('http://localhost:5000/api/experiences', newExperience);
      console.log("Added experience now in contect hehe");

      setExperiences((prevExperiences) => [...prevExperiences, response.data]);
    } catch (err) {
      setError('Error adding experience');
    }
  };

  // Delete an experience
  const deleteExperience = async (id) => {
    try {
      await Axios.delete(`/api/experiences/${id}`);
      setExperiences((prevExperiences) => prevExperiences.filter(exp => exp._id !== id));
    } catch (err) {
      setError('Error deleting experience');
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  return (
    <ExperienceContext.Provider
      value={{
        experiences,
        loading,
        error,
        fetchExperiences,
        addExperience,
        deleteExperience,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};
