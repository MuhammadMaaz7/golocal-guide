import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import ExperienceCard from '../../components/guide/Experiences/ExperienceCard';
import AddExperienceForm from '../../components/guide/Experiences/AddExperienceForm';
import Sidebar from '../../components/guide/Sidebar';

const ExperiencesPage = () => {
  const [experiences, setExperiences] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Fetch experiences from backend
    Axios.get('/api/experiences')
      .then(response => setExperiences(response.data))
      .catch(error => console.error('Error fetching experiences:', error));
  }, []);

  const handleAddExperienceClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-gray-800">Guide Experiences</h1>
        <p className="mt-2 text-lg text-gray-600">Explore and share your learning experiences with others.</p>

        <button 
          onClick={handleAddExperienceClick} 
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          {showForm ? 'Cancel' : 'Add New Experience'}
        </button>

        {showForm && <AddExperienceForm setExperiences={setExperiences} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {experiences.length > 0 ? (
            experiences.map(experience => (
              <ExperienceCard key={experience._id} experience={experience} />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No experiences to display</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperiencesPage;
