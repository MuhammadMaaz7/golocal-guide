import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Sidebar from '../../components/guide/Sidebar';
import DashboardHeader from '../../components/guide/Dashboard/DashboardHeader';
import ChartComponent from '../../components/guide/Dashboard/ChartComponent';
import ProfileCard from '../../components/guide/Dashboard/ProfileCard';
import Bargraph from '../../components/guide/Dashboard/Bargraph';
import GuideInfoCard from '../../components/guide/Dashboard/GuideInfoCard';
import RatingsGraph from '../../components/guide/Dashboard/RatingsGraph';
import { useGuide } from '../../context/GuideContext';
import { useAuth } from '../../context/AuthContext';
import Calendar from '../../components/tourist/Dashboard/Calendar';
// import DoneTrips from '../../components/tourist/DoneTrips';
import UserProfile from '../../components/guide/Dashboard/Userprofile';

const GuideDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);
  const { user } = useAuth();
  const { guideData } = useGuide();

  if (!guideData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 text-xl">Loading dashboard...</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Profile Card */}
          <ProfileCard profileData={guideData} user={user} />

          {/* Guide Info Card */}
          <GuideInfoCard guideInfo={guideData} />
        </div>

        {/* Graphs Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Performance Insights</h3>
          
          {/* Flex container to display graphs side by side */}
          <div className="flex space-x-8">
            <div className="w-2/3">
              <ChartComponent />
            </div>
            <div className="w-2/3">
              <Bargraph />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <AnimatePresence>
        {(showRightSidebar || !isMobile) && (
          <motion.aside
            initial={isMobile ? { x: '100%' } : false}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className={`${
              isMobile ? 'fixed right-0 top-0 bottom-0 w-full sm:w-80 shadow-xl z-50' : 'hidden lg:block w-80'
            } bg-white border-l overflow-y-auto`}
          >
            <div className="p-6">
              {isMobile && (
                <button
                  onClick={() => setShowRightSidebar(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
                >
                  <ChevronRight />
                </button>
              )}
              <UserProfile user={user} />
              <div className="mt-6">
                <Calendar />
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GuideDashboard;
