import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Map, Star, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield />,
      title: "Safe & Reliable Tours",
      description: "Experience verified and secure local tours with trusted guides and guaranteed satisfaction."
    },
    {
      icon: <Map />,
      title: "Local Expertise",
      description: "Discover hidden gems and authentic experiences with knowledgeable local guides."
    },
    {
      icon: <Star />,
      title: "Personalized Experience",
      description: "Get customized tours that match your interests and preferences perfectly."
    },
    {
      icon: <Users />,
      title: "Community-Driven",
      description: "Join a thriving community of travelers, guides, and local businesses."
    }
  ];

  return (
    <div className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-5xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-emerald-600 mb-10 sm:mb-12 lg:mb-16 max-w-4xl mx-auto"
        >
          GoLocal Guide gives you the tools you need to explore and connect with local experiences.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-4 sm:p-5 rounded-lg hover:bg-emerald-50/50 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-50 text-emerald-600 mb-4 sm:mb-5 mx-auto">
                {React.cloneElement(feature.icon, { 
                  className: "w-7 h-7 sm:w-8 sm:h-8" 
                })}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
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