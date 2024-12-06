import React from 'react';

const GuideInfoCard = ({ title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
      <h3 className="text-xl font-semibold text-blue-800">{title}</h3>
      <p className="text-lg text-blue-600">{value}</p>
    </div>
  );
};

export default GuideInfoCard;
