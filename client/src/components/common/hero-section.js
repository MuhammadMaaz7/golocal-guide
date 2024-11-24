import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="bg-gray-900 min-h-[600px] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Discover Local
            <br />
            Wonders
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold text-emerald-400 mb-6">
            with GoLocal Guide
          </h2>
          <p className="text-gray-300 text-xl mb-8 max-w-2xl">
            Connect with local guides, explore unique experiences, and create unforgettable memories in your favorite destinations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/tours"
                className="bg-emerald-600 text-white px-8 py-3 rounded-md inline-block font-medium hover:bg-emerald-700 transition-colors"
              >
                Explore Tours
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/guides"
                className="bg-white text-gray-900 px-8 py-3 rounded-md inline-block font-medium hover:bg-gray-100 transition-colors"
              >
                Find Guides
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-900/50" />
    </div>
  );
};

export default HeroSection;

