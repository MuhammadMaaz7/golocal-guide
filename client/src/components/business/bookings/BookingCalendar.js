import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BookingCalendar = ({ bookings }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const previousMonthDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  // Function to get bookings for a specific date
  const getBookingsForDate = (date) => {
    return bookings.filter(booking => {
      const checkInDate = new Date(booking.checkIn);
      const checkOutDate = new Date(booking.checkOut);
      return (
        date >= checkInDate.getDate() &&
        date <= checkOutDate.getDate() &&
        checkInDate.getMonth() === currentDate.getMonth() &&
        checkInDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={handlePreviousMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Week Days */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}

        {/* Previous Month Days */}
        {previousMonthDays.map((_, index) => (
          <div
            key={`prev-${index}`}
            className="aspect-square p-2 text-gray-400 text-center"
          />
        ))}

        {/* Current Month Days */}
        {days.map(day => {
          const dayBookings = getBookingsForDate(day);
          const hasBookings = dayBookings.length > 0;
          
          return (
            <motion.div
              key={day}
              whileHover={{ scale: 1.05 }}
              className={`aspect-square p-2 rounded-lg border ${
                hasBookings ? 'border-purple-200 bg-purple-50' : 'border-gray-200'
              }`}
            >
              <div className="text-center">
                <span className="text-sm font-medium text-gray-700">{day}</span>
                {hasBookings && (
                  <div className="mt-1">
                    <span className="text-xs font-medium text-purple-600">
                      {dayBookings.length} booking{dayBookings.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingCalendar;