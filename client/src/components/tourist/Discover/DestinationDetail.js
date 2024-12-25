import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronLeft, ChevronRight, ArrowRight, DollarSign, Wind } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

export default function DestinationDetail({ destination, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!destination) return null;

  const images = destination.images || [];
  const imageCount = images.length;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageCount) % imageCount);
  };

  const handleBookNow = () => {
    setIsLoading(true);
    
    if (!user) {
      // If user is not logged in, redirect to login
      navigate('/login', { state: { from: `/booking?destination=${destination._id}` } });
      return;
    }

    // If user is logged in, navigate to booking page
    navigate(`/booking?destination=${destination._id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="relative h-48 sm:h-64 md:h-[400px]">
          <img
            src={images[currentImageIndex]?.url || '/placeholder.jpg'}
            alt={images[currentImageIndex]?.alt || `${destination.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {imageCount > 1 && (
            <>
              <button
                className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors p-1.5 sm:p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                disabled={currentImageIndex === 0}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
              <button
                className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors p-1.5 sm:p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                disabled={currentImageIndex === imageCount - 1}
                aria-label="Next image"
              >
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
              </button>
            </>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-xs sm:text-sm">
            {currentImageIndex + 1} / {imageCount}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{destination.name}</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="line-clamp-1">{destination.location.address}, {destination.location.city}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className={`w-4 h-4 sm:w-5 sm:h-5 ${i < Math.floor(destination.rating) ? 'fill-current' : 'fill-gray-200'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-xs sm:text-sm text-gray-600">({destination.rating.toFixed(1)})</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6 text-sm sm:text-base">{destination.description}</p>

            <div className="flex items-center gap-4 mb-6 bg-blue-50 p-3 rounded-lg">
              <Wind className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 shrink-0" />
              <div>
                <span className="text-lg sm:text-xl font-semibold text-gray-900">{destination.weather.temperature}°C</span>
                <span className="ml-2 text-sm sm:text-base text-gray-600">{destination.weather.condition}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3">Activities</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {destination.activities.map((activity, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm sm:text-base font-medium"
                  >
                    {activity}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                {destination.tags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-100 text-gray-600 rounded-full text-xs sm:text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t">
              <div className="text-xl sm:text-2xl font-bold text-emerald-600">
                <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 inline-block" />
                {destination.price.amount} {destination.price.currency}
                <span className="text-xs sm:text-sm text-gray-600 ml-1">per {destination.price.per.toLowerCase()}</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
                onClick={handleBookNow}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-base sm:text-lg font-semibold disabled:opacity-70"
              >
                {isLoading ? 'Loading...' : 'Book Now'}
                {!isLoading && <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
