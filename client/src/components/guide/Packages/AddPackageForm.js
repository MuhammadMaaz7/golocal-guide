import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddPackageForm = ({ packageId }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    title: '',
    city: '',
    price: '',
    availableDates: [],
    includedServices: [],
  });

  const [errors, setErrors] = useState({});

  // Fetch package details for editing
  useEffect(() => {
    console.log("In add package form id: ", id);
    if (id) {
      console.log("Id means edit");
      // Replace with your API endpoint
      fetch(`http://localhost:3000/api/packages/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("data: ", data);
        setFormData({
          title: data.title || '',
          city: data.city || '',
          price: data.price || '',
          availableDates: data.availableDates || [],
          includedServices: data.includedServices || [],
        });
      })
      .catch((err) => console.error('Error fetching package:', err));
    
    }
  }, [id]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Submit form (call an API or similar)
      if (id) {
        // Update existing package
        fetch(`/api/packages/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then(() => navigate('/my-packages'))
          .catch((err) => console.error('Error updating package:', err));
      } else {
        // Create new package
        fetch('/api/packages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
          .then((res) => res.json())
          .then(() => navigate('/my-packages'))
          .catch((err) => console.error('Error adding package:', err));
      }
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
          <label className="block text-sm text-gray-700" htmlFor="city">City</label>
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
