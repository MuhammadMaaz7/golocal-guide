import React from 'react';
import Sidebar from '../../components/guide/Sidebar';
import ProfileForm from '../../components/guide/Profile/ProfileForm';
import ProfileDetails from '../../components/guide/Profile/ProfileDetails';
import { useGuide } from '../../context/GuideContext';

const GuideProfile = () => {
  const { guideData, updateGuideData } = useGuide();

  const handleSave = (updatedData) => {
    updateGuideData(updatedData);
    alert('Profile updated successfully!');
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gradient-to-b from-blue-50 to-indigo-100 p-8">
        <h2 className="text-3xl font-semibold text-blue-800 mb-6">Profile</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <img
            src={guideData.profilePictureURL}
            alt={`${guideData.name}'s Profile`}
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
