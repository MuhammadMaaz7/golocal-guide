import React from 'react';
import { Bell, Mail, Search, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TopBar() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <motion.div 
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="bg-gray-800 px-6 py-4 flex items-center justify-between"
    >
      <div>
        <h1 className="text-2xl font-bold">Good morning, Alex!</h1>
        <p className="text-gray-400">{currentDate}</p>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <Search className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <Mail className="w-5 h-5" />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-full">
          <Bell className="w-5 h-5" />
        </button>
        <button className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New reservation
        </button>
        <div className="w-10 h-10 rounded-full bg-gray-600" />
      </div>
    </motion.div>
  );
}

