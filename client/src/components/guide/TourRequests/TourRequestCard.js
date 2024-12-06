import React from 'react';
import { CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TourRequestCard = ({ request, onAccept, onDecline }) => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    // Navigate to the chat page for this request
    navigate(`/chat/${request.id}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white shadow-lg rounded-lg p-6 space-y-4 mb-6 transition-all duration-300 ease-in-out hover:shadow-2xl"
    >
      <h3 className="text-2xl font-semibold text-blue-800 hover:text-blue-600 transition duration-300">
        {request.touristName}
      </h3>
      <p className="text-sm text-gray-700">Requested Area: {request.area}</p>
      <p className="text-sm text-gray-600">
        <strong>Tour Date:</strong> {new Date(request.date).toLocaleDateString()}
      </p>

      {/* Action buttons */}
      <div className="flex gap-4 mt-4">
        {request.status === 'Pending' ? (
          <>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => onAccept(request.id)}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 flex items-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Accept
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={() => onDecline(request.id)}
              className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300 flex items-center gap-2"
            >
              <XCircle className="w-5 h-5" />
              Decline
            </motion.button>
          </>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={handleChatClick}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center gap-2"
          >
            <MessageCircle className="w-5 h-5" />
            Chat
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default TourRequestCard;
