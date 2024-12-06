// HomePage.js
import React from 'react';
import Hero from '../components/common/Hero.js';
import Features from '../components/common/Features';
import UserTypes from '../components/common/UserTypes';
import CallToAction from '../components/common/CallToAction.js';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">
      <Navbar />
      <Hero />
      <Features />
      <UserTypes />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;