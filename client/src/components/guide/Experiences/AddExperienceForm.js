import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Star, Tag, Image, Video } from 'lucide-react';

const AddExperienceForm = ({ addExperience, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'in-progress',
    location: '',
    rating: 0,
    tags: '',
    images: '',
    videos: ''
  });

  const validateStatus = (startDate, endDate) => {
    const today = new Date();
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && start > today) return 'upcoming';
    if (end && end > today) return start && start > today ? 'upcoming' : 'in-progress';
    return 'completed';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      const updatedStatus = validateStatus(updatedData.startDate, updatedData.endDate);
      return { ...updatedData, status: updatedStatus };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      images: formData.images.split(',').map(img => img.trim()),
      videos: formData.videos.split(',').map(video => video.trim())
    };
    addExperience(submissionData);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-8 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Add New Experience</h2>
      
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="4"
        />
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="flex items-center text-gray-700 mb-2">
              <Calendar size={18} className="mr-2" />
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div className="flex-1">
            <label className="flex items-center text-gray-700 mb-2">
              <Calendar size={18} className="mr-2" />
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="flex items-center text-gray-700 mb-2">
              <MapPin size={18} className="mr-2" />
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex-1">
            <label className="flex items-center text-gray-700 mb-2">
              <Star size={18} className="mr-2" />
              Rating
            </label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rating"
              min="0"
              max="5"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="flex items-center text-gray-700 mb-2">
            <Tag size={18} className="mr-2" />
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="adventure, nature, hiking"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="flex items-center text-gray-700 mb-2">
            <Image size={18} className="mr-2" />
            Image URLs (comma-separated)
          </label>
          <input
            type="text"
            name="images"
            value={formData.images}
            onChange={handleChange}
            placeholder="http://example.com/image1.jpg, http://example.com/image2.jpg"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="flex items-center text-gray-700 mb-2">
            <Video size={18} className="mr-2" />
            Video URLs (comma-separated)
          </label>
          <input
            type="text"
            name="videos"
            value={formData.videos}
            onChange={handleChange}
            placeholder="http://example.com/video1.mp4, http://example.com/video2.mp4"
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="flex items-center text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled
          >
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition duration-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Add Experience
        </button>
      </div>
    </motion.form>
  );
};

export default AddExperienceForm;
