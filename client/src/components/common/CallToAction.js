import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <div className="py-10 sm:py-12 md:py-14 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4 sm:space-y-5"
        >
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-gray-700">
            Ready to start your journey?
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold text-emerald-600">
            Join GoLocal Guide today.
          </h3>

          {/* Buttons Section */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center max-w-4xl mx-auto">
            {/* Register Your Business Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex-1"
            >
              <Link
                to="/signup"
                className="block text-center bg-emerald-600 text-white border-2 border-emerald-600 
                  px-4 py-2 sm:px-5 sm:py-2.5 rounded-md font-medium 
                  hover:bg-white hover:text-emerald-600 
                  transition-colors duration-300 
                  text-sm sm:text-base"
              >
                Register Your Business
              </Link>
            </motion.div>

            {/* Sign up as Tourist Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex-1"
            >
              <Link
                to="/signup"
                className="block text-center bg-emerald-600 text-white border-2 border-emerald-600 
                  px-4 py-2 sm:px-5 sm:py-2.5 rounded-md font-medium 
                  hover:bg-white hover:text-emerald-600 
                  transition-colors duration-300 
                  text-sm sm:text-base"
              >
                Sign up as Tourist
              </Link>
            </motion.div>

            {/* Become a Guide Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto flex-1"
            >
              <Link
                to="/signup"
                className="block text-center bg-emerald-600 text-white border-2 border-emerald-600 
                  px-4 py-2 sm:px-5 sm:py-2.5 rounded-md font-medium 
                  hover:bg-white hover:text-emerald-600 
                  transition-colors duration-300 
                  text-sm sm:text-base"
              >
                Become a Guide
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CallToAction;