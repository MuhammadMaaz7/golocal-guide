import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, X, MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SearchSection({ onSearch }) {
  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    destination: '',
    dates: '',
    guests: 1,
    minPrice: '',
    maxPrice: '',
    activities: []
  });

  const activities = [
    'Hiking', 'Beach', 'City Tours', 'Cultural', 'Adventure', 'Food & Dining'
  ];

  useEffect(() => {
    // Load filters from URL params on component mount
    const params = new URLSearchParams(location.search);
    setSearchTerm(params.get('search') || '');
    setFilters({
      destination: params.get('destination') || '',
      dates: params.get('dates') || '',
      guests: parseInt(params.get('guests') || '1'),
      minPrice: params.get('minPrice') || '',
      maxPrice: params.get('maxPrice') || '',
      activities: params.get('activities') ? params.get('activities').split(',') : []
    });
  }, [location.search]);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleActivityToggle = (activity) => {
    setFilters(prev => ({
      ...prev,
      activities: prev.activities.includes(activity)
        ? prev.activities.filter(a => a !== activity)
        : [...prev.activities, activity]
    }));
  };

  const handleSearch = () => {
    onSearch(searchTerm, filters);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search for your favorite destination"
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-600" 
            size={20} 
          />
        </div>
        <div className="flex gap-2 sm:gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleFilter}
            className={`p-3 border-2 rounded-lg transition-colors ${
              isFilterOpen 
                ? 'bg-emerald-600 text-white border-emerald-600' 
                : 'border-gray-200 hover:border-emerald-600 text-emerald-600'
            }`}
          >
            <Filter size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex-shrink-0"
          >
            Search
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute left-0 right-0 mt-2 p-6 bg-white rounded-lg shadow-xl border border-gray-100 z-50"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button 
                onClick={toggleFilter}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <MapPin size={16} className="inline mr-2 text-emerald-600" />
                  Destination
                </label>
                <input
                  type="text"
                  placeholder="Where to?"
                  className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-emerald-600"
                  value={filters.destination}
                  onChange={e => setFilters({...filters, destination: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <Calendar size={16} className="inline mr-2 text-emerald-600" />
                  Dates
                </label>
                <input
                  type="date"
                  className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-emerald-600"
                  value={filters.dates}
                  onChange={e => setFilters({...filters, dates: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <Users size={16} className="inline mr-2 text-emerald-600" />
                  Guests
                </label>
                <input
                  type="number"
                  min="1"
                  className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:border-emerald-600"
                  value={filters.guests}
                  onChange={e => setFilters({...filters, guests: parseInt(e.target.value) || 1})}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <DollarSign size={16} className="inline mr-2 text-emerald-600" />
                  Price Range
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-1/2 p-2 border border-gray-200 rounded-md focus:outline-none focus:border-emerald-600"
                    value={filters.minPrice}
                    onChange={e => setFilters({...filters, minPrice: e.target.value})}
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-1/2 p-2 border border-gray-200 rounded-md focus:outline-none focus:border-emerald-600"
                    value={filters.maxPrice}
                    onChange={e => setFilters({...filters, maxPrice: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Activities
              </label>
              <div className="flex flex-wrap gap-2">
                {activities.map((activity) => (
                  <motion.button
                    key={activity}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleActivityToggle(activity)}
                    className={`px-4 py-2 rounded-full text-sm transition-colors ${
                      filters.activities.includes(activity)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {activity}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setFilters({
                  destination: '',
                  dates: '',
                  guests: 1,
                  minPrice: '',
                  maxPrice: '',
                  activities: []
                })}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Clear All
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleFilter}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

