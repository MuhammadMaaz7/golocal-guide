import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Map, Star, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Safe & Reliable Tours",
      description: "Experience verified and secure local tours with trusted guides and guaranteed satisfaction."
    },
    {
      icon: <Map className="w-12 h-12" />,
      title: "Local Expertise",
      description: "Discover hidden gems and authentic experiences with knowledgeable local guides."
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Personalized Experience",
      description: "Get customized tours that match your interests and preferences perfectly."
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Community-Driven",
      description: "Join a thriving community of travelers, guides, and local businesses."
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl font-bold text-emerald-700 mb-16"
        >
          GoLocal Guide gives you the tools you need to explore and connect with local experiences.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;

