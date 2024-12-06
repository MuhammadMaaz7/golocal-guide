import React from 'react';
import TourRequestCard from './TourRequestCard';

const TourRequestList = ({ requests, onAccept, onDecline }) => {
  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <TourRequestCard
          key={request.id}
          request={request}
          onAccept={onAccept}
          onDecline={onDecline}
        />
      ))}
    </div>
  );
};

export default TourRequestList;
