import React from 'react';
import { Plane, Umbrella, Calendar, Sun } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    { icon: Plane, title: 'Book Flights' },
    { icon: Umbrella, title: 'Find Hotels' },
    { icon: Calendar, title: 'Plan Itinerary' },
    { icon: Sun, title: 'Activities' },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-8">
      {actions.map((action, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
          <action.icon className="h-8 w-8 text-teal-600 mb-2" />
          <h3 className="font-medium">{action.title}</h3>
        </div>
      ))}
    </div>
  );
}

