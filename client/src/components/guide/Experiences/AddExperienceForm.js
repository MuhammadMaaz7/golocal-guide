import React, { useState } from 'react';

const AddExperienceForm = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'in-progress',
    location: '',
    rating: 0,
    tags: [],
    images: [],
    videos: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExperience(formData); // Call the addExperience function passed as a prop
    setFormData({  // Reset form after submission
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      status: 'in-progress',
      location: '',
      rating: 0,
      tags: [],
      images: [],
      videos: []
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full p-2 border"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full p-2 border"
      />
      <input
        type="date"
        name="startDate"
        value={formData.startDate}
        onChange={handleChange}
        className="w-full p-2 border"
        required
      />
      <input
        type="date"
        name="endDate"
        value={formData.endDate}
        onChange={handleChange}
        className="w-full p-2 border"
      />
      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        className="w-full p-2 border"
      >
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
        <option value="upcoming">Upcoming</option>
      </select>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        className="w-full p-2 border"
      />
      <input
        type="number"
        name="rating"
        value={formData.rating}
        onChange={handleChange}
        placeholder="Rating"
        className="w-full p-2 border"
      />
      <button type="submit" className="p-2 bg-blue-600 text-white">
        Add Experience
      </button>
    </form>
  );
};

export default AddExperienceForm;
