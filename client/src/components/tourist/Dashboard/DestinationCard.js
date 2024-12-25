import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, DollarSign } from 'lucide-react';
import DestinationDetail from '../Discover/DestinationDetail';

export default function DestinationCard({ destination }) {
  const [showDetails, setShowDetails] = useState(false);

  if (!destination) {
    return null;
  }

  const { 
    id,
    name, 
    images, 
    location, 
    airline, 
    startDate, 
    startTime, 
    price 
  } = destination;

  const image = images && images.length > 0 ? destination.images[0]?.url : null;
  const airlineIcon = airline?.logo;

  // Format price
  const formattedPrice = price && typeof price === 'object' 
    ? `${price.currency} ${price.amount}`
    : price;

  return (
    <>
      <motion.div
        whileHover={{ y: -5, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
        transition={{ duration: 0.3 }}
        className="rounded-xl overflow-hidden shadow-md bg-white hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
      >
        <div className="relative">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-full h-48 sm:h-56 md:h-64 object-cover"
            />
          )}
          <div className="absolute top-0 right-0 m-2 bg-white p-1 rounded-full shadow">
            {airlineIcon && (
              <img src={airlineIcon} alt={`${airline.name} logo`} className="h-6 w-6 object-contain" />
            )}
          </div>
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2">
            <h3 className="font-bold text-lg sm:text-xl text-emerald-600 mb-1">{name}</h3>
            <div className="flex items-center text-emerald-600">
              <MapPin size={16} className="mr-1 flex-shrink-0" />
              <span className="text-sm truncate">
                {typeof location === 'object' 
                  ? `${location.address}, ${location.city}`
                  : location}
              </span>
            </div>
          </div>
          <div className="mt-auto">
            <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
              <div className="flex items-center">
                <Calendar size={14} className="mr-1" />
                <span>{startDate}</span>
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-1" />
                <span>{startTime}</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="font-bold text-emerald-600 flex items-center">
                <DollarSign size={16} className="mr-1" />
                <span>{formattedPrice}</span>
                <span className="text-sm font-normal text-gray-500 ml-1">
                  {price && price.per ? `/${price.per}` : '/Day'}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDetails(true)}
                className="px-3 py-1 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors duration-300"
              >
                View Details
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showDetails && (
          <DestinationDetail
            destination={destination}
            onClose={() => setShowDetails(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

