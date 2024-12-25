import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, MapPin, Check, X, Filter } from 'lucide-react';

const BookingList = ({ bookings, onAccept, onDecline }) => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');

  const filteredBookings = bookings.filter(booking => {
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    const matchesDate = !dateFilter || new Date(booking.checkIn).toLocaleDateString() === dateFilter;
    return matchesStatus && matchesDate;
  });

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="divide-y divide-gray-200">
        <AnimatePresence>
          {filteredBookings.map((booking) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-4 hover:bg-gray-50"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                    {/* Check if user.name exists before accessing charAt */}
                    <span className="text-purple-600 font-semibold">
                      {booking.user?.name ? booking.user.name.charAt(0) : '?'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {booking.user?.name || 'Unknown User'}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{booking.hotelRoom?.name || 'Unknown Room'}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      <span>Guests: {booking.numberOfGuests.adults} Adults, {booking.numberOfGuests.children} Children</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {booking.status === 'pending' && (
                    <>
                      <button
                        onClick={() => onAccept(booking._id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDecline(booking._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                      booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BookingList;