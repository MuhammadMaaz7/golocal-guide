import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Star, MessageCircle, MapPin, Phone } from 'lucide-react';
import { useGuide } from '../../../context/GuideContext';
import { useAuth } from '../../../context/AuthContext';

const ProfileDetails = () => {
  const { user } = useAuth();
  const { guideData } = useGuide();

  const detailItems = [
    { icon: Mail, label: 'Email', value: user.email },
    { icon: Star, label: 'Rating', value: `${guideData.rating.toFixed(1)} / 5` },
    { icon: MessageCircle, label: 'Total Reviews', value: guideData.totalReviews },
    { icon: MapPin, label: 'Address', value: guideData.address },
    { icon: Phone, label: 'Phone', value: guideData.phoneNumber }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {detailItems.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
          className="flex items-start space-x-3"
        >
          <div className="mt-1">
            <item.icon className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-500">{item.label}</h2>
            <p className="text-base text-gray-900">{item.value}</p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProfileDetails;

