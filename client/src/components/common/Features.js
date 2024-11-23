// src/components/common/Features.js
import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    {
      icon: "⭐",
      title: "Local Expertise",
      description: "Connect with knowledgeable local guides who share authentic experiences and hidden gems."
    },
    {
      icon: "🤝",
      title: "Trusted Community",
      description: "Join a verified network of guides and travelers, ensuring safe and reliable experiences."
    },
    {
      icon: "🎯",
      title: "Personalized Tours",
      description: "Find experiences that match your interests, from adventure sports to cultural immersion."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          textAlign: 'center',
          marginBottom: '3rem'
        }}>
          Why Choose Us?
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          padding: '1rem'
        }}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              style={{
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '1rem'
              }}
            >
              <span style={{ fontSize: '2rem' }}>{feature.icon}</span>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: 'bold',
                color: '#1a1a1a'
              }}>
                {feature.title}
              </h3>
              <p style={{ 
                fontSize: '1rem',
                color: '#666',
                lineHeight: '1.5'
              }}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;