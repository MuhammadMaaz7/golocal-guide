import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to start your journey?
          </h2>
          <h3 className="text-4xl font-bold text-emerald-600 mb-8">
            Join GoLocal Guide today.
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/signup"
                className="bg-emerald-600 text-white px-8 py-3 rounded-md inline-block font-medium hover:bg-emerald-700 transition-colors"
              >
                Sign up as Tourist
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/guide-signup"
                className="bg-white text-emerald-600 border-2 border-emerald-600 px-8 py-3 rounded-md inline-block font-medium hover:bg-emerald-50 transition-colors"
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

