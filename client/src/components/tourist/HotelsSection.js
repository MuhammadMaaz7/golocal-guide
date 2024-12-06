import React from 'react';
import { Star } from 'lucide-react';

const hotels = [
  {
    id: 1,
    name: "The Blue Paradise",
    location: "Iceland",
    image: "/placeholder.svg?height=200&width=300",
    days: "3-4 Days",
    rating: 4.5
  },
  {
    id: 2,
    name: "Royal Museum",
    location: "Ahmedabad",
    image: "/placeholder.svg?height=200&width=300",
    days: "5-7 Days",
    rating: 4.5
  },
  {
    id: 3,
    name: "Harboin Jamaica",
    location: "Paradise",
    image: "/placeholder.svg?height=200&width=300",
    days: "2-4 Days",
    rating: 4.5
  }
];

export const HotelsSection = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Hotels</h2>
        <div className="flex gap-4">
          <button className="text-emerald-600 font-medium">Most Popular</button>
          <button className="text-gray-400">Best Price</button>
          <button className="text-gray-400">Near Me</button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold mb-1">{hotel.name}</h3>
              <p className="text-gray-600 text-sm">{hotel.location}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm text-gray-500">{hotel.days}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{hotel.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

