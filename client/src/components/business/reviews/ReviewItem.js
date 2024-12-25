import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, MoreHorizontal, ChevronDown } from 'lucide-react';
import StarRating from './StarRating';

const ReviewItem = ({ review, onReply }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState('');

  const handleSubmitReply = (e) => {
    e.preventDefault();
    onReply(review.id, replyText);
    setReplyText('');
    setShowReplyForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-sm p-6 mb-4"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
            <img 
              src={review.userAvatar || '/placeholder.svg?height=48&width=48'} 
              alt={review.userName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{review.userName}</h3>
            <p className="text-sm text-gray-500">{review.location}</p>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={review.rating} />
              <span className="text-sm text-gray-500">
                {new Date(review.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${review.status === 'published' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {review.status.charAt(0).toUpperCase() + review.status.slice(1)}
          </span>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="mt-4">
        <p className={`text-gray-600 ${!isExpanded && 'line-clamp-2'}`}>
          {review.comment}
        </p>
        {review.comment.length > 150 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 text-sm mt-2 flex items-center hover:underline"
          >
            {isExpanded ? 'Show less' : 'Read more'}
            <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {review.reply && (
        <div className="mt-4 pl-4 border-l-2 border-gray-200">
          <p className="text-sm font-medium text-gray-900">Business Response:</p>
          <p className="text-sm text-gray-600 mt-1">{review.reply}</p>
        </div>
      )}

      {!review.reply && (
        <div className="mt-4">
          {!showReplyForm ? (
            <button
              onClick={() => setShowReplyForm(true)}
              className="text-blue-600 text-sm flex items-center hover:underline"
            >
              <MessageSquare className="w-4 h-4 mr-1" />
              Reply to review
            </button>
          ) : (
            <form onSubmit={handleSubmitReply} className="space-y-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write your reply..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReplyForm(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Submit Reply
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default ReviewItem;

