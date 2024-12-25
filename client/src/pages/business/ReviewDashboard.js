import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReviewList from '../../components/business/reviews/ReviewList';
import Sidebar from '../../components/business/Sidebar';
import TopBar from '../../components/business/TopBar';

const ReviewDashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulated API call to fetch reviews
    const fetchReviews = async () => {
      try {
        // This would be your actual API call
        const mockReviews = [
          {
            id: 1,
            userName: 'John Doe',
            userAvatar: '/placeholder.svg?height=48&width=48',
            location: 'New York, USA',
            rating: 5,
            date: '2024-01-15',
            comment: 'Amazing experience! The service was exceptional and the atmosphere was perfect. Would definitely recommend to anyone looking for a great place to stay.',
            status: 'published',
            reply: null
          },
          {
            id: 2,
            userName: 'Jane Smith',
            userAvatar: '/placeholder.svg?height=48&width=48',
            location: 'London, UK',
            rating: 4,
            date: '2024-01-14',
            comment: 'Very good overall. The room was clean and comfortable. The staff was friendly and helpful. Just a minor issue with the Wi-Fi connection.',
            status: 'pending',
            reply: null
          },
          // Add more mock reviews as needed
        ];

        setReviews(mockReviews);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleReplyToReview = (reviewId, replyText) => {
    setReviews(reviews.map(review =>
      review.id === reviewId
        ? { ...review, reply: replyText, status: 'published' }
        : review
    ));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto ">
          <div className="container mx-auto px-6 py-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-900">Reviews & Feedback</h1>
                  <p className="text-gray-500 mt-1">Manage and respond to customer reviews</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-sm text-gray-500">
                    Total Reviews: <span className="font-semibold">{reviews.length}</span>
                  </div>
                </div>
              </div>

              <ReviewList
                reviews={reviews}
                onReplyToReview={handleReplyToReview}
              />
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReviewDashboard;

