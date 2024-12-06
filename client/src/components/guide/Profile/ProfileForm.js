import React, { useState, useEffect } from 'react';

const ProfileForm = ({ profileData, onSave }) => {
  const [formData, setFormData] = useState(profileData);
  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to toggle between view and edit modes

  useEffect(() => {
    // Initialize formData with existing profile data when the component loads
    setFormData(profileData);
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      // Optionally show image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profilePictureURL: reader.result, // Display base64 image as preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData };

    // Create FormData to handle image upload
    const formDataForUpload = new FormData();
    formDataForUpload.append('name', updatedData.name);
    formDataForUpload.append('guideType', updatedData.guideType);
    formDataForUpload.append('yearsOfExperience', updatedData.yearsOfExperience);
    formDataForUpload.append('fee', updatedData.fee);
    formDataForUpload.append('languages', updatedData.languages);
    formDataForUpload.append('expertiseAreas', updatedData.expertiseAreas);

    if (file) {
      formDataForUpload.append('image', file);
    }

    try {
      // Make the API call to save the updated guide profile
      const response = await fetch(`/api/guides/${profileData._id}`, {
        method: 'PUT',
        body: formDataForUpload,
      });

      if (response.ok) {
        const result = await response.json();
        onSave(result); // Call the onSave function to update the profile data
      }
    } catch (err) {
      console.error('Error saving profile:', err);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="space-y-4 max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      {/* Display Profile Details */}
      {!isEditing ? (
        <>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">{formData.name}</h2>
            <p className="text-gray-600">{formData.guideType}</p>
            <p className="text-gray-600">Experience: {formData.yearsOfExperience} years</p>
            <p className="text-gray-600">Fee: ${formData.fee}</p>
            <p className="text-gray-600">Languages: {formData.languages.join(', ')}</p>
            <p className="text-gray-600">Expertise Areas: {formData.expertiseAreas.join(', ')}</p>
          </div>

          {/* Edit Button */}
          <button
            onClick={handleEditToggle}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Edit Profile
          </button>
        </>
      ) : (
        // Display Editable Form
        <form onSubmit={handleSave} className="space-y-4">
          {/* Editable Fields */}
          <div>
            <label className="block text-sm text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Guide Type</label>
            <input
              type="text"
              name="guideType"
              value={formData.guideType}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Years of Experience</label>
            <input
              type="number"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Fee</label>
            <input
              type="number"
              name="fee"
              value={formData.fee}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Languages</label>
            <input
              type="text"
              name="languages"
              value={formData.languages.join(', ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  languages: e.target.value.split(',').map((lang) => lang.trim()),
                }))
              }
              className="w-full p-2 border rounded-md"
              placeholder="E.g., English, Spanish"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Expertise Areas</label>
            <input
              type="text"
              name="expertiseAreas"
              value={formData.expertiseAreas.join(', ')}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  expertiseAreas: e.target.value.split(',').map((area) => area.trim()),
                }))
              }
              className="w-full p-2 border rounded-md"
              placeholder="E.g., Mountains, Historical Sites"
            />
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm text-gray-600">Profile Picture</label>
            <input
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded-md"
            />
            {formData.profilePictureURL && (
              <div className="mt-2">
                <img
                  src={formData.profilePictureURL}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </form>
      )}
    </div>
  );
};

export default ProfileForm;
