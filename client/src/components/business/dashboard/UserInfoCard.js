import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Star, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const UserInfoCard = ({ businessUser }) => {
  const socialIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
    linkedin: Linkedin
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-3xl font-bold"
        >
          {businessUser.businessName.charAt(0)}
        </motion.div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{businessUser.businessName}</h2>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              {businessUser.businessType.charAt(0).toUpperCase() + businessUser.businessType.slice(1)}
            </span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              <span className="font-medium">{businessUser.ratings.average.toFixed(1)}</span>
              <span className="text-sm text-gray-500 ml-1">({businessUser.ratings.count} reviews)</span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{businessUser.location.city}, {businessUser.location.country}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{businessUser.contactInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gray-400" />
              <span className="text-sm">{businessUser.contactInfo.email}</span>
            </div>
          </div>
          <div className="flex gap-2">
            {Object.entries(businessUser.socialMedia).map(([platform, url]) => {
              if (url) {
                const Icon = socialIcons[platform];
                return (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserInfoCard;
