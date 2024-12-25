import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, X, Plus, ImageIcon } from 'lucide-react';

const AddPackageForm = ({ 
  initialData = {
    title: '',
    city: '',
    price: '',
    availableDates: [],
    includedServices: [],
    imageUrl: ''
  },
  onSubmit,
  onCancel 
}) => {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const [date, setDate] = useState('');

  const serviceOptions = [
    'Meals', 'Transport', 'Guide', 'Snacks', 'Wifi', 'Parking', 'Photography'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddDate = () => {
    if (!date) {
      setErrors(prev => ({
        ...prev,
        dates: 'Date cannot be empty'
      }));
      return;
    }
    if (formData.availableDates.includes(date)) {
      setErrors(prev => ({
        ...prev,
        dates: 'Date is already added'
      }));
      return;
    }
    setFormData(prev => ({
      ...prev,
      availableDates: [...prev.availableDates, date]
    }));
    setDate('');
  };

  const handleRemoveDate = (dateToRemove) => {
    setFormData(prev => ({
      ...prev,
      availableDates: prev.availableDates.filter(date => date !== dateToRemove)
    }));
  };

  const handleAddService = (service) => {
    if (!formData.includedServices.includes(service)) {
      setFormData(prev => ({
        ...prev,
        includedServices: [...prev.includedServices, service]
      }));
    }
  };

  const handleRemoveService = (service) => {
    setFormData(prev => ({
      ...prev,
      includedServices: prev.includedServices.filter(s => s !== service)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'Price must be a positive number';
    }
    if (formData.availableDates.length === 0) {
      newErrors.dates = 'At least one date is required';
    }
    // if (!formData.imageUrl.trim()) {
    //   newErrors.imageUrl = 'Image URL is required';
    // } else if (!/^https?:\/\/.*\.(jpeg|jpg|png|webp|svg)$/.test(formData.imageUrl)) {
    //   newErrors.imageUrl = 'Invalid image URL format';
    // }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-semibold mb-6">{initialData.title ? 'Edit Package' : 'Add New Package'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Package Title</label>
            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter package title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <textarea
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 ${errors.city ? 'border-red-500' : ''}`}
              placeholder="Enter city description"
              rows="3"
            />
            {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              id="price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 ${errors.price ? 'border-red-500' : ''}`}
              placeholder="Enter price"
            />
            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Available Dates</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
              <button
                type="button"
                onClick={handleAddDate}
                className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.availableDates.map((date, index) => (
                <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                  {date}
                  <button
                    type="button"
                    onClick={() => handleRemoveDate(date)}
                    className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-emerald-400 hover:bg-emerald-200 hover:text-emerald-500 focus:outline-none focus:bg-emerald-500 focus:text-white"
                  >
                    <span className="sr-only">Remove date</span>
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            {errors.dates && <p className="mt-1 text-sm text-red-500">{errors.dates}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Included Services</label>
            <div className="mt-2 flex flex-wrap gap-2">
              {serviceOptions.map((service) => (
                <button
                  key={service}
                  type="button"
                  onClick={() => 
                    formData.includedServices.includes(service) 
                      ? handleRemoveService(service)
                      : handleAddService(service)
                  }
                  className={`inline-flex items-center px-3 py-1.5 border rounded-full text-xs font-medium ${
                    formData.includedServices.includes(service)
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : 'bg-gray-100 text-gray-800 border-gray-200'
                  }`}
                >
                  {service}
                  {formData.includedServices.includes(service) && (
                    <X className="ml-1.5 h-3 w-3" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                name="imageUrl"
                id="imageUrl"
                value={formData.imageUrl}
                onChange={handleInputChange}
                className="flex-1 rounded-none rounded-l-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                placeholder="Enter image URL"
              />
              <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                <ImageIcon className="h-5 w-5" />
              </span>
            </div>
            {errors.imageUrl && <p className="mt-1 text-sm text-red-500">{errors.imageUrl}</p>}
            {formData.imageUrl && !errors.imageUrl && (
              <div className="mt-2 relative w-24 h-24 border rounded">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover rounded"
                  onError={(e) => {
                    e.target.src = "/placeholder.svg?height=96&width=96";
                  }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            {initialData.title ? 'Update Package' : 'Add Package'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddPackageForm;
