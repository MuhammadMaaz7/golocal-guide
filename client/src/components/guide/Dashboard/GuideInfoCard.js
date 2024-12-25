import React from 'react';
import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard';

const GuideInfoCard = ({ guideInfo }) => {
  console.log("Guide: ", guideInfo);

  // Destructure guideInfo for easy use
  const { yearsOfExperience, languages, expertiseAreas } = guideInfo;

  return (
    <div className="space-y-6">

      {/* Additional Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Experience Section */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-emerald-100"
          whileHover={{ scale: 1.05 }}
        >
          <motion.h3 className="text-xl font-semibold text-center mb-4 text-teal-600">
            Experience
          </motion.h3>
          <p className="text-center text-gray-600">{yearsOfExperience} years</p>
        </motion.div>

        {/* Languages Section */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-emerald-100"
          whileHover={{ scale: 1.05 }}
        >
          <motion.h3 className="text-xl font-semibold text-center mb-4 text-teal-600">
            Languages
          </motion.h3>
          <p className="text-center text-gray-600">{languages.join(', ')}</p>
        </motion.div>

        {/* Specialization Section */}
        <motion.div 
          className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-emerald-100"
          whileHover={{ scale: 1.05 }}
        >
          <motion.h3 className="text-xl font-semibold text-center mb-4 text-teal-600">
            Specialization
          </motion.h3>
          <p className="text-center text-gray-600">{expertiseAreas.join(', ')}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default GuideInfoCard;
