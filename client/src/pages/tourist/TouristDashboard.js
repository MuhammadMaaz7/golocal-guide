import React from 'react';
import Header from '../../components/tourist/Header';
import Sidebar from '../../components/tourist/Sidebar';
import WelcomeSection from '../../components/tourist/WelcomeSection';
import QuickActions from '../../components/tourist/QuickActions';
import UpcomingTrips from '../../components/tourist/UpcomingTrips';
import RecommendedDestinations from '../../components/tourist/RecommendedDestinations';
import ItineraryPlanner from '../../components/tourist/ItineraryPlanner';
// import BookingManager from '../../components/tourist/BookingManager';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <WelcomeSection />
          <QuickActions />
          <div className="grid grid-cols-2 gap-6">
            <div>
              <UpcomingTrips />
              {/* <ItineraryPlanner /> */}
            </div>
            <div>
              <RecommendedDestinations />
              {/* <BookingManager /> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

