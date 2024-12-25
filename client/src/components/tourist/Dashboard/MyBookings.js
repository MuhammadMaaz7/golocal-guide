import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Utensils, Building, User, Clock, Users, Phone, Mail, MessageSquare, AlertCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { myBookingsService } from '../../../services/myBookingsService';

const tabVariants = {
  active: {
    borderBottom: '2px solid #10B981',
    color: '#10B981',
    y: 0
  },
  inactive: {
    borderBottom: '2px solid transparent',
    color: '#6B7280',
    y: 0
  }
};

const contentVariants = {
  enter: { x: 300, opacity: 0 },
  center: { x: 0, opacity: 1 },
  exit: { x: -300, opacity: 0 }
};

const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

const BookingCard = ({ booking, type }) => {
  const icons = {
    guide: User,
    room: Building,
    table: Utensils
  };
  
  const Icon = icons[type];

  const getBookingDetails = () => {
    switch (type) {
      case 'guide':
        return {
          title: 'Guide Request',
          subtitle: booking.area,
          date: `${formatDate(booking.startDate)} - ${formatDate(booking.endDate)}`,
          status: booking.status,
          details: [
            { icon: User, value: booking.guide?.userID?.name || 'Guide name not available' },
            { icon: Phone, value: booking.phone },
            { icon: MessageSquare, value: booking.message || 'No message' },
            { icon: MapPin, value: booking.area }
          ]
        };
      case 'room':
        return {
          title: `Room at ${booking.businessUser?.businessName || 'N/A'}`,
          subtitle: `${booking.numberOfGuests.adults} Adults, ${booking.numberOfGuests.children} Children`,
          date: `${formatDate(booking.checkIn)} - ${formatDate(booking.checkOut)}`,
          status: booking.status,
          price: booking.totalPrice,
          details: [
            { icon: Users, value: `${booking.numberOfGuests.adults + booking.numberOfGuests.children} Guests` },
            { icon: Phone, value: booking.contactInformation.phone },
            { icon: Mail, value: booking.contactInformation.email },
            booking.specialRequests && { 
              icon: MessageSquare, 
              value: booking.specialRequests 
            }
          ].filter(Boolean)
        };
      case 'table':
        return {
          title: booking.businessId?.name || 'Restaurant Booking',
          subtitle: `${booking.numberOfPeople} People`,
          date: `${formatDate(booking.date)} at ${booking.time}`,
          status: booking.status,
          details: [
            { icon: Users, value: `${booking.numberOfPeople} People` },
            { icon: Clock, value: booking.time },
            booking.specialRequests && { 
              icon: MessageSquare, 
              value: booking.specialRequests 
            }
          ].filter(Boolean)
        };
      default:
        return { 
          title: 'Unknown Booking',
          subtitle: '',
          date: '',
          status: '',
          details: []
        };
    }
  };

  const details = getBookingDetails();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Icon className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{details.title}</h3>
              <p className="text-sm text-gray-500">{details.subtitle}</p>
            </div>
          </div>
          <StatusBadge status={details.status} />
        </div>

        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{details.date}</span>
          </div>

          {details.details.map((detail, index) => (
            <div key={index} className="flex items-center text-sm text-gray-600">
              <detail.icon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{detail.value}</span>
            </div>
          ))}

          {details.price && (
            <div className="mt-4 flex justify-end">
              <span className="text-lg font-semibold text-emerald-600">
                ${details.price}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ErrorMessage = ({ message }) => (
  <div className="flex items-center justify-center p-4 bg-red-50 rounded-lg">
    <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
    <p className="text-red-700">{message}</p>
  </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="flex justify-center items-center space-x-2 mt-6">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
      className="p-2 rounded-full bg-gray-100 text-gray-600 disabled:opacity-50"
    >
      <ChevronLeft size={20} />
    </button>
    <span className="text-gray-600">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
      className="p-2 rounded-full bg-gray-100 text-gray-600 disabled:opacity-50"
    >
      <ChevronRight size={20} />
    </button>
  </div>
);

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState('guides');
  const [bookings, setBookings] = useState({
    guides: [],
    rooms: [],
    tables: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 3;

  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const [guides, rooms, tables] = await Promise.all([
          myBookingsService.getGuideRequests(),
          myBookingsService.getRoomBookings(),
          myBookingsService.getTableBookings()
        ]);

        setBookings({
          guides,
          rooms,
          tables
        });
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings. Please check your connection and try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const tabs = [
    { id: 'guides', label: 'Guide Bookings', icon: User },
    { id: 'rooms', label: 'Hotel Rooms', icon: Building },
    { id: 'tables', label: 'Restaurant Tables', icon: Utensils }
  ];

  const paginatedBookings = bookings[activeTab].slice(
    (currentPage - 1) * bookingsPerPage,
    currentPage * bookingsPerPage
  );

  const totalPages = Math.ceil(bookings[activeTab].length / bookingsPerPage);

  return (
    <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
      <h2 className="text-xl text-gray-600 font-bold mb-6">My Bookings</h2>
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 bg-white p-2 rounded-lg shadow-sm">
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            variants={tabVariants}
            animate={activeTab === tab.id ? 'active' : 'inactive'}
            onClick={() => {
              setActiveTab(tab.id);
              setCurrentPage(1);
            }}
            className="flex items-center py-2 px-4 text-sm font-medium focus:outline-none transition-colors duration-200 rounded-md"
          >
            <tab.icon className="w-5 h-5 mr-2" />
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      {error ? (
        <ErrorMessage message={error} />
      ) : isLoading ? (
        <div className="flex items-center justify-center py-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full"
          />
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={contentVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "tween", duration: 0.3 }}
          >
            {paginatedBookings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="inline-block p-3 bg-gray-100 rounded-full mb-4">
                  {activeTab === 'guides' ? (
                    <User className="w-6 h-6 text-gray-400" />
                  ) : activeTab === 'rooms' ? (
                    <Building className="w-6 h-6 text-gray-400" />
                  ) : (
                    <Utensils className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No {activeTab} bookings found
                </h3>
                <p className="text-gray-500">
                  When you book {activeTab === 'guides' ? 'a guide' : activeTab === 'rooms' ? 'a hotel room' : 'a restaurant table'}, 
                  it will appear here.
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {paginatedBookings.map(booking => (
                    <BookingCard
                      key={booking._id}
                      booking={booking}
                      type={activeTab.slice(0, -1)} // Remove 's' from the end
                    />
                  ))}
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

