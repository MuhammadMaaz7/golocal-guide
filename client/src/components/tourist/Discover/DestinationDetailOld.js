import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Hotel, Users, Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DestinationDetail({ destination, onClose, onBookGuide, onBookHotel }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [guides, setGuides] = useState([]);
  const [loadingGuides, setLoadingGuides] = useState(false);

  useEffect(() => {
    if (destination?.guides?.length > 0) {
      fetchGuideData(destination.guides);
    }
  }, [destination]);

  const fetchGuideData = async (guideIds) => {
    setLoadingGuides(true);
    try {
      const guidePromises = guideIds.map(async (guideId) => {
        const response = await fetch(`http://localhost:5000/api/guides/${guideId}`);
        const text = await response.text(); // Get the raw response text
        console.log(`Response for guide ${guideId}:`, text); // Log the raw response
        if (!response.ok) throw new Error(`Failed to fetch guide ${guideId}: ${response.statusText}`);
        try {
          return JSON.parse(text); // Try to parse the response as JSON
        } catch (parseError) {
          console.error(`Error parsing JSON for guide ${guideId}:`, parseError);
          throw new Error(`Invalid JSON response for guide ${guideId}`);
        }
      });
      const guideData = await Promise.all(guidePromises);
      setGuides(guideData);
    } catch (error) {
      console.error('Error fetching guide data:', error);
    } finally {
      setLoadingGuides(false);
    }
  };

  if (!destination) return null;

  const images = destination.images || [];
  const imageCount = images.length;

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageCount);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + imageCount) % imageCount);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        <div className="relative h-64 md:h-96">
          <img
            src={images[currentImageIndex]?.url || '/placeholder.jpg'}
            alt={`${destination.name} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          {imageCount > 1 && (
            <>
              <button
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                disabled={currentImageIndex === 0}
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                disabled={currentImageIndex === imageCount - 1}
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {imageCount}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-24rem)]">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{destination.name}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{destination.location.address}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-semibold">{destination.rating.toFixed(1)}</span>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{destination.description}</p>

          {guides.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Available Guides
              </h3>
              {loadingGuides ? (
                <div className="flex justify-center p-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {guides.map((guide) => (
                    <div
                      key={guide._id}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:border-emerald-500 transition-colors"
                    >
                      <img
                        src={guide.profilePictureURL || '/placeholder-avatar.jpg'}
                        alt={`${guide.user.name}'s profile`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{guide.user.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{guide.guideType}</span>
                          <span>•</span>
                          <span>{guide.yearsOfExperience} years exp.</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="flex items-center text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span>{guide.rating.toFixed(1)}</span>
                          </div>
                          <span className="text-gray-600">({guide.totalReviews} reviews)</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {guide.languages.join(', ')}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="font-semibold text-emerald-600">${guide.fee}/day</div>
                        <button
                          onClick={() => onBookGuide(guide._id)}
                          className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                          Book Guide
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {destination.hotels && destination.hotels.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Hotel className="w-5 h-5" />
                Available Hotels
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.hotels.map((hotel) => (
                  <div
                    key={hotel._id}
                    className="flex items-center gap-4 p-4 rounded-lg border hover:border-emerald-500 transition-colors"
                  >
                    <img
                      src={hotel.image || '/placeholder-hotel.jpg'}
                      alt={hotel.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{hotel.name}</h4>
                      <div className="flex items-center gap-1 text-yellow-500 text-sm">
                        {Array.from({ length: Math.floor(hotel.rating) }).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">From ${hotel.pricePerNight}/night</p>
                    </div>
                    <button
                      onClick={() => onBookHotel(hotel._id)}
                      className="px-3 py-1 text-sm bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                      Book Hotel
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Close
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

