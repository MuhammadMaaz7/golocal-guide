import React, { useState } from 'react';
import Axios from 'axios';

const AddExperienceForm = ({ setExperiences, existingExperience = null }) => {
  const [title, setTitle] = useState(existingExperience ? existingExperience.title : '');
  const [description, setDescription] = useState(existingExperience ? existingExperience.description : '');
  const [startDate, setStartDate] = useState(existingExperience ? existingExperience.startDate : '');
  const [endDate, setEndDate] = useState(existingExperience ? existingExperience.endDate : '');
  const [status, setStatus] = useState(existingExperience ? existingExperience.status : 'in-progress');
  const [location, setLocation] = useState(existingExperience ? existingExperience.location : '');
  const [rating, setRating] = useState(existingExperience ? existingExperience.rating : 5);
  const [skillsLearned, setSkillsLearned] = useState(existingExperience ? existingExperience.skillsLearned.join(', ') : '');
  const [tags, setTags] = useState(existingExperience ? existingExperience.tags.join(', ') : '');
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const experienceData = new FormData();
    experienceData.append('title', title);
    experienceData.append('description', description);
    experienceData.append('startDate', startDate);
    experienceData.append('endDate', endDate);
    experienceData.append('status', status);
    experienceData.append('location', location);
    experienceData.append('rating', rating);
    experienceData.append('skillsLearned', skillsLearned.split(','));
    experienceData.append('tags', tags.split(','));
    images.forEach(image => experienceData.append('images', image));
    videos.forEach(video => experienceData.append('videos', video));
    attachments.forEach(attachment => experienceData.append('attachments', attachment));

    try {
      const response = existingExperience
        ? await Axios.put(`/api/experiences/${existingExperience._id}`, experienceData)
        : await Axios.post('/api/experiences', experienceData);

      setExperiences(prev => [...prev, response.data]);
    } catch (error) {
      console.error('Error adding experience:', error);
    }
  };

  const handleImageChange = (e) => setImages([...images, ...e.target.files]);
  const handleVideoChange = (e) => setVideos([...videos, ...e.target.files]);
  const handleAttachmentChange = (e) => setAttachments([...attachments, ...e.target.files]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} className="w-full sm:w-4/4 md:w-2/2 lg:w-3/3 bg-white p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-center text-blue-800">{existingExperience ? 'Edit Experience' : 'Add Experience'}</h2>

        {/* Title */}
        <div>
          <label className="block text-sm text-gray-600">Experience Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-600">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Dates */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm text-gray-600">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm text-gray-600">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm text-gray-600">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="upcoming">Upcoming</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm text-gray-600">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm text-gray-600">Rating (1-5)</label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Skills Learned */}
        <div>
          <label className="block text-sm text-gray-600">Skills Learned</label>
          <input
            type="text"
            value={skillsLearned}
            onChange={(e) => setSkillsLearned(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., Leadership, Time Management"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm text-gray-600">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="E.g., Adventure, Nature"
          />
        </div>

        {/* Upload images */}
        <div>
          <label className="block text-sm text-gray-600">Images</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Upload videos */}
        <div>
          <label className="block text-sm text-gray-600">Videos</label>
          <input
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Upload attachments */}
        <div>
          <label className="block text-sm text-gray-600">Attachments</label>
          <input
            type="file"
            accept=".pdf,.docx,.txt"
            multiple
            onChange={handleAttachmentChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition duration-300"
        >
          {existingExperience ? 'Update Experience' : 'Add Experience'}
        </button>
      </form>
    </div>
  );
};

export default AddExperienceForm;
