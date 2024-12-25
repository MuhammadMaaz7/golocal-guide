import { motion } from 'framer-motion';

import React from 'react';


const HeroContact = () => {

  return (

    <motion.section

      className="relative h-screen flex items-center text-left px-8"

      initial={{ opacity: 0 }}

      whileInView={{ opacity: 1 }}

      transition={{ duration: 1 }}

    >

      <div className="absolute inset-0 overflow-hidden">

        <img

          src="/images/contact.jpg" 

          alt="Contact Us Background"

          className="w-full h-full object-cover"

        />

        <div className="absolute inset-0 bg-emerald-600 bg-opacity-70"></div> {/* Adjusted opacity */}

      </div>

      <div className="relative z-10 max-w-3xl">

        <motion.h1

          initial={{ opacity: 0, x: -20 }}

          whileInView={{ opacity: 1, x: 0 }}

          transition={{ delay: 0.2, duration: 0.5 }}

          className="text-7xl md:text-8xl font-bold text-white"

          style={{ marginLeft: '3rem' }}

        >

          Contact Us

        </motion.h1>

      </div>

    </motion.section>

  );

};


export default HeroContact;
