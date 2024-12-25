import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import BookingList from '../../components/business/bookings/BookingList';
import BookingCalendar from '../../components/business/bookings/BookingCalendar';
import Sidebar from '../../components/business/Sidebar';
import TopBar from '../../components/business/TopBar';
import axios from 'axios';

const BookingDashboard = () => {
  const [view, setView] = useState('list'); // 'list' or 'calendar'
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchBookings();
    }
  }, [user, navigate]);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/manage-bookings', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  // Confirm a booking
  const handleAcceptBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/manage-bookings/confirm/${bookingId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.map(booking => 
        booking._id === bookingId ? response.data : booking
      ));
    } catch (error) {
      console.error('Error confirming booking:', error.response ? error.response.data : error.message);
    }
  };

  const handleDeclineBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`http://localhost:5000/api/manage-bookings/decline/${bookingId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.map(booking => 
        booking._id === bookingId ? response.data : booking
      ));
    } catch (error) {
      console.error('Error declining booking:', error.response ? error.response.data : error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div className="flex bg-white-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white-100">
          <div className="container mx-auto px-6 py-8">
            {/* View Toggle */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">Manage Bookings</h1>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setView('list')}
                    className={`px-4 py-2 rounded-lg ${
                      view === 'list'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    List View
                  </button>
                  <button
                    onClick={() => setView('calendar')}
                    className={`px-4 py-2 rounded-lg ${
                      view === 'calendar'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Calendar View
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {view === 'list' ? (
                <BookingList
                  bookings={bookings}
                  onAccept={handleAcceptBooking}
                  onDecline={handleDeclineBooking}
                />
              ) : (
                <BookingCalendar bookings={bookings} />
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingDashboard;

