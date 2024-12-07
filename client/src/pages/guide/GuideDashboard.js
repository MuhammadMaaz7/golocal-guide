import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the navigate hook
import Sidebar from '../../components/guide/Sidebar';
import DashboardHeader from '../../components/guide/Dashboard/DashboardHeader';
import ProfileCard from '../../components/guide/Dashboard/ProfileCard';
import GuideInfoCard from '../../components/guide/Dashboard/GuideInfoCard';
import RatingsGraph from '../../components/guide/Dashboard/RatingsGraph';
import axios from 'axios';

const GuideDashboard = () => {
  const [guideData, setGuideData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    const fetchGuideData = async () => {
      try {
        console.log('Fetching guide data...');
        const response = await axios.get('http://localhost:5000/api/guide/profile');
        console.log('Fetched guide data:', response.data); // Log the data here

        // If response is valid, set the data
        if (response.data && response.data.name) {
          setGuideData(response.data);
        } else {
          setError('No data found'); // Handle empty data response
        }
      } catch (error) {
        console.error('Error fetching guide data:', error);
        setError('Failed to fetch guide data');
      } finally {
        setLoading(false);
      }
    };

    fetchGuideData();
  }, []); // Fetch data once on mount

  // Redirect if there's an error or the data is missing
  useEffect(() => {
    if (error) {
      // Navigate to a different route, for example, an error page
      navigate('/error'); 
    }
  }, [error, navigate]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading dashboard...</p>
      </div>
    );
  }

  // If there's no guide data, show an error message
  if (!guideData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>No guide data available.</p>
      </div>
    );
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-indigo-100 p-8">
        {/* Header */}
        <DashboardHeader guideName={guideData.name} />

        {/* Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Profile Card */}
          <ProfileCard profileData={guideData} />

          {/* Guide Info Card */}
          <GuideInfoCard guideInfo={guideData} />
        </div>

        {/* Graphs Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Performance Insights</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Ratings Graph */}
            <RatingsGraph
              rating={guideData.rating}
              totalReviews={guideData.totalReviews}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideDashboard;
