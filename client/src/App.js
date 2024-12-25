import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GuideProvider } from './context/GuideContext';
import { PackageProvider } from './context/PackageContext'; // Add PackageProvider
import { ExperienceProvider } from './context/ExperienceContext'; // Add ExperienceProvider
import { GuideRequestsProvider } from './context/RequestsContext'; // Correct import
import EditPackage from './components/guide/Packages/EditPackage';

// Pages and Components
import HomePage from './pages/common/HomePage';
import SignupPage from './pages/common/SignupPage';
import LoginPage from './pages/common/LoginPage';
import AboutPage from './pages/common/AboutPage';
import ContactPage from './pages/common/ContactPage';


import TouristDashboard from './pages/tourist/TouristDashboard';
import GuideDashboard from './pages/guide/GuideDashboard';
import BusinessDashboard from './pages/business/BusinessDashboard';
import Discover from './pages/tourist/DiscoverPage';
import BookingPage from './pages/tourist/BookingPage';
import UpdateProfile from './pages/tourist/UpdateProfile'; // Import the new BookingPage

import GuideProfile from './pages/guide/GuideProfile';
import MyPackagesPage from './pages/guide/MyPackagesPage';
import AddPackageForm from './components/guide/Packages/AddPackageForm';
import PackageCard from './components/guide/Packages/PackageCard';

import TourRequests from './pages/guide/TourRequests';
import AcceptedRequests from './pages/guide/AcceptedRequests';
import ChatBox from './components/guide/TourRequests/ChatBox';

import GuideExperiencePage from './pages/guide/ExperiencesPage';
import AddExperienceForm from './components/guide/Experiences/AddExperienceForm';

import SetupProfilePage from './pages/business/SetupProfilePage';
import ServicesDashboard from './pages/business/ServicesDashboard';
import BookingDashboard from './pages/business/BookingDashboard';
import ReviewDashboard from './pages/business/ReviewDashboard';
import EditProfile from './pages/business/EditProfile';
import Payment from './pages/business/Payment';
import AddServiceScreen from './components/business/services/AddServiceScreen';


