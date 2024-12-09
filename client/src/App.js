import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';

import TouristDashboard from './pages/tourist/TouristDashboard';
import GuideDashboard from './pages/guide/GuideDashboard';
import BusinessDashboard from './pages/business/BusinessDashboard';

import SetupProfilePage from './pages/business/SetupProfilePage';
import ServicesDashboard from './pages/business/ServicesDashboard';
import BookingDashboard from './pages/business/BookingDashboard';
import ReviewDashboard from './pages/business/ReviewDashboard';
import EditProfile from './pages/business/EditProfile';
import Payment from './pages/business/Payment';
import AddServiceScreen from './components/business/services/AddServiceScreen';
import Discover from './pages/tourist/DiscoverPage';
import BookingPage from './pages/tourist/BookingPage'; 

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
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/add-service" element={<AddServiceScreen />} />
        
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
        path="/guide-dashboard" 
        element={
          <ProtectedRoute allowedRoles={['Guide']}>
            <GuideDashboard />
          </ProtectedRoute>
        } 
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
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            {({ user }) => {
              switch (user.role) {
                case 'Tourist':
                  return <Navigate to="/tourist-dashboard" replace />;
                case 'Guide':
                  return <Navigate to="/guide-dashboard" replace />;
                case 'Business Owner':
                  return <Navigate to="/business-dashboard" replace />;
                default:
                  return <Navigate to="/" replace />;
              }
            }}
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;

