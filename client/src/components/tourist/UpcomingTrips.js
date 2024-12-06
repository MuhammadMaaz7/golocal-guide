import React from 'react';

export default function UpcomingTrips() {
  const upcomingTrips = [
    {
      id: 1,
      destination: 'Bali, Indonesia',
      dates: 'Dec 15 - Dec 22',
      image: '/placeholder.svg?height=100&width=200'
    },
    {
      id: 2,
      destination: 'Phuket, Thailand',
      dates: 'Jan 10 - Jan 17',
      image: '/placeholder.svg?height=100&width=200'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm mb-8">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Upcoming Trips</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          {upcomingTrips.map(trip => (
            <div key={trip.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <img src={trip.image} alt={trip.destination} className="w-20 h-20 rounded-lg object-cover" />
              <div>
                <h3 className="font-medium">{trip.destination}</h3>
                <p className="text-sm text-gray-600">{trip.dates}</p>
                <button className="text-teal-600 hover:underline mt-1">View Details</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

