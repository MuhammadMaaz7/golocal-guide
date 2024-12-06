import React from 'react';

const ProfileCard = ({ profileData }) => {
  if (!profileData) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-500">Profile data is loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <img
        src={profileData.profilePictureURL || 'https://via.placeholder.com/150'}
        alt={`${profileData.name}'s Profile`}
        className="w-24 h-24 rounded-full mb-4 mx-auto"
      />
      <h2 className="text-center text-2xl font-semibold text-blue-800">
        {profileData.name || 'No Name Available'}
      </h2>
      <p className="text-center text-gray-600">{profileData.email || 'No Email Available'}</p>
      <p className="text-center text-gray-600 mt-2">
        <strong>Rating:</strong>{' '}
        {profileData.rating ? `${profileData.rating.toFixed(1)} / 5` : 'No Rating Available'}
        {profileData.totalReviews ? ` (${profileData.totalReviews} reviews)` : ''}
      </p>
    </div>
  );
};

export default ProfileCard;
