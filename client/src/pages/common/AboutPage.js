import React from 'react';

import AboutHero from '../../components/about/AboutHero';

import Journey from '../../components/about/Journey';

import Mission from '../../components/about/Mission';

import Quote from '../../components/about/Quote';

import Team from '../../components/about/Team';

import Footer from '../../components/common/Footer';

import Navbar from '../../components/common/Navbar';


const AboutPage = () => {

  return (

    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50">

      <Navbar />

      <AboutHero />

      <Mission />

      <Quote/>

      <Team />

      <Journey />

      <Footer />

    </div>

  );

};


export default AboutPage;