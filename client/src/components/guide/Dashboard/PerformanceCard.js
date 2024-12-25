import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cardVariants } from './animations';

const PerformanceCard = ({ cashDeposits, investedDividends, capitalGains, rateEarnings, growthRate, increasePercentage }) => {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-emerald-100"
      variants={cardVariants}
    >
      <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Portfolio Performance</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-gray-500 text-sm">Cash Deposits</h3>
          <p className="text-2xl font-bold text-gray-800">{cashDeposits}M</p>
          <div className="flex items-center text-red-500">
            <TrendingDown className="w-4 h-4 mr-1" />
            <span>{rateEarnings}% less earnings</span>
          </div>
        </div>
        <div>
          <h3 className="text-gray-500 text-sm">Invested Dividends</h3>
          <p className="text-2xl font-bold text-gray-800">{investedDividends}M</p>
          <div className="flex items-center text-emerald-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>Grow Rate: {growthRate}%</span>
          </div>
        </div>
        <div>
          <h3 className="text-gray-500 text-sm">Capital Gains</h3>
          <p className="text-2xl font-bold text-gray-800">${capitalGains}</p>
          <div className="flex items-center text-emerald-500">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>Increased by {increasePercentage}%</span>
          </div>
        </div>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-6 w-full py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-300"
      >
        View Complete Report
      </motion.button>
    </motion.div>
  );
};

export default PerformanceCard;

