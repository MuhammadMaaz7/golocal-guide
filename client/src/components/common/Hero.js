// components/Hero.js
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const Hero = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="relative h-screen flex items-center justify-center text-center px-4"
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/bg.jpg"
          alt="Beautiful landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white bg-opacity-70"></div>
      </div>
      <div className="relative z-10 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-emerald-600 mb-6"
        >
          Discover Your Next Adventure with GoLocal Guide
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl text-emerald-500 mb-8"
        >
          Your ultimate platform for local tourism experiences
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-emerald-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-emerald-700 transition duration-300"
        >
          <MapPin className="inline-block mr-2" />
          Start Exploring
        </motion.button>
      </div>
    </motion.section>
  );
};

export default Hero;