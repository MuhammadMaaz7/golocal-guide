import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpCircle, ArrowRightCircle } from 'lucide-react';

const categories = [
  {
    title: "Tourists",
    description: "Find unique local experiences, connect with expert guides, and create unforgettable memories.",
    image: "/placeholder.svg?height=400&width=400",
    content: "Discover authentic local experiences and connect with knowledgeable guides who can show you the hidden gems of your destination."
  },
  {
    title: "Local Guides",
    description: "Share your expertise, grow your business, and provide authentic local experiences.",
    image: "/placeholder.svg?height=400&width=400",
    content: "Share your local knowledge and expertise while building a successful business. Connect with tourists seeking authentic experiences."
  },
  {
    title: "Business Owners",
    description: "Showcase your local business to tourists and partner with guides to increase visibility.",
    image: "/placeholder.svg?height=400&width=400",
    content: "Increase your visibility to tourists and collaborate with local guides to create unique experiences centered around your business."
  }
];

function ForWhom() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="py-20 bg-[#f8faf9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-16"
        >
          WHO IT'S FOR
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={{ rotate: activeIndex === index ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeIndex === index ? (
                      <ArrowRightCircle className="w-8 h-8 text-emerald-600" />
                    ) : (
                      <ArrowUpCircle className="w-8 h-8 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                    )}
                  </motion.div>
                  <div>
                    <h3 className={`text-xl font-semibold ${
                      activeIndex === index ? 'text-emerald-600' : 'text-gray-900 group-hover:text-emerald-600'
                    } transition-colors`}>
                      {category.title}
                    </h3>
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: activeIndex === index ? 'auto' : 0,
                        opacity: activeIndex === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-gray-600 mt-2 leading-relaxed overflow-hidden"
                    >
                      {category.content}
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl overflow-hidden bg-[#e6f5ef] p-8"
              >
                <motion.img
                  src={categories[activeIndex].image}
                  alt={categories[activeIndex].title}
                  className="w-full h-[300px] object-cover rounded-lg mb-6"
                />
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-700 leading-relaxed"
                >
                  {categories[activeIndex].description}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForWhom;

