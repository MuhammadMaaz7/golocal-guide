import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePackage } from './PackageContext'; // Import the context hook

const AddPackageForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { packages, fetchPackages, addPackage, updatePackage } = usePackage(); // Use context functions

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    availableDates: [],
    includedServices: [],
  });

  const [errors, setErrors] = useState({});

  // Fetch existing package details for editing
  useEffect(() => {
    if (id) {
      const existingPackage = packages.find((pkg) => pkg._id === id); // Find the package by ID
      if (existingPackage) {
        setFormData({
          title: existingPackage.title || '',
          description: existingPackage.description || '',
          price: existingPackage.price || '',
          availableDates: existingPackage.availableDates || [],
          includedServices: existingPackage.includedServices || [],
        });
      } else {
        // Fetch packages if they are not already loaded
        fetchPackages();
      }
    }
  }, [id, packages, fetchPackages]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleServiceChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      includedServices: value.split(','),
    });
  };

  const handleDateChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      availableDates: value.split(',').map((date) => new Date(date).toISOString()),
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be a positive number';
    if (!formData.availableDates.length) newErrors.availableDates = 'At least one available date is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      if (id) {
        // Update existing package
        await updatePackage(id, formData);
      } else {
        // Add a new package
        await addPackage(formData);
      }
      navigate('/my-packages');
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">
        {id ? 'Edit Package' : 'Add New Package'}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm text-gray-700" htmlFor="title">Package Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md text-gray-700"
            placeholder="Package Title"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md text-gray-700"
            placeholder="Package Description"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700" htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md text-gray-700"
            placeholder="Price"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700" htmlFor="availableDates">Available Dates (comma separated)</label>
          <input
            type="text"
            id="availableDates"
            name="availableDates"
            value={formData.availableDates.join(',')}
            onChange={handleDateChange}
            className="w-full p-2 mt-1 border rounded-md text-gray-700"
            placeholder="e.g., 2024-12-01, 2024-12-02"
          />
          {errors.availableDates && <p className="text-red-500 text-sm mt-1">{errors.availableDates}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700" htmlFor="includedServices">Included Services (comma separated)</label>
          <input
            type="text"
            id="includedServices"
            name="includedServices"
            value={formData.includedServices.join(',')}
            onChange={handleServiceChange}
            className="w-full p-2 mt-1 border rounded-md text-gray-700"
            placeholder="e.g., meals, transport"
          />
        </div>

        <button type="submit" className="w-full bg-blue-800 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300">
          {id ? 'Update Package' : 'Add Package'}
        </button>
      </form>
    </div>
  );
};

export default AddPackageForm;
