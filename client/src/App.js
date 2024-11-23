import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';

// Placeholder components for other routes
const TouristPage = () => <div>Tourist Page</div>;
const GuidePage = () => <div>Guide Page</div>;
const BusinessPage = () => <div>Business Page</div>;
const LoginPage = () => <div>Login Page</div>;
const SignupPage = () => <div>Sign Up Page</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tourist" element={<TouristPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/business" element={<BusinessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;