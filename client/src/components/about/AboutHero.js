import { motion } from 'framer-motion';

import React from 'react';


const HeroAbout = () => {

  return (

    <motion.section

      className="relative h-screen flex items-center text-left px-8"

      initial={{ opacity: 0 }}

      whileInView={{ opacity: 1 }}

      transition={{ duration: 1 }}

    >

      <div className="absolute inset-0 overflow-hidden">

        <img

          src="/images/about.jpg"

          alt="About Us Background"

          className="w-full h-full object-cover"

        />

        <div className="absolute inset-0 bg-white bg-opacity-50"></div> 

      </div>

      <div className="relative z-10 max-w-3xl">

        <motion.h1

          initial={{ opacity: 0, x: -20 }}

          whileInView={{ opacity: 1, x: 0 }}

          transition={{ delay: 0.2, duration: 0.5 }}

          className="text-7xl md:text-8xl font-bold text-emerald-700"

          style={{ marginLeft: '3rem' }} 

        >

          About Us

        </motion.h1>

        <motion.p

          initial={{ opacity: 0, x: -20 }}

          whileInView={{ opacity: 1, x: 0 }}

          transition={{ delay: 0.4, duration: 0.5 }}

          className="text-xl md:text-2xl text-emerald-900 mt-6 font-serif"

          style={{ marginLeft: '3rem' }}

        >

          Discover the heart of local experiences with GoLocal Guide. 

        </motion.p>

      </div>

    </motion.section>

  );

};


export default HeroAbout;