import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ title, value, percentage, isIncrease, Icon }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-xl shadow-md"
  >
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`p-2 rounded-lg ${isIncrease ? 'bg-emerald-100' : 'bg-red-100'}`}>
        <Icon className={`w-6 h-6 ${isIncrease ? 'text-emerald-600' : 'text-red-600'}`} />
      </div>
    </div>
    <div className="flex items-center">
      {isIncrease ? (
        <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
      ) : (
        <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
      )}
      <span className={`text-sm ${isIncrease ? 'text-emerald-600' : 'text-red-600'}`}>
        {percentage}%
      </span>
    </div>
  </motion.div>
);

export default StatCard;

