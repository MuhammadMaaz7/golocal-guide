import React, { useEffect, useState } from 'react';
import ProfileCard from './ProfileCard';
import GuideInfoCard from './GuideInfoCard';

const Dashboard = ({ userId }) => {
  const [guideData, setGuideData] = useState(null);

  useEffect(() => {
    const fetchGuideData = async () => {
      try {
        const response = await fetch(`/api/guide/profile`);
        const data = await response.json();
        if (response.ok) {
          setGuideData(data);  // Set the guide data
        } else {
          console.error('Error fetching guide data:', data.message);
        }
      } catch (error) {
        console.error('Error fetching guide data:', error);
      }
    };

    if (userId) {
      fetchGuideData();
    }
  }, [userId]);

  if (!guideData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProfileCard profileData={guideData} />
      <div className="grid grid-cols-2 gap-6 mt-6">
        <GuideInfoCard title="Experience" value={`${guideData.yearsOfExperience} years`} />
        <GuideInfoCard title="Languages" value={guideData.languages.join(', ')} />
        <GuideInfoCard title="Specialization" value={guideData.expertiseAreas.join(', ')} />
      </div>
    </div>
  );
};

export default Dashboard;
