import React from 'react';

const ExperienceCard = ({ experience }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300 ease-in-out">
      <h3 className="text-xl font-semibold text-gray-800">{experience.title}</h3>
      <p className="mt-2 text-gray-600">{experience.description}</p>
      <div className="mt-4 text-right">
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ExperienceCard;
