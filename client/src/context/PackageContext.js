import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const PackageContext = createContext();

// Hook to use the PackageContext
export const usePackage = () => useContext(PackageContext);

export const PackageProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Base URL for the API
  const BASE_URL = 'http://localhost:5000/api/packages';
  console.log("Fetching packages");
  // Helper function to get the token from localStorage
  const getToken = () => {
    const token = localStorage.getItem('token');
    console.log("Token in packages");

    if (!token) {
      console.error('No token found');
      setError('Authentication failed: No token found');
    }
    return token;
  };

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/packages');
      console.log('Fetched packages:', response.data); // Log the response data
      setPackages(response.data);
      // Handle response data here
    } catch (error) {
      // Log more details about the error
      console.error('Error fetching packages:', error.message);
      console.error('Error details:', error.response?.data || error.response);
      // Handle error in state or UI
    }
  };
  
  // Add a new package
  const addPackage = async (newPackage) => {
    try {
      console.log('Adding new package...');
      
      const token = getToken();
      if (!token) return;
      console.log('Token in addpackages: ');

      const response = await axios.post('http://localhost:5000/api/packages', newPackage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Package added:', response.data);
      setPackages((prev) => [...prev, response.data]);
      setLoading(false);
    } catch (err) {
      console.error('Error adding package:', err);
      setError(`Error adding package: ${err.message}`);
    }
  };

  // Update a package
  const updatePackage = async (id, updatedPackage) => {
    try {
      console.log('Updating package with ID:', id);

      const token = getToken();
      if (!token) return;

      const response = await axios.put(`${BASE_URL}/${id}`, updatedPackage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Package updated:', response.data);
      setPackages((prev) =>
        prev.map((pkg) => (pkg._id === id ? response.data : pkg)) // Changed id to _id
      );
    } catch (err) {
      console.error('Error updating package:', err);
      setError(`Error updating package: ${err.message}`);
    }
  };

  // Delete a package
  const deletePackage = async (id) => {
    try {
      console.log('Deleting package with ID:', id);

      const token = getToken();
      if (!token) return;
      console.log("Token present too");
      await axios.delete(`${BASE_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Package deleted with ID:', id);
      setPackages((prev) => prev.filter((pkg) => pkg._id !== id)); // Changed id to _id
    } catch (err) {
      console.error('Error deleting package:', err);
      setError(`Error deleting package: ${err.message}`);
    }
  };

  // Effect to fetch packages on mount
  useEffect(() => {
    console.log('Component mounted, fetching packages...');
    fetchPackages();
  }, []);

  return (
    <PackageContext.Provider
      value={{
        packages,
        loading,
        error,
        fetchPackages,
        addPackage,
        updatePackage,
        deletePackage,
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};
