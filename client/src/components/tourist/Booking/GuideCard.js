import React from 'react';
import { motion } from 'framer-motion';
import { Star, Languages, Clock } from 'lucide-react';

function GuideCard({ guide, onBook }) {
  if (!guide) {
    return null;
  }

  const userName = guide.user?.name || 'Unknown Guide';

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white p-4 rounded-xl shadow-md border border-gray-100"
    >
      <div className="flex gap-4">
        <img
          src={guide.profilePictureURL || '/placeholder-avatar.jpg'}
          alt={userName}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{userName}</h3>
          <div className="flex items-center gap-1 text-amber-400 mt-1">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm text-gray-600">
              {guide.rating?.toFixed(1) || 'N/A'} ({guide.totalReviews || 0} reviews)
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Languages className="w-4 h-4" />
            <span>{guide.languages?.join(', ') || 'Not specified'}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>{guide.yearsOfExperience || 0} years experience</span>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <span className="font-semibold text-emerald-600">
            ${guide.fee || 0}/day
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onBook(guide)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Book Guide
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

export default GuideCard;

