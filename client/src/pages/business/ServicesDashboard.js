import React, { useState,useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/business/Sidebar';
import TopBar from '../../components/business/TopBar';
import ServiceList from '../../components/business/services/ServiceList';
import AddService from '../../components/business/services/AddServiceScreen';
import { Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const ServicesDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [businessType, setBusinessType] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (user) {
      console.log(user);
      console.log(user.businessType)
      fetchServices();
      fetchBusinessType();
    }
  }, [user, navigate]);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/manage-services', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error.response ? error.response.data : error.message);
    }
  };

  const fetchBusinessType = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/manage-services/business-type', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.businessType)
      setBusinessType(response.data.businessType);
    } catch (error) {
      console.error('Error fetching business type:', error.response ? error.response.data : error.message);
    }
  };

  const handleEdit = async (updatedService) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/manage-services/${updatedService._id}`, updatedService, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(services.map(service => service._id === updatedService._id ? response.data : service));
    } catch (error) {
      console.error('Error updating service:', error.response ? error.response.data : error.message);
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/manage-services/${serviceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(services.filter(service => service._id !== serviceId));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const handleAddService = (newService) => {
    setIsAddModalOpen(true);
  };

  const handleServiceAdded = (newService) => {
    setServices([...services, newService]);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Overlay for mobile sidebar
  const Overlay = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.5 }}
      exit={{ opacity: 0 }}
      onClick={() => setIsSidebarOpen(false)}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
    />
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && <Overlay />}
      </AnimatePresence>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        <TopBar />
        
        {/* Main Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {/* Header Section */}
          <div className="space-y-4 md:space-y-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
                  Your Services
                </h1>
                <p className="mt-1 text-gray-600">
                  Manage and update your service offerings
                </p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddService}
                className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors shadow-sm gap-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Service</span>
              </motion.button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {[
                { label: 'Active Services', value: services.length },
                { label: 'Total Bookings', value: '124' },
                { label: 'This Month', value: '48' },
                { label: 'Revenue', value: '$12,480' }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white p-3 sm:p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <p className="text-xs sm:text-sm text-gray-600">{stat.label}</p>
                  <p className="text-lg sm:text-2xl font-semibold text-gray-800 mt-1">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
            <ServiceList
              services={services}
              onEdit={handleEdit}
              onDelete={handleDelete}
              businessType={businessType}
            />
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto border-t border-gray-200 py-4 px-4 text-center">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              <span>© 2024 GoLocal Guide</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-emerald-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-emerald-600 transition-colors">Contact</a>
            </div>
          </div>
        </footer>
      </div>
      {/* Add Service Modal */}
      <AddService
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        businessType={businessType}
        onServiceAdded={handleServiceAdded}
      />
    </div>
  );
};

export default ServicesDashboard;

