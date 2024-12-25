import { Star } from 'lucide-react';

const StarRating = ({ rating, size = 'small' }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`
            ${size === 'small' ? 'w-4 h-4' : 'w-5 h-5'}
            ${star <= rating 
              ? 'text-yellow-400 fill-yellow-400' 
              : 'text-gray-300 fill-gray-300'
            }
          `}
        />
      ))}
    </div>
  );
};

export default StarRating;

