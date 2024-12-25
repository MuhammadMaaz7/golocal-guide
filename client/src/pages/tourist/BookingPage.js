'use client'

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../../components/tourist/Dashboard/Sidebar';
import SearchSection from '../../components/tourist/Dashboard/SearchSection';
import GuideCard from '../../components/tourist/Booking/GuideCard';
import HotelCard from '../../components/tourist/Booking/HotelCard';
import RestaurantCard from '../../components/tourist/Booking/RestaurantCard';
import RestaurantBookingPopup from '../../components/tourist/Booking/RestaurantBookingPopup';
import BookGuidePopup from '../../components/tourist/Booking/BookGuidePopup';
import { bookingService } from '../../services/bookingService';
import { destinationService } from '../../services/destinationService';

const BookingPage = () => {
  const [activeTab, setActiveTab] = useState('guides');
  const [selectedItem, setSelectedItem] = useState(null);
  const [bookingType, setBookingType] = useState(null);
  const [destination, setDestination] = useState(null);
  const [guides, setGuides] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const destinationId = params.get('destination');
    if (destinationId) {
      fetchDestinationData(destinationId);
    }
  }, [location]);

  const fetchDestinationData = async (destinationId) => {
    setLoading(true);
    try {
      const data = await bookingService.getDestination(destinationId);
      setDestination(data);

      if (data.guides?.length) {
        const guidesData = await bookingService.getGuides(data.guides);
        setGuides(guidesData);
      }

      if (data.location?.city) {
        const [hotelsData, restaurantsData] = await Promise.all([
          bookingService.getHotelsByCity(data.location.city),
          bookingService.getRestaurantsByCity(data.location.city)
        ]);
        setHotels(hotelsData);
        setRestaurants(restaurantsData);
      }
    } catch (error) {
      console.error('Error fetching destination data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    try {
      const data = await destinationService.getDestinations({ search: searchTerm });
      if (data.length > 0) {
        setDestination(data[0]);
        await fetchDestinationData(data[0]._id);
      } else {
        setDestination(null);
        setGuides([]);
        setHotels([]);
        setRestaurants([]);
      }
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (item, type) => {
    setSelectedItem(item);
    setBookingType(type);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      await bookingService.createBooking(bookingData);
      setSelectedItem(null);
      setBookingType(null);
      // TODO: Show a success message to the user
    } catch (error) {
      console.error('Error creating booking:', error);
      // TODO: Show an error message to the user
    }
  };

  const tabContent = {
    guides: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guides.length > 0 ? (
          guides.map(guide => (
            <GuideCard
              key={guide._id}
              guide={guide}
              onBook={() => handleBook(guide, 'guide')}
            />
          ))
        ) : (
          <p>No guides available for this destination.</p>
        )}
      </div>
    ),
    hotels: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hotels.length > 0 ? (
          hotels.map(hotel => (
            <HotelCard
              key={hotel._id}
              hotel={hotel}
              onBook={() => handleBook(hotel, 'hotel')}
            />
          ))
        ) : (
          <p>No hotels available for this destination.</p>
        )}
      </div>
    ),
    restaurants: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {restaurants.length > 0 ? (
          restaurants.map(restaurant => (
            <RestaurantCard
              key={restaurant._id}
              restaurant={restaurant}
              onBook={() => handleBook(restaurant, 'restaurant')}
            />
          ))
        ) : (
          <p>No restaurants available for this destination.</p>
        )}
      </div>
    ),
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <SearchSection onSearch={handleSearch} />

        <main className="p-6">
          {loading ? (
            <p>Loading...</p>
          ) : destination ? (
            <>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Booking for {destination.name}
                </h1>
                <p className="text-gray-600 mt-1">{destination.location.address}</p>
              </div>

              <div className="mb-6">
                <div className="flex space-x-4 border-b">
                  {['guides', 'hotels', 'restaurants'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 font-medium capitalize transition-colors ${
                        activeTab === tab
                          ? 'text-emerald-600 border-b-2 border-emerald-600'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                {tabContent[activeTab]}
              </div>
            </>
          ) : (
            <p>No destination selected. Use the search to find a destination.</p>
          )}
        </main>

        {selectedItem && bookingType === 'restaurant' && (
          <RestaurantBookingPopup
            restaurant={selectedItem}
            onClose={() => {
              setSelectedItem(null);
              setBookingType(null);
            }}
            onBook={handleBookingSubmit}
          />
        )}
        {selectedItem && bookingType === 'guide' && (
        <BookGuidePopup
          guide={selectedItem}
          onClose={() => {
            setSelectedItem(null);
            setBookingType(null);
          }}
        />
      )}
      </div>
    </div>
  );
};

export default BookingPage;

