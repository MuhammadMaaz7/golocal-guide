import React, { useState, useEffect } from 'react';
import TourRequestList from '../../components/guide/TourRequests/TourRequestList';
import { mockTourRequests } from '../../mockData/tourRequests'; // Mock data for now
import Sidebar from '../../components/guide/Sidebar';

const TourRequests = () => {
  const [tourRequests, setTourRequests] = useState([]);

  useEffect(() => {
    // Simulate loading tour requests (mock data for now)
    setTourRequests(mockTourRequests);
  }, []);

  const handleAccept = (id) => {
    // Update the status to accepted (mock)
    setTourRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'Accepted' } : request
      )
    );
    alert('Tour request accepted!');
  };

  const handleDecline = (id) => {
    // Update the status to declined (mock)
    setTourRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'Declined' } : request
      )
    );
    alert('Tour request declined!');
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gradient-to-b from-blue-50 to-indigo-100 p-8">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">Tour Requests</h2>

        <TourRequestList
          requests={tourRequests}
          onAccept={handleAccept}
          onDecline={handleDecline}
        />
      </div>
    </div>
  );
};

export default TourRequests;
