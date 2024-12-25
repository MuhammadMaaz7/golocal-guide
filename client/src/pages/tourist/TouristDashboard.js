import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../components/tourist/Dashboard/Sidebar';
import TopBar from '../../components/tourist/Dashboard/TopBar';
import SearchSection from '../../components/tourist/Dashboard/SearchSection';
import DestinationCard from '../../components/tourist/Dashboard/DestinationCard';
import Calendar from '../../components/tourist/Dashboard/Calendar';
import DoneTrips from '../../components/tourist/Dashboard/DoneTrips';
import UserProfile from '../../components/tourist/Dashboard/UserProfile';
import { useAuth } from '../../context/AuthContext';
import MyBookings from '../../components/tourist/Dashboard/MyBookings';
import { destinationService } from '../../services/destinationService';

const doneTrips = [
  {
    id: 1,
    name: 'Desert Uetune',
    date: '09 - 14 September 2022',
    image: '/images/abcd.jpg'
  },
  {
    id: 2,
    name: 'Mount Bromo',
    date: '14 - 18 June 2022',
    image: '/images/abcd.jpg'
  },
  {
    id: 3,
    name: 'Palm Madigascar',
    date: '11 - 15 December 2021',
    image: '/images/abcd.jpg'
  }
];

export default function TouristDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [destinations, setDestinations] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const [isMobile, setIsMobile] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    const fetchDestinations = async () => {
      try {
        const data = await destinationService.getRecommendedDestinations();
        console.log('Fetched destinations:', data);
        setDestinations(data.slice(0, 3)); // Limit to 3 destinations
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError('Failed to fetch destinations');
        setIsLoading(false);
      }
    };

    fetchDestinations();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSearch = (searchTerm, filters) => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (filters.destination) params.set('destination', filters.destination);
    if (filters.dates) params.set('dates', filters.dates);
    if (filters.guests > 1) params.set('guests', filters.guests.toString());
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.activities.length) params.set('activities', filters.activities.join(','));

    // Only navigate if we're on the dashboard page
    if (location.pathname === '/tourist-dashboard') {
      navigate(`/discover?${params.toString()}`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <div className="p-4 sm:p-6 lg:p-8">
          <TopBar 
            userName={user?.name || 'Jerrmy'} 
            onMenuClick={() => setShowRightSidebar(true)}
          />
          
          <div className="mt-6">
            <SearchSection onSearch={handleSearch} />
          </div>

          <div className="mt-8">
            <h2 className="text-xl text-gray-600 font-bold mb-6">Recommended Destinations</h2>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destinations.map(destination => (
                  <DestinationCard key={destination.id} destination={destination} />
                ))}
              </div>
            )}
          </div>
          <div className="mt-8">
            <MyBookings />
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <AnimatePresence>
        {(showRightSidebar || !isMobile) && (
          <motion.aside
            initial={isMobile ? { x: '100%' } : false}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className={`
              ${isMobile 
                ? 'fixed right-0 top-0 bottom-0 w-full sm:w-80 shadow-xl z-50' 
                : 'hidden lg:block w-80'
              }
              bg-white border-l overflow-y-auto
            `}
          >
            <div className="p-6">
              {isMobile && (
                <button
                  onClick={() => setShowRightSidebar(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRight />
                </button>
              )}
              <UserProfile user={user} />
              <div className="mt-6">
                <Calendar />
              </div>
              <div className="mt-6">
                <DoneTrips/>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

