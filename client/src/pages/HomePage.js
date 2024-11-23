import React from 'react';
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Features from '../components/common/Features';
import CTASection from '../components/common/cta-section';
import HeroSection from '../components/common/hero-section';
import Testimonials from '../components/common/testimonials';


const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <Features />
      <Testimonials />
      <CTASection />
    </div>
  )
};

export default HomePage;