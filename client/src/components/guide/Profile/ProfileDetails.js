import React from 'react';
import { useGuide } from '../../../context/GuideContext.js';
import { useAuth } from '../../../context/AuthContext';
const ProfileDetails = ({ profileData }) => {
  const { user } = useAuth();
  const { guideData } = useGuide();
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Email</h2>
        <p className="text-sm text-gray-600">{user.email}</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Rating</h2>
        <p className="text-sm text-gray-600">{guideData.rating.toFixed(1)} / 5</p>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Total Reviews</h2>
        <p className="text-sm text-gray-600">{guideData.totalReviews}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
