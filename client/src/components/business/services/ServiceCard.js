import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, DollarSign } from 'lucide-react';

const ServiceCard = ({ service, onEdit, onDelete, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer"
      onClick={() => onClick(service)}
    >
      <div className="relative group">
        
        <img
         src={
          service.images && service.images.length > 0
          ? `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/${service.images[0].replace(/\\/g, '/')}` 
          : 'fallback-image.jpg'
         }
          alt={service.name || 'Default Name'}
          className="w-full h-32 xs:h-36 sm:h-40 lg:h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full shadow-sm">
        <span className="text-emerald-600 font-semibold text-sm flex items-center">
            <DollarSign className="w-4 h-4 mr-1" />
            {service.price}
          </span>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2 text-gray-800 line-clamp-1">
          {service.name}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 line-clamp-2">
          {service.description}
        </p>
        <div className="flex justify-end items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onEdit(service);
            }}
            className="p-1.5 sm:p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
            aria-label={`Edit ${service.name}`}
          >
            <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onDelete(service._id);
            }}
            className="p-1.5 sm:p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
            aria-label={`Delete ${service.name}`}
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;

