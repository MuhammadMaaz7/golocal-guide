import React from 'react';
import Navbar from '../components/common/Navbar';
import Features from '../components/common/Features';
import CTASection from '../components/common/cta-section';
import HeroSection from '../components/common/hero-section';
import ForWhom from '../components/common/ForWhom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <Features />
      <ForWhom />
      <CTASection />
    </div>
  )
};

export default HomePage;