import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import axios from 'axios';

const AddService = ({ isOpen, onClose, businessType, onServiceAdded }) => {
  const [formData, setFormData] = useState({});
  const [images, setImage] = useState([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
  const { name, value, type, checked } = e.target;

  if (type === 'checkbox') {
    setFormData(prevData => {
      const amenities = prevData.amenities || [];
      if (checked) {
        // Add the name of the amenity if it's checked
        amenities.push(value);
      } else {
        // Remove the amenity if it's unchecked
        const index = amenities.indexOf(value);
        if (index !== -1) {
          amenities.splice(index, 1);
        }
      }
      return {
        ...prevData,
        amenities: amenities
      };
    });
  } else {
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  }
};


  const handleImageChange = (e) => {
    setImage([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (Array.isArray(formData[key])) {
          formData[key].forEach(value => formDataToSend.append(key, value));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      images.forEach((image, index) => {
        formDataToSend.append('images', image);
      });

      const response = await axios.post('http://localhost:5000/api/manage-services', formDataToSend, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
      });
      onServiceAdded(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding service:', error.response ? error.response.data : error.message);
    }
  };

  const renderFields = () => {
    if (businessType === 'hotel') {
      return (
        <>
          <input
            type="text"
            name="name"
            placeholder="Room Name"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Room Description"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          ></textarea>
          <input
            type="number"
            name="price"
            placeholder="Price per Night"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <div className="flex gap-4 mb-4">
            <input
              type="number"
              name="capacity.adults"
              placeholder="Adult Capacity"
              onChange={handleChange}
              className="w-1/2 p-2 border rounded"
              required
            />
            <input
              type="number"
              name="capacity.children"
              placeholder="Child Capacity"
              onChange={handleChange}
              className="w-1/2 p-2 border rounded"
            />
          </div>
          <select
            name="bedType"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          >
            <option value="">Select Bed Type</option>
            <option value="Single">Single</option>
            <option value="Double">Double</option>
            <option value="Queen">Queen</option>
            <option value="King">King</option>
            <option value="Twin">Twin</option>
          </select>
          <input
            type="number"
            name="roomSize"
            placeholder="Room Size (sq ft)"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />
          <select
            name="viewType"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select View Type</option>
            <option value="City View">City View</option>
            <option value="Ocean View">Ocean View</option>
            <option value="Garden View">Garden View</option>
            <option value="Mountain View">Mountain View</option>
            <option value="No View">No View</option>
          </select>
          <div className="mb-4">
            <p className="mb-2 font-semibold">Amenities:</p>
            {['Wi-Fi', 'TV', 'Air Conditioning', 'Mini Bar', 'Room Service', 'Safe', 'Hair Dryer', 'Iron', 'Coffee Maker'].map((amenity) => (
              <label key={amenity} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name="amenities"
                  value={amenity}
                  onChange={handleChange}
                  className="mr-2"
                />
                {amenity}
              </label>
            ))}
          </div>
        </>
      );
    } else if (businessType === 'restaurant') {
      return (
        <>
          <input
            type="text"
            name="name"
            placeholder="Dish Name"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Dish Description"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          ></textarea>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <select
            name="category"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          >
            <option value="">Select Category</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
            <option value="Side Dish">Side Dish</option>
          </select>
          <input
            type="text"
            name="cuisine"
            placeholder="Cuisine"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
            required
          />
          <input
            type="text"
            name="ingredients"
            placeholder="Ingredients (comma-separated)"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="text"
            name="allergens"
            placeholder="Allergens (comma-separated)"
            onChange={handleChange}
            className="w-full p-2 mb-4 border rounded"
          />
          <div className="flex gap-4 mb-4">
            <input
              type="number"
              name="preparationTime"
              placeholder="Prep Time (min)"
              onChange={handleChange}
              className="w-1/2 p-2 border rounded"
            />
            <input
              type="number"
              name="spicyLevel"
              placeholder="Spicy Level (0-5)"
              onChange={handleChange}
              className="w-1/2 p-2 border rounded"
              min="0"
              max="5"
            />
          </div>
          <div className="flex gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isVegetarian"
                onChange={handleChange}
                className="mr-2"
              />
              Vegetarian
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isVegan"
                onChange={handleChange}
                className="mr-2"
              />
              Vegan
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isGlutenFree"
                onChange={handleChange}
                className="mr-2"
              />
              Gluten-Free
            </label>
          </div>
        </>
      );
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-black opacity-50 backdrop-blur-sm"></div>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative bg-white rounded-lg p-8 max-w-lg w-full m-4 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Service</h2>
            <form onSubmit={handleSubmit}>
              {renderFields()}
              <div className="mb-4">
                <label htmlFor="image-upload" className="block mb-2 font-semibold">
                  Upload Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input
                      id="image-upload"
                      type="file"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-600 text-white py-2 px-4 rounded hover:bg-emerald-700 transition-colors"
              >
                Add Service
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddService;

