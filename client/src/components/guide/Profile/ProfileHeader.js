import React from 'react';
import { motion } from 'framer-motion';
import { LogOut, Bell } from 'lucide-react';
import { headerVariants } from '../Dashboard/animations';

const ProfileHeader = ({ guideName, onLogout }) => {
  return (
    <motion.div 
      className="flex justify-between items-center p-6 bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl border border-emerald-100"
      variants={headerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center space-x-4">
        <motion.h1 
          className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.02 }}
        >
          View Your Profile!
        </motion.h1>
        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      </div>
      
      <div className="flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 bg-emerald-100 text-emerald-600 rounded-full hover:bg-emerald-200 transition-all duration-300"
        >
          <Bell className="h-5 w-5" />
        </motion.button>
        
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
