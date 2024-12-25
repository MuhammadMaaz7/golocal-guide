import { motion } from 'framer-motion';

import { Globe, Target, Users } from 'lucide-react';

import React from 'react';


const Mission = () => {

  return (

    <div className="py-16 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">

            Creating meaningful connections between travelers and local communities

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <motion.div

            initial={{ opacity: 0 }}

            whileInView={{ opacity: 1 }}

            transition={{ delay: 0.3, duration: 0.5 }}

          >

            <MissionCard 

              icon={<Target className="h-8 w-8 text-emerald-600" />}

              title="Purpose"

              description="To revolutionize travel by making local experiences accessible and authentic"

            />

          </motion.div>

          <motion.div

            initial={{ opacity: 0 }}

            whileInView={{ opacity: 1 }}

            transition={{ delay: 0.4, duration: 0.5 }}

          >

            <MissionCard 

              icon={<Users className="h-8 w-8 text-emerald-600" />}

              title="Community"

              description="Building bridges between travelers and local communities worldwide"

            />

          </motion.div>

          <motion.div

            initial={{ opacity: 0 }}

            whileInView={{ opacity: 1 }}

            transition={{ delay: 0.5, duration: 0.5 }}

          >

            <MissionCard 

              icon={<Globe className="h-8 w-8 text-emerald-600" />}

              title="Impact"

              description="Supporting sustainable tourism and local economic growth"

            />

          </motion.div>

        </div>

      </div>

    </div>

  );

};


const MissionCard = ({ icon, title, description }) => {

  return (

    <div className="p-6 bg-gray-50 rounded-lg hover:shadow-lg transition-shadow">

      <div className="flex flex-col items-center text-center">

        {icon}

        <h3 className="mt-4 text-xl font-semibold text-gray-900">{title}</h3>

        <p className="mt-2 text-gray-600">{description}</p>

      </div>

    </div>

  );

};


export default Mission;