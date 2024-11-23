import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';

// Placeholder components for each panel
const TouristPanel = () => <h2>Tourist Panel</h2>;
const GuidePanel = () => <h2>Guide Panel</h2>;
const BusinessPanel = () => <h2>Business Panel</h2>;

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/tourist" element={<TouristPanel />} />
          <Route path="/guide" element={<GuidePanel />} />
          <Route path="/business" element={<BusinessPanel />} />
          <Route path="/" element={<h1>Welcome to GoLocal Guide</h1>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;