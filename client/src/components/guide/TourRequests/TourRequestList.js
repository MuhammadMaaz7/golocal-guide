import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import GuideRequestCard from './TourRequestCard';

const GuideRequestList = ({ requests, onChatClick, onSort }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-2"
    >
      <div className="grid grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 px-4 py-2 text-sm font-medium text-gray-500 border-b">
        <div className="flex items-center cursor-pointer" onClick={() => onSort('area')}>
          Area and Tourist
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
        <div className="flex items-center cursor-pointer" onClick={() => onSort('startDate')}>
          Date
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
        <div className="flex items-center cursor-pointer" onClick={() => onSort('status')}>
          Status
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
        <div className="flex items-center cursor-pointer" onClick={() => onSort('price')}>
          Price
          <ChevronDown className="w-4 h-4 ml-1" />
        </div>
        <div></div>
      </div>
      
      {requests.map((request) => (
        <GuideRequestCard
          key={request._id}
          request={request}
          onChatClick={onChatClick}
        />
      ))}
    </motion.div>
  );
};

export default GuideRequestList;
