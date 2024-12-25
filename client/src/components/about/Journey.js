import { motion } from 'framer-motion';

import { ArrowRight } from 'lucide-react';

import React from 'react';


const Journey = () => {

  return (

    <div className="py-16 bg-emerald-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">

            From idea to reality: The story of GoLocal Guide

          </p>

        </div>

        <div className="space-y-8">

          <motion.div

            initial={{ opacity: 0 }}

            whileInView={{ opacity: 1 }}

            transition={{ delay: 0.3, duration: 0.5 }}

          >

            <JourneyItem 

              year="2021"

              title="The Beginning"

              description="GoLocal Guide was founded with a vision to transform local tourism"

            />

          </motion.div>

          <motion.div

            initial={{ opacity: 0 }}

            whileInView={{ opacity: 1 }}

            transition={{ delay: 0.4, duration: 0.5 }}

          >

            <JourneyItem 

              year="2022"

              title="Growing Community"

              description="Expanded to 50+ cities and built a network of trusted local guides"

            />

          </motion.div>

          <motion.div

            initial={{ opacity: 0 }}

            whileInView={{ opacity: 1 }}

            transition={{ delay: 0.5, duration: 0.5 }}

          >

            <JourneyItem 

              year="2023"

              title="Innovation"

              description="Launched new features to enhance the travel experience"

            />

          </motion.div>

          <motion.div

            initial={{ opacity: 0 }}

            whileInView={{ opacity: 1 }}

            transition={{ delay: 0.6, duration: 0.5 }}

          >

            <JourneyItem 

              year="2024"

              title="Global Impact"

              description="Making a difference in local communities worldwide"

            />

          </motion.div>

        </div>

      </div>

    </div>

  );

};


const JourneyItem = ({ year, title, description }) => {

  return (

    <div className="flex items-start space-x-4">

      <div className="flex-shrink-0 w-24">

        <span className="text-xl font-bold text-emerald-600">{year}</span>

      </div>

      <div className="flex-shrink-0">

        <ArrowRight className="h-6 w-6 text-emerald-600" />

      </div>

      <div>

        <h3 className="text-xl font-semibold text-gray-900">{title}</h3>

        <p className="mt-1 text-gray-600">{description}</p>

      </div>

    </div>

  );

};


export default Journey;