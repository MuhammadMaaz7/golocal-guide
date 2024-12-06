import React from 'react';
import { MapPin, Star } from 'lucide-react';

export default function RecommendedDestinations() {
  const recommendations = [
    {
      id: 1,
      name: 'Phi Phi Islands',
      location: 'Thailand',
      rating: 4.8,
      image: '/placeholder.svg?height=200&width=300'
    },
    {
      id: 2,
      name: 'Ubud Rice Terraces',
      location: 'Bali',
      rating: 4.9,
      image: '/placeholder.svg?height=200&width=300'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold">Recommended for You</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {recommendations.map(place => (
            <div key={place.id} className="group cursor-pointer">
              <div className="relative rounded-lg overflow-hidden">
                <img src={place.image} alt={place.name} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-semibold text-lg">{place.name}</h3>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{place.location}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm">{place.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

