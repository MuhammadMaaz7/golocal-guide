import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  return (
    <div className="bg-white rounded-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-emerald-600">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex gap-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrevMonth}
            className="p-1 hover:bg-emerald-50 rounded-full text-emerald-600"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNextMonth}
            className="p-1 hover:bg-emerald-50 rounded-full text-emerald-600"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <div key={day} className="text-center text-xs font-medium text-emerald-600 py-1">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1 mt-1">
        {Array.from({ length: firstDayOfMonth }, (_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isSelected = selectedDate === day;
          
          return (
            <motion.button
              key={day}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedDate(day)}
              className={`
                aspect-square flex items-center justify-center text-sm rounded-full
                transition-colors relative
                ${isSelected 
                  ? 'bg-emerald-600 text-white' 
                  : 'hover:bg-emerald-50 text-gray-700'
                }
                ${isToday(day) && !isSelected
                  ? 'text-emerald-600 font-medium'
                  : ''
                }
              `}
            >
              {day}
              {isToday(day) && !isSelected && (
                <div className="absolute bottom-1 w-1 h-1 bg-emerald-600 rounded-full" />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

