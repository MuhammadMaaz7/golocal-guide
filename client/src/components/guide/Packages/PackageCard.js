import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, DollarSign, PackageIcon, Edit, Trash } from 'lucide-react';



const PackageCard = ({ 
  title, 
  city, 
  price, 
  availableDates, 
  includedServices,
  imageUrl,
  onEdit,
  onDelete 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 text-emerald-700 px-2 py-1 rounded-full text-sm font-semibold">
          ${price}
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
        <div className="flex items-center text-sm text-gray-600 mb-4">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="line-clamp-1">{city}</span>
        </div>

        <div className="space-y-4 mb-4">
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 mt-1 text-emerald-600" />
            <div className="text-sm">
              <p className="font-medium mb-1">Available Dates</p>
              <div className="flex flex-wrap gap-1">
                {availableDates.slice(0, 3).map((date, index) => (
                  <span key={index} className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                    {new Date(date).toLocaleDateString()}
                  </span>
                ))}
                {availableDates.length > 3 && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-full">
                    +{availableDates.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2">
            <PackageIcon className="w-4 h-4 mt-1 text-emerald-600" />
            <div className="text-sm">
              <p className="font-medium mb-1">Included Services</p>
              <div className="flex flex-wrap gap-1">
                {includedServices.slice(0, 3).map((service, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    {service}
                  </span>
                ))}
                {includedServices.length > 3 && (
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    +{includedServices.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t bg-gray-50 p-4 flex justify-between">
        <button 
          onClick={onEdit}
          className="flex items-center justify-center px-4 py-2 border border-emerald-600 text-emerald-600 rounded-md hover:bg-emerald-600 hover:text-white transition-colors duration-300"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </button>
        <button 
          onClick={onDelete}
          className="flex items-center justify-center px-4 py-2 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors duration-300"
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default PackageCard;
