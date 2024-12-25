import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Star } from 'lucide-react';

const ExperienceCard = ({ experience }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'upcoming':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {experience.images && experience.images.length > 0 && (
        <img
          src={experience.images[0]}
          alt={experience.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{experience.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{experience.description}</p>
        <div className="flex items-center mb-2">
          <Calendar size={16} className="text-gray-500 mr-2" />
          <span className="text-sm text-gray-500">
            {new Date(experience.startDate).toLocaleDateString()} - 
            {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Ongoing'}
          </span>
        </div>
        {experience.location && (
          <div className="flex items-center mb-2">
            <MapPin size={16} className="text-gray-500 mr-2" />
            <span className="text-sm text-gray-500">{experience.location}</span>
          </div>
        )}
        {experience.rating > 0 && (
          <div className="flex items-center mb-4">
            <Star size={16} className="text-yellow-500 mr-2" />
            <span className="text-sm text-gray-500">{experience.rating} / 5</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(experience.status)}`}>
            {experience.status}
          </div>
          <button className="text-blue-500 hover:text-blue-600 transition duration-300">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;