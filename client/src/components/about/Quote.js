import { motion } from 'framer-motion';

import React from 'react';


const MissionQuote = () => {

  return (

    <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-white -mb-12">

      <motion.h2

        className="text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-700 mb-12 text-center"

      >

        Together, We're Here To Make A Difference

      </motion.h2>


      <motion.div 

        initial={{ opacity: 0 }}

        whileInView={{ opacity: 1 }}

        transition={{ duration: 1, delay: 0.2 }}

        className="relative bg-emerald-600 py-16 px-4 sm:px-6 lg:px-8 rounded-lg overflow-hidden"

      >

        {/* Stylish Quotation Marks */}

        <div className="absolute left-4 top-4 text-emerald-400 text-[80px] font-serif leading-none opacity-50">

          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="currentColor">

            <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163
 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"/>

          </svg>

        </div>

        <div className="absolute right-4 bottom-4 text-emerald-400 text-[80px] font-serif leading-none opacity-50 transform rotate-180">

          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="currentColor">

            <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163
 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z"/>

          </svg>

        </div>

        

        <div className="relative max-w-4xl mx-auto text-center z-10">

          <motion.p

            initial={{ opacity: 0, y: 20 }}

            whileInView={{ opacity: 1, y: 0 }}

            transition={{ delay: 0.4, duration: 0.8 }}

            className="text-lg sm:text-xl md:text-2xl text-white mb-8 leading-relaxed font-light italic"

          >

            At GoLocal Guide, we are revolutionizing the way people experience local travel.

            We're building bridges between travelers and communities, creating authentic connections

            that transform ordinary trips into extraordinary journeys.

          </motion.p>


          <motion.p

            initial={{ opacity: 0, y: 20 }}

            whileInView={{ opacity: 1, y: 0 }}

            transition={{ delay: 0.6, duration: 0.8 }}

            className="text-lg sm:text-xl md:text-2xl text-white leading-relaxed font-light italic"

          >

            More than just a platform, GoLocal Guide is a committed partner in fostering sustainable tourism.

            We ensure that both travelers and local communities thrive together, creating lasting impacts

            that go beyond just sightseeing. Together, we're redefining the future of travel.

          </motion.p>

        </div>


        {/* Decorative Elements */}

        <div className="absolute left-0 bottom-0 w-32 h-32 bg-emerald-500/10 rounded-full -translate-x-1/2 translate-y-1/2" />

        <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/10 rounded-full translate-x-1/2 -translate-y-1/2" />

      </motion.div>

    </section>

  );

};


export default MissionQuote;