import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { usePackage } from '../../../context/PackageContext';

const EditPackageForm = () => {
  const { id } = useParams(); // Get the package ID from the URL
  const navigate = useNavigate();
  const { getPackageById, updatePackage } = usePackage(); // Use custom hook to access context methods

  const [formData, setFormData] = useState({
    title: '',
    city: '',
    price: '',
    availableDates: [],
    includedServices: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch the package details when the component loads
    const fetchPackageData = async () => {
      try {
        const packageData = await getPackageById(id);
        if (packageData) {
          setFormData({
            ...packageData,
            availableDates: packageData.availableDates.join(', '),
            includedServices: packageData.includedServices.join(', '),
          });
        }
      } catch (error) {
        console.error('Error fetching package data:', error);
      }
    };
    fetchPackageData();
  }, [id, getPackageById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.price || formData.price <= 0) newErrors.price = 'Price must be a positive number';
    if (!formData.availableDates.trim()) newErrors.availableDates = 'At least one available date is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await updatePackage(id, {
          ...formData,
          availableDates: formData.availableDates.split(',').map((date) => new Date(date.trim()).toISOString()),
          includedServices: formData.includedServices.split(',').map((service) => service.trim()),
        });
        navigate('/my-packages');
      } catch (error) {
        console.error('Error updating package:', error);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-semibold text-center text-blue-800 mb-6">Edit Package</h2>
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
          <label className="block text-sm text-gray-700" htmlFor="=city">City</label>
          <textarea
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md text-gray-700"
            placeholder="Package City"
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
            value={formData.availableDates}
            onChange={handleInputChange}
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
            value={formData.includedServices}
            onChange={handleInputChange}
            className="w-full p-2 mt-1 border rounded-md text-gray-700"
            placeholder="e.g., meals, transport"
          />
        </div>

        <button type="submit" className="w-full bg-blue-800 text-white p-3 rounded-md hover:bg-blue-700 transition duration-300">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPackageForm;
