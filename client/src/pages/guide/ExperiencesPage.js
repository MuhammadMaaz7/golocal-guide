import React, { useState, useEffect } from 'react';
import { useExperience } from '../../context/ExperienceContext'; // adjust the import as necessary
import AddExperienceForm from '../../components/guide/Experiences/AddExperienceForm';
import ExperienceCard from '../../components/guide/Experiences/ExperienceCard';
import Sidebar from '../../components/guide/Sidebar'; // Assuming you have a Sidebar component
import { useAuth } from '../../context/AuthContext';

const ExperiencePage = () => {
  const { experiences, loading, error, fetchExperiences, addExperience } = useExperience();
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const { user } = useAuth(); // Get current user


  // Fetch experiences when component mounts
  useEffect(() => {
    //fetchExperiences(); // Ensure you call this function to fetch experiences
  }, [fetchExperiences]);

  const handleAddExperienceClick = () => {
    setShowAddForm(true);
  };

  const handleExperienceClick = (experience) => {
    setSelectedExperience(experience);
  };

  const handleAddExperience = (newExperience) => {
    console.log("Add experience");
    newExperience.guideID=user._id;
    addExperience(newExperience);
    setShowAddForm(false);  // Close the form after adding the experience
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      <div className="ml-64 w-full p-8">
        <h1 className="text-center text-3xl font-semibold text-blue-800">Experience Management</h1>
        
        {/* Show the list of experiences */}
        {!showAddForm && (
          <>
            <div className="mt-8 flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-blue-700">My Experiences</h2>
              <button
                onClick={handleAddExperienceClick}
                className="bg-blue-500 text-white py-2 px-4 rounded"
              >
                Add Experience
              </button>
            </div>

            {experiences.length === 0 ? (
              <p>No experiences found. Add some!</p>
            ) : (
              <ul className="mt-4">
                {experiences.map((experience) => (
                  <ExperienceCard
                    key={experience._id}
                    experience={experience}
                    onClick={() => handleExperienceClick(experience)}
                  />
                ))}
              </ul>
            )}
          </>
        )}

        {/* Show the Add Experience Form */}
        {showAddForm && (
          <AddExperienceForm 
            addExperience={handleAddExperience} 
            onCancel={() => setShowAddForm(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default ExperiencePage;
