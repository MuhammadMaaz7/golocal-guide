import React from 'react';
import Sidebar from '../../components/guide/Sidebar';
import ProfileForm from '../../components/guide/Profile/ProfileForm';
import ProfileDetails from '../../components/guide/Profile/ProfileDetails';
import { useGuide } from '../../context/GuideContext';

const GuideProfile = () => {
  const { guideData, updateGuideData, loading, error } = useGuide();

  const handleSave = async (updatedData) => {
    console.log("In updated func");
    const result = await updateGuideData(updatedData);
    if (result.success) {
      alert('Profile updated successfully!');
    } else {
      alert(`Failed to update profile: ${result.message}`);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading profile: {error}</div>;
  }

  if (!guideData) {
    return <div className="text-gray-500">No profile data available.</div>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-indigo-100 p-8">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">Profile</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img
            src={guideData.profilePictureURL || '/default-profile.png'} // Fallback to default image
            alt={`${guideData.name || 'User'}'s Profile`}
            className="w-24 h-24 rounded-full mb-6"
          />
          <ProfileDetails profileData={guideData} />
          <hr className="my-6" />
          <ProfileForm profileData={guideData} onSave={handleSave} />
        </div>
      </div>
    </div>
  );
};

export default GuideProfile;
