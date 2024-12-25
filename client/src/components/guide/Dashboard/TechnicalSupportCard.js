import React from 'react';
import { motion } from 'framer-motion';
import { cardVariants } from './animations';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 59 },
  { name: 'Mar', value: 80 },
  { name: 'Apr', value: 71 },
  { name: 'May', value: 56 },
  { name: 'Jun', value: 55 },
  { name: 'Jul', value: 40 },
];

const TechnicalSupportCard = () => {
  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm shadow-lg rounded-2xl p-6 border border-emerald-100"
      variants={cardVariants}
    >
      <h2 className="text-2xl font-semibold text-emerald-800 mb-4">Technical Support</h2>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-3xl font-bold text-gray-800">78<span className="text-lg text-emerald-500">%</span></h3>
          <p className="text-gray-500">New accounts since 2018</p>
        </div>
        <div className="text-emerald-500 font-semibold">+14</div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TechnicalSupportCard;