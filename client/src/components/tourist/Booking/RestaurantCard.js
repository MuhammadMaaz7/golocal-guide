import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Clock, Utensils, Phone, Globe, DollarSign } from 'lucide-react';

function RestaurantCard({ restaurant, onBook }) {
  // Format the location string
  const locationString = restaurant.location ? 
    `${restaurant.location.street}, ${restaurant.location.city}, ${restaurant.location.state}, ${restaurant.location.country}` :
    'Location not available';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
    >
      <img
        src={restaurant.media?.images[0] || '/placeholder-restaurant.jpg'}
        alt={restaurant.businessName}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg">{restaurant.businessName}</h3>
            <div className="flex items-center gap-1 text-amber-400 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(restaurant.ratings?.average || 0)
                      ? 'fill-current'
                      : 'fill-gray-200'
                  }`}
                />
              ))}
              <span className="text-xs text-gray-600 ml-1">({restaurant.ratings?.count || 0} reviews)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <MapPin className="w-4 h-4" />
              <span>{locationString}</span>
            </div>
          </div>
          {/* <span className="font-semibold text-emerald-600">
            <DollarSign className="w-4 h-4 inline-block" />
            {restaurant.averageCost ? `${restaurant.averageCost} avg` : 'N/A'}
          </span> */}
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {restaurant.cuisine && restaurant.cuisine.length > 0 && (
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              <Utensils className="w-3 h-3 inline-block mr-1" />
              {restaurant.cuisine.join(', ')}
            </span>
          )}
          {restaurant.contactInfo?.businessHours && (
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              <Clock className="w-3 h-3 inline-block mr-1" />
              {restaurant.contactInfo.businessHours}
            </span>
          )}
          {restaurant.contactInfo?.phone && (
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              <Phone className="w-3 h-3 inline-block mr-1" />
              {restaurant.contactInfo.phone}
            </span>
          )}
          {restaurant.contactInfo?.website && (
            <span className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
              <Globe className="w-3 h-3 inline-block mr-1" />
              {restaurant.contactInfo.website}
            </span>
          )}
        </div>

        {restaurant.description && (
          <p className="text-sm text-gray-600 mt-3 line-clamp-2">{restaurant.description}</p>
        )}

        {restaurant.features && restaurant.features.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-semibold text-gray-700">Features:</h4>
            <div className="flex flex-wrap gap-1 mt-1">
              {restaurant.features.map((feature, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}

        {restaurant.seatingCapacity && (
          <div className="text-sm text-gray-600 mt-3">
            Seating Capacity: {restaurant.seatingCapacity}
          </div>
        )}

        {restaurant.reservationPolicy && (
          <div className="text-sm text-gray-600 mt-1">
            Reservation Policy: {restaurant.reservationPolicy}
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onBook(restaurant)}
          className="w-full mt-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Book Table
        </motion.button>
      </div>
    </motion.div>
  );
}

export default RestaurantCard;

