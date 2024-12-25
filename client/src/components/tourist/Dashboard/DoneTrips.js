import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { roomBookingService } from '../../../services/roomBookingService';
import { Calendar, MapPin, Users } from 'lucide-react';

export default function DoneTrips() {
  const [completedBookings, setCompletedBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedBookings = async () => {
      try {
        const bookings = await roomBookingService.getCompletedBookings();
        setCompletedBookings(bookings);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompletedBookings();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-6">
      <h3 className="font-bold mb-4 text-lg">Completed Trips</h3>
      {completedBookings.length === 0 ? (
        <p className="text-gray-500">No completed trips yet.</p>
      ) : (
        <div className="space-y-4">
          {completedBookings.map((booking) => (
            <motion.div
              key={booking._id}
              whileHover={{ x: 5 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <h4 className="font-semibold text-lg mb-2">{booking.hotelRoom.name}</h4>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <MapPin size={16} className="mr-2" />
                <span>{booking.businessUser.businessName}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <Calendar size={16} className="mr-2" />
                <span>{new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Users size={16} className="mr-2" />
                <span>{booking.numberOfGuests.adults} Adults, {booking.numberOfGuests.children} Children</span>
              </div>
              <div className="text-right">
                <span className="font-semibold text-green-600">${booking.totalPrice}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

