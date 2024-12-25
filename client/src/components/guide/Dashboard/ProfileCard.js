import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from './animations';
import { User } from 'lucide-react';

const ProfileCard = ({ profileData, user }) => {
  if (!profileData || !user) {
    return (
      <motion.div 
        className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-emerald-100 mt-6"
        variants={cardVariants}
      >
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-emerald-200 h-24 w-24 mb-4"></div>
          <div className="h-4 bg-emerald-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-emerald-200 rounded w-1/2"></div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-emerald-100 hover:shadow-xl transition-all duration-300 mt-6"
      variants={cardVariants}
      whileHover={{ y: -5 }}
    >
      <motion.div 
        className="relative w-24 h-24 mx-auto mb-4"
        whileHover={{ scale: 1.05 }}
      >
        {profileData.profilePictureURL ? (
          <img
            src={profileData.profilePictureURL}
            alt={`${user.name}'s Profile`}
            className="w-full h-full rounded-full object-cover border-4 border-emerald-200"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
        )}
        <div className="absolute -bottom-2 -right-2 h-8 w-8 bg-emerald-400 rounded-full flex items-center justify-center border-4 border-white">
          <span className="text-white text-xs font-bold">
            {profileData.rating?.toFixed(1)}
          </span>
        </div>
      </motion.div>

      <motion.h2 
        className="text-center text-2xl font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2"
      >
        {user.name || 'No Name Available'}
      </motion.h2>

      <motion.p className="text-center text-gray-600 mb-4">
        {user.email || 'No Email Available'}
      </motion.p>

      <div className="flex justify-center items-center space-x-2 text-sm text-gray-600">
        <span className="px-3 py-1 bg-emerald-50 rounded-full">
          {profileData.totalReviews} reviews
        </span>
        <span className="px-3 py-1 bg-emerald-50 rounded-full">
          {profileData.rating?.toFixed(1)} / 5 rating
        </span>
      </div>
    </motion.div>
  );
};

export default ProfileCard;

