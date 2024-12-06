import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, Users, Building2 } from 'lucide-react';

const userTypes = [
  {
    title: 'Tourists',
    icon: Compass,
    description: 'Discover authentic local experiences and create unforgettable memories with trusted guides.',
    image: '/images/tourist1.jpg',
  },
  {
    title: 'Local Guides',
    icon: Users,
    description: 'Share your local expertise and earn while showing travelers the best of your city.',
    image: '/images/guide1.jpg',
  },
  {
    title: 'Business Owners',
    icon: Building2,
    description: 'Connect with travelers and grow your business by showcasing your services to a global audience.',
    image: '/images/business1.jpg',
  },
];

const UserTypes = () => {
  const [activeType, setActiveType] = useState(0);

  return (
    <section className="py-12 sm:py-16 lg:py-18">
      <div className="container mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 items-center">
          {/* Left Side - Heading and User Types List */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-gray-700">
              Who It's For
            </h2>
            <div className="space-y-4 sm:space-y-6">
              {userTypes.map((type, index) => (
                <motion.div
                  key={index}
                  className={`group flex items-center space-x-3 sm:space-x-4 cursor-pointer 
                    py-2 px-3 sm:py-3 sm:px-4 rounded-xl sm:rounded-2xl 
                    transition-all duration-300 
                    hover:bg-white hover:shadow-md ${
                    activeType === index ? 'bg-white shadow-md' : ''
                  }`}
                  onClick={() => setActiveType(index)}
                  whileHover={{ x: 10 }}
                  initial={false}
                >
                  <motion.div
                    className={`p-1.5 sm:p-2 rounded-full transition-colors duration-300 ${
                      activeType === index
                        ? 'bg-teal-50'
                        : 'bg-gray-50 group-hover:bg-teal-50'
                    }`}
                  >
                    <type.icon
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                        activeType === index
                          ? 'text-emerald-500'
                          : 'text-gray-400 group-hover:text-emerald-500'
                      }`}
                    />
                  </motion.div>
                  <div className="flex-1">
                    <h3
                      className={`text-base sm:text-lg font-medium transition-colors duration-300 ${
                        activeType === index
                          ? 'text-emerald-500'
                          : 'text-gray-500 group-hover:text-emerald-500'
                      }`}
                    >
                      {type.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{
                      x: activeType === index ? 0 : -10,
                      opacity: activeType === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight
                      className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300 ${
                        activeType === index
                          ? 'text-emerald-500'
                          : 'text-gray-400'
                      }`}
                    />
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side - Image and Description */}
          <motion.div
            key={activeType}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg- rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <motion.div
              layoutId="image-container"
              className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] overflow-hidden"
            >
              <motion.img
                src={userTypes[activeType].image}
                alt={userTypes[activeType].title}
                className="w-full h-full object-cover"
                layoutId={`image-${activeType}`}
              />
            </motion.div>
            <motion.div
              className="p-2 sm:p-3 lg:p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm sm:text-base lg:text-lg text-gray-500 leading-relaxed">
                {userTypes[activeType].description}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default UserTypes;