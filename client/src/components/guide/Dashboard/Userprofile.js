"use client"

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function UserProfile({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const menuItems = [
    { icon: <User size={16} />, label: 'View Profile', action: () => console.log('View Profile') },
    { icon: <Settings size={16} />, label: 'Update Profile', action: () => console.log('Update Profile') },
    { icon: <LogOut size={16} />, label: 'Logout', action: () => console.log('Logout') },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.div
        whileHover={{ boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}
        className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl shadow-md border border-emerald-200 cursor-pointer"
        onClick={toggleDropdown}
      >
        <div className="flex items-center gap-3">
          <img
            src={user?.avatar || '/images/avatar.jpg'}
            alt={user?.name || 'User'}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-emerald-500"
          />
          <div>
            <h3 className="font-bold text-emerald-700 text-sm sm:text-base">Guide</h3>
            <p className="text-xs sm:text-sm text-gray-500">Guide</p>
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} className="text-emerald-600" />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-10 border border-emerald-100"
          >
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                whileHover={{ backgroundColor: '#f0fdf4' }}
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:text-emerald-600 flex items-center space-x-2"
                onClick={() => {
                  item.action();
                  setIsOpen(false);
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

