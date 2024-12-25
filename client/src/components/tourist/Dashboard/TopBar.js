import React, { useState, useRef } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopBar({ userName }) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationRef = useRef(null);

  const toggleNotification = () => setIsNotificationOpen(!isNotificationOpen);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md"
    >
      <div>
        <h1 className="text-2xl font-bold text-emerald-600">Hello, {userName}!</h1>
        <p className="text-gray-500">Welcome back and explore the world.</p>
      </div>
      <div className="relative" ref={notificationRef}>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleNotification}
          className="p-2 hover:bg-emerald-100 rounded-full transition-colors duration-300"
        >
          <Bell size={24} className="text-emerald-600" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
        </motion.button>
        <AnimatePresence>
          {isNotificationOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-10"
            >
              <h3 className="font-semibold mb-2 text-emerald-600">Notifications</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                  <p className="text-sm text-gray-600">New message from John</p>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                  <p className="text-sm text-gray-600">You have a new follower</p>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></span>
                  <p className="text-sm text-gray-600">Your post was liked</p>
                </li>
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full py-2 bg-emerald-500 text-white rounded-md text-sm font-medium hover:bg-emerald-600 transition-colors duration-300"
              >
                View All Notifications
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

