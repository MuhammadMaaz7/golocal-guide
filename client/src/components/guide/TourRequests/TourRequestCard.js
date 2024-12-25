import React from 'react';
import { CheckCircle, XCircle, MessageCircle, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGuideRequests } from '../../../context/RequestsContext';

const GuideRequestCard = ({ request, onChatClick }) => {
  console.log("Handle chats");
  const { updateRequestStatus } = useGuideRequests();

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50';
      case 'confirmed':
        return 'text-emerald-600 bg-emerald-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const handleAccept = async () => {
    await updateRequestStatus(request._id, 'confirmed');
  };

  const handleDecline = async () => {
    await updateRequestStatus(request._id, 'cancelled');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-100 hover:shadow-lg transition-all duration-300"
    >
      <div className="p-4 grid grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 items-center">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <img
              src={request.tourist.avatar || "/placeholder.svg?height=40&width=40"}
              alt={request.tourist.name}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {request.area || 'Custom Tour Request'}
            </h3>
            <p className="text-sm text-gray-500 truncate">
              {request.tourist.name}
            </p>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          {new Date(request.startDate).toLocaleDateString()}
        </div>

        <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
          {request.status}
        </div>

        <div className="text-sm font-medium text-emerald-600">
          ${request.price || 'Custom'}
        </div>

        <div className="flex items-center gap-2">
          {request.status === 'pending' ? (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAccept}
                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full"
                title="Accept Request"
              >
                <CheckCircle className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDecline}
                className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                title="Decline Request"
              >
                <XCircle className="w-5 h-5" />
              </motion.button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChatClick(request)}
              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full"
              title="Open Chat"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.button>
          )}
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-full">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GuideRequestCard;
