import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Phone, Mail } from 'lucide-react';
import HotelDetailsPopup from './HotelDetailsPopup';

function HotelCard({ hotel }) {
  const [showDetailsPopup, setShowDetailsPopup] = useState(false);

  // Format the location string
  const locationString = hotel.location
    ? `${hotel.location.street || ''}, ${hotel.location.city || ''}, ${hotel.location.state || ''}`.trim().replace(/^,|,$/g, '')
    : 'Location not available';

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
      >
        <img
          src={hotel.media?.images[0] || '/placeholder-hotel.jpg'}
          alt={hotel.businessName}
          className="w-full h-48 object-cover"
        />

        <div className="p-4">
          <h3 className="font-semibold text-lg">{hotel.businessName}</h3>
          <p className="text-sm text-gray-600 mt-1">{hotel.description || 'No description available.'}</p>

          <div className="flex items-center gap-1 text-amber-400 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(hotel.ratings?.average || 0) ? 'fill-current' : 'fill-gray-200'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
            <MapPin className="w-4 h-4" />
            <span>{locationString}</span>
          </div>

          {hotel.amenities?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {hotel.amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                >
                  {amenity}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3">
            {hotel.contactInfo?.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{hotel.contactInfo.phone}</span>
              </div>
            )}
            {hotel.contactInfo?.email && (
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <Mail className="w-4 h-4" />
                <span>{hotel.contactInfo.email}</span>
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowDetailsPopup(true)}
            className="w-full mt-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            View Details
          </motion.button>
        </div>
      </motion.div>

      {/* Render popup outside the animated card */}
      {showDetailsPopup && (
        <HotelDetailsPopup
          hotel={hotel}
          onClose={() => setShowDetailsPopup(false)}
          onBookRoom={(room) => {
            console.log('Booking room:', room);
            setShowDetailsPopup(false);
          }}
        />
      )}
    </>
  );
}

export default HotelCard;
