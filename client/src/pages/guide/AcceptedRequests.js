import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockTourRequests } from '../../mockData/tourRequests'; // Mock data for now
import Sidebar from '../../components/guide/Sidebar';
import ChatBox from '../../components/guide/TourRequests/ChatBox';

const AcceptedRequests = () => {
  const { id } = useParams();
  const [requestDetails, setRequestDetails] = useState(null);

  useEffect(() => {
    // Fetch request details based on ID (mock)
    const request = mockTourRequests.find((req) => req.id === parseInt(id));
    setRequestDetails(request);
  }, [id]);

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 bg-gradient-to-b from-blue-50 to-indigo-100 p-8">
        {requestDetails ? (
          <>
            <h2 className="text-3xl font-semibold text-blue-800 mb-6">Tour Request Details</h2>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-2xl font-semibold">{requestDetails.touristName}</h3>
              <p className="text-lg text-gray-700">Requested Area: {requestDetails.area}</p>
              <p className="text-lg text-gray-600">Tour Date: {new Date(requestDetails.date).toLocaleDateString()}</p>
              <p className="mt-4">{requestDetails.description}</p>
            </div>

            <ChatBox user={requestDetails.touristName} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AcceptedRequests;
