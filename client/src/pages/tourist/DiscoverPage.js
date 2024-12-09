import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import Sidebar from '../../components/tourist/Dashboard/Sidebar';
import SearchSection from '../../components/tourist/Dashboard/SearchSection';
import DestinationDetail from '../../components/tourist/Discover/DestinationDetail';
import { destinationService } from '../../services/destinationService';
import { MapPin, ArrowRight, Heart, CloudSun, Hotel, Users } from 'lucide-react';

export default function DiscoverPage() {
  const [searchParams] = useSearchParams();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);

  useEffect(() => {
    fetchDestinations();
  }, [searchParams]);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const params = Object.fromEntries(searchParams.entries());
      const response = await destinationService.getDestinations(params);
      setDestinations(response.destinations.map(dest => ({
        ...dest,
        isFavorite: dest.favorites.includes(localStorage.getItem('userId'))
      })));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (id) => {
    try {
      await destinationService.toggleFavorite(id);
      setDestinations(prev =>
        prev.map(dest =>
          dest._id === id
            ? { ...dest, isFavorite: !dest.isFavorite }
            : dest
        )
      );
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const handleBookGuide = async (guideId) => {
    try {
      // Implement guide booking logic
      console.log('Booking guide:', guideId);
    } catch (err) {
      console.error('Error booking guide:', err);
    }
  };

  const handleBookHotel = async (hotelId) => {
    try {
      // Implement hotel booking logic
      console.log('Booking hotel:', hotelId);
    } catch (err) {
      console.error('Error booking hotel:', err);
    }
  };

  const renderDestinationCard = (destination) => (
    <motion.div
      key={destination._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
    >
      <div className="relative h-48">
        <img
          src={destination.images[0]?.url || '/placeholder.jpg'}
          alt={destination.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(destination._id);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              destination.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
            }`}
          />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex justify-between text-white">
            {/* <div className="flex items-center gap-2"> */}
              {/* <Hotel className="w-4 h-4" /> */}
              {/* <span className="text-sm">{destination.hotels?.length || 0}</span> */}
            {/* </div> */}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">{destination.guides?.length || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{destination.name}</h3>
          <div className="flex items-center gap-1 text-sm text-yellow-500">
            ★ {destination.rating.toFixed(1)}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span>{destination.location.address}</span>
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {destination.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {destination.activities.slice(0, 3).map((activity) => (
            <span
              key={activity}
              className="px-2 py-1 text-xs rounded-full bg-emerald-50 text-emerald-600"
            >
              {activity}
            </span>
          ))}
          {destination.activities.length > 3 && (
            <span className="px-2 py-1 text-xs rounded-full bg-gray-50 text-gray-600">
              +{destination.activities.length - 3}
            </span>
          )}
        </div>

        {destination.weather && (
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
            <CloudSun className="w-4 h-4" />
            <span>{destination.weather.temperature}°C</span>
            <span>{destination.weather.condition}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-gray-900">
            <span className="text-lg font-bold">${destination.price.amount}</span>
            <span className="text-sm text-gray-600">/{destination.price.per}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedDestination(destination)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            View Details
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg mb-8" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="bg-white rounded-xl shadow-sm p-4">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4" />
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Error</h2>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <SearchSection onSearch={fetchDestinations} />
          
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Discover Amazing Destinations
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destinations.map(renderDestinationCard)}
            </div>
          </div>

          {selectedDestination && (
            <DestinationDetail
              destination={selectedDestination}
              onClose={() => setSelectedDestination(null)}
              onBookGuide={handleBookGuide}
              onBookHotel={handleBookHotel}
            />
          )}
        </div>
      </main>
    </div>
  );
}

