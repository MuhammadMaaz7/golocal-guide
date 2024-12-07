import React from 'react';

const ProfileCard = ({ profileData, user }) => {
  // Ensure both profileData and user are available before rendering
  if (!profileData || !user) {
    return (
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-500">Profile data is loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {/* Profile Image */}
      <img
        src={profileData.profilePictureURL || 'https://via.placeholder.com/150'}
        alt={`${user.name || 'User'}'s Profile`}
        className="w-24 h-24 rounded-full mb-4 mx-auto"
      />

      {/* User Name */}
      <h2 className="text-center text-2xl font-semibold text-blue-800">
        {user.name || 'No Name Available'}
      </h2>

      {/* User Email */}
      <p className="text-center text-gray-600">{user.email || 'No Email Available'}</p>

      {/* Rating Info */}
      <p className="text-center text-gray-600 mt-2">
        <strong>Rating:</strong>{' '}
        {profileData.rating ? `${profileData.rating.toFixed(1)} / 5` : 'No Rating Available'}
        {profileData.totalReviews ? ` (${profileData.totalReviews} reviews)` : ''}
      </p>
    </div>
  );
};

export default ProfileCard;
