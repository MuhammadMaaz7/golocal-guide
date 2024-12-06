import React from 'react';

const PackageCard = ({ title, description, price, availableDates, includedServices }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform transform hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
      <h3 className="text-xl font-semibold mb-2 text-blue-800">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex justify-between text-sm text-gray-600">
        <div>
          <strong>Price: </strong> ${price}
        </div>
        <div>
          <strong>Available: </strong>{' '}
          {availableDates.map((date, index) => (
            <span key={index} className="block">{new Date(date).toLocaleDateString()}</span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <strong>Included Services:</strong>
        <ul className="list-disc pl-5 mt-2">
          {includedServices.map((service, index) => (
            <li key={index} className="text-gray-600">{service}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PackageCard;
