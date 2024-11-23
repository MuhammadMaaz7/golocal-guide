import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CallToAction = () => {
  return (
    <section style={{
      padding: '4rem 1rem',
      backgroundColor: '#f8fafc',
      textAlign: 'center'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem',
            color: '#1a1a1a'
          }}
        >
          Ready to Start Your Journey?
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            fontSize: '1.125rem',
            color: '#4b5563',
            marginBottom: '2rem'
          }}
        >
          Join our community of travelers and local guides today.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Link
            to="/tourist/register"
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: '600',
              display: 'inline-block'
            }}
          >
            Sign Up as Tourist
          </Link>
          <Link
            to="/guide/register"
            style={{
              backgroundColor: 'white',
              color: '#1f2937',
              padding: '0.75rem 2rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              fontWeight: '600',
              border: '1px solid #e5e7eb',
              display: 'inline-block'
            }}
          >
            Register Your Business
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;  // Changed from 'Features' to 'CallToAction'