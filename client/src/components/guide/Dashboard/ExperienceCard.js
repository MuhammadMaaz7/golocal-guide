import React, { useState } from 'react';

const ExperienceCard = ({ experience }) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition" onClick={openModal}>
      {/* Display first video as boomerang */}
      <div className="relative">
        <video
          src={experience.videos[0]}
          className="w-full h-48 object-cover rounded-md"
          loop
          autoPlay
          muted
        ></video>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {experience.title}
        </div>
      </div>

      {/* Modal for detailed view */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6">
            <button
              className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-2"
              onClick={closeModal}
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">{experience.title}</h2>
            <p className="text-gray-700 mb-4">{experience.description}</p>
            <div className="flex space-x-4 overflow-x-scroll">
              {/* Display all images */}
              {experience.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Experience ${index}`}
                  className="w-32 h-32 object-cover rounded-md"
                />
              ))}
              {/* Display all videos */}
              {experience.videos.map((video, index) => (
                <video
                  key={index}
                  src={video}
                  className="w-32 h-32 object-cover rounded-md"
                  controls
                ></video>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExperienceCard;
