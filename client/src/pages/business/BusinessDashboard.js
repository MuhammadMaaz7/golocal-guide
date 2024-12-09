import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DashboardLayout from '../../components/business/dashboard/DashboardLayout';
import MetricsCards from '../../components/business/dashboard/MetricsCards';
import BookingsTable from '../../components/business/dashboard/BookingsTable';
import UserInfoCard from '../../components/business/dashboard/UserInfoCard';
import { motion } from 'framer-motion';
import { Plus, Calendar, MapPin, Users, Clock, Star, Phone, Globe, Facebook, Instagram, Twitter } from 'lucide-react';

const BusinessDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [businessData, setBusinessData] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('today');


  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      console.log(user);
      fetchBusinessData();
    }
  }, [user, navigate]);

  const fetchBusinessData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:5000/api/business-dashboard/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBusinessData(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching business data:', err);
      setError('Failed to load business data. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-emerald-50">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-emerald-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-emerald-50">
        <div className="text-red-600 font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-2"
      >
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Welcome back, {user.name || 'Business Owner'}!
            </h2>
            <p className="text-emerald-600 font-medium">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </motion.div>
        </div>
        
        {/* Business Info Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{businessData.businessName}</h1>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  {businessData.businessType}
                </span>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="ml-1 font-semibold">{businessData.ratings.average.toFixed(1)}</span>
                </div>
                <span className="text-gray-500">({businessData.ratings.count} reviews)</span>
              </div>
              <p className="text-gray-600 mb-4">{businessData.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{`${businessData.location.street}, ${businessData.location.city}, ${businessData.location.state} ${businessData.location.zip}`}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">{businessData.contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <a href={`https://${businessData.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                    {businessData.contactInfo.website}
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                {businessData.socialMedia.facebook && (
                  <a href={businessData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                    <Facebook className="w-6 h-6" />
                  </a>
                )}
                {businessData.socialMedia.instagram && (
                  <a href={businessData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
                {businessData.socialMedia.twitter && (
                  <a href={businessData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
                    <Twitter className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="grid grid-cols-2 gap-2">
                {businessData.media.images.slice(0, 4).map((image, index) => (
                  <img key={index} src={image} alt={`${businessData.businessName} ${index + 1}`} className="rounded-lg object-cover w-full h-32" />
                ))}
              </div>
              <div className="mt-4">
                <h3 className="font-semibold text-gray-900 mb-2">Amenities</h3>
                <div className="flex flex-wrap gap-2">
                  {businessData.features.map((feature, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeframe Selection */}
        <div className="flex justify-end">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>

        {/* Metrics Cards */}
        <MetricsCards timeframe={selectedTimeframe} />

        {/* Bookings Table */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <BookingsTable />
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default BusinessDashboard;