const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  if (user.role === 'Business Owner' && !user.isProfileComplete) {
    return <Navigate to="/setup-profile" replace />;
  }

  return children;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/add-service" element={<AddServiceScreen />} />
      

      {/* Tourist Routes */}
      <Route 
        path="/tourist-dashboard"
        element={
          <ProtectedRoute allowedRoles={['Tourist']}>
            <TouristDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/discover" 
        element={
          <ProtectedRoute allowedRoles={['Tourist']}>
            <Discover />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/booking" 
        element={
          <ProtectedRoute allowedRoles={['Tourist']}>
            <BookingPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/tourist/profile/update" 
        element={
          <ProtectedRoute allowedRoles={['Tourist']}>
            <UpdateProfile />
          </ProtectedRoute>
        } 
      />
      

      {/* Guide Routes */}
      <Route 
        path="/guide-dashboard" 
        element={(
          <ProtectedRoute allowedRoles={['Guide']}>
            <GuideDashboard />
          </ProtectedRoute>
        )} 
      />
      <Route 
        path="/profile" 
        element={(
          <ProtectedRoute allowedRoles={['Guide']}>
            <GuideProfile />
          </ProtectedRoute>
        )} 
      />
      <Route 
        path="/my-packages" 
        element={(
          <ProtectedRoute allowedRoles={['Guide']}>
            <MyPackagesPage />
          </ProtectedRoute>
        )} 
      />
      <Route path="/edit-package/:id" 
        element={(
          <ProtectedRoute allowedRoles={['Guide']}>
            <EditPackage />
          </ProtectedRoute>
        )} 
        />
      <Route 
        path="/add-package" 
        element={(
          <ProtectedRoute allowedRoles={['Guide']}>
            <AddPackageForm />
          </ProtectedRoute>
        )} 
      />
      <Route 
        path="/tour-requests" 
        element={(
          <ProtectedRoute allowedRoles={['Guide']}>
            <TourRequests />
          </ProtectedRoute>
        )} 
      />
      <Route 
        path="/accepted-requests/:id" 
        element={(
          <ProtectedRoute allowedRoles={['Guide', 'Tourist']}>
            <AcceptedRequests />
          </ProtectedRoute>
        )} 
      />
      <Route 
        path="/chat/:id" 
        element={(
          <ProtectedRoute allowedRoles={['Guide', 'Tourist']}>
            <ChatBox />
          </ProtectedRoute>
        )} 
      />
      <Route 
        path="/experiences" 
        element={(
          <ProtectedRoute allowedRoles={['Guide']}>
            <GuideExperiencePage />
          </ProtectedRoute>
        )} 
      />
      <Route 
        path="/add-experience" 
        element={(
          <ProtectedRoute allowedRoles={['Guide']}>
            <AddExperienceForm />
          </ProtectedRoute>
        )} 
      />
      <Route 
        path="/dashboard" 
        element={(
          <ProtectedRoute>
            <Navigate to="/guide-dashboard" /> {/ Default redirect to guide dashboard */}
          </ProtectedRoute>
        )}
      />
      <Route 
        path="/setup-profile" 
        element={
          <ProtectedRoute allowedRoles={['Business Owner']}>
            <SetupProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/manage-services" 
        element={
            <ServicesDashboard />
        } 
      />
      <Route 
        path="/manage-bookings" 
        element={
            <BookingDashboard />
        } 
      />
      <Route 
        path="/manage-reviews" 
        element={
            <ReviewDashboard />
        } 
      />
      <Route 
        path="/edit-profile" 
        element={
            <EditProfile />
        } 
      />
      <Route 
        path="/edit-payment-methods" 
        element={
            <Payment />
        } 
      />
      <Route
        path="/my-packages" 
        element={(
          <ProtectedRoute allowedRoles={['Guide']}>
            <MyPackagesPage />
          </ProtectedRoute>
        )} 
      />
      <Route 
        path="/add-package" 
        element={(
          <ProtectedRoute allowedRoles={['Guide']}>
            <AddPackageForm />
          </ProtectedRoute>
        )} 
      />

      {/* Tour Requests Routes */}
      <Route 
        path="/tour-requests" 
        element={(
          <ProtectedRoute allowedRoles={['Guide']}>
            <TourRequests />
          </ProtectedRoute>
        )} 
      />

      {/* Accepted Requests Route */}
      <Route 
        path="/accepted-requests/:id" 
        element={(
          <ProtectedRoute allowedRoles={['Guide', 'Tourist']}>
            <AcceptedRequests />
          </ProtectedRoute>
        )} 
      />

      {/* Chatbox Route */}
      <Route 
        path="/chat/:id" 
        element={(
          <ProtectedRoute allowedRoles={['Guide', 'Tourist']}>
            <ChatBox />
          </ProtectedRoute>
        )} 
      />

      {/* Guide Experience Routes */}
      <Route 
        path="/experiences" 
        element={(
          <ProtectedRoute allowedRoles={['Guide']}>
            <GuideExperiencePage />
          </ProtectedRoute>
        )} 
      />
      <Route 
        path="/add-experience" 
        element={(
          <ProtectedRoute allowedRoles={['Guide']}>
            <AddExperienceForm />
          </ProtectedRoute>
        )} 
      />

      {/* Redirect Based on Role */}
      <Route 
        path="/dashboard" 
        element={(
          <ProtectedRoute>
            <Navigate to="/guide-dashboard" />
          </ProtectedRoute>
        )}
      />

<Route 
        path="/business-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['Business Owner']}>
            <BusinessDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/setup-profile" 
        element={
          <ProtectedRoute allowedRoles={['Business Owner']}>
            <SetupProfilePage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/manage-services" 
        element={
          <ProtectedRoute allowedRoles={['Business Owner']}>
            <ServicesDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/manage-bookings" 
        element={
          <ProtectedRoute allowedRoles={['Business Owner']}>
            <BookingDashboard />
            </ProtectedRoute>
        } 
      />
      <Route 
        path="/manage-reviews" 
        element={
          <ProtectedRoute allowedRoles={['Business Owner']}>
            <ReviewDashboard />
            </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute allowedRoles={['Business Owner']}>
            <EditProfile />
            </ProtectedRoute>
        } 
      />
      <Route 
        path="/edit-payment-methods" 
        element={
          <ProtectedRoute allowedRoles={['Business Owner']}>
            <Payment />
            </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
    <GuideProvider>
      <PackageProvider>
        <ExperienceProvider>
          <GuideRequestsProvider> {/* Use the correct provider */}
            <Router>
              <AppRoutes />
            </Router>
          </GuideRequestsProvider>
        </ExperienceProvider>
      </PackageProvider>
    </GuideProvider>
  </AuthProvider>

  );
}

export default App;