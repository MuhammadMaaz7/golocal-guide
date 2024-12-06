import React from 'react';

const ProfileDetails = ({ profileData }) => {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Email</h2>
        <p className="text-sm text-gray-600">{profileData.email}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Rating</h2>
        <p className="text-sm text-gray-600">{profileData.rating.toFixed(1)} / 5</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Total Reviews</h2>
        <p className="text-sm text-gray-600">{profileData.totalReviews}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
