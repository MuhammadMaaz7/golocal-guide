import { motion } from 'framer-motion';

import { User } from 'lucide-react';

import React from 'react';


const Team = () => {

  return (

    <div className="py-16 bg-white">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">

          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">

            Meet the passionate individuals behind GoLocal Guide

          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <motion.div

            initial={{ opacity: 0 }}

            whileInView={{ opacity: 1 }}

          >

            <TeamMember 

              name="Maaz"

              role="Founder & CEO"

              iconSrc="images/man.png" 

            />

          </motion.div>

          <motion.div

            initial={{ opacity: 0 }}

            whileInView={{ opacity: 1 }}

          >

            <TeamMember 

              name="Hafsa Suleman"

              role="Head of Operations"

              iconSrc="images/girl.png" 

            />

          </motion.div>

          <motion.div

            initial={{ opacity: 0 }}

            whileInView={{ opacity: 1 }}

          >

            <TeamMember 

              name="Aysha Hashmi"

              role="Community Manager"

              iconSrc="images/girl2.png" 

            />

          </motion.div>

        </div>

      </div>

    </div>

  );

};


const TeamMember = ({ name, role, iconSrc }) => {

  return (

    <div className="flex flex-col items-center">

      <div className="w-48 h-48 rounded-full bg-emerald-100 flex items-center justify-center mb-4">

        {iconSrc ? (

          <img src={iconSrc} alt="Team member icon" className="w-24 h-24 rounded-full" />

        ) : (

          <User className="w-24 h-24 text-emerald-600" />

        )}

      </div>

      <h3 className="text-xl font-semibold text-gray-900">{name}</h3>

      <p className="text-gray-600">{role}</p>

    </div>

  );

};


export default Team;