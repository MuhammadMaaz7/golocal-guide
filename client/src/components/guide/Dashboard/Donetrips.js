import React from 'react';
import { motion } from 'framer-motion';

export function DoneTrips({ trips }) {
  return (
    <div className="mt-6">
      <h3 className="font-bold mb-4">Done Trips</h3>
      <div className="space-y-4">
        {trips.map((trip) => (
          <motion.div
            key={trip.id}
            whileHover={{ x: 5 }}
            className="flex items-center gap-4"
          >
            <img
              src={trip.image}
              alt={trip.name}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-semibold">{trip.name}</h4>
              <p className="text-sm text-gray-500">{trip.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

