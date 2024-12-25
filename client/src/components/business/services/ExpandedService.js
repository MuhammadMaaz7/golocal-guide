import React from 'react';
import { motion } from 'framer-motion';
import { X, Edit2, Trash2, Clock, Users, Utensils, Coffee, Bed, RatioIcon as AspectRatio, Mountain, CigaretteIcon as Smoking, PawPrint, LogIn, LogOut } from 'lucide-react';

const ExpandedServiceCard = ({ service, businessType, onClose, onEdit, onDelete }) => {
  const renderHotelRoomDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailItem icon={Bed} label="Bed Type" value={service.bedType} />
      <DetailItem icon={AspectRatio} label="Room Size" value={service.roomSize ? `${service.roomSize} sq ft` : 'N/A'} />
      <DetailItem icon={Mountain} label="View" value={service.viewType} />
      <DetailItem icon={Utensils} label="Amenities" value={service.amenities ? service.amenities.join(', ') : 'N/A'} />
      {service.policies && (
        <>
          <DetailItem icon={Smoking} label="Smoking Allowed" value={service.policies.smokingAllowed ? 'Yes' : 'No'} />
          <DetailItem icon={PawPrint} label="Pet Friendly" value={service.policies.petFriendly ? 'Yes' : 'No'} />
        </>
      )}
    </div>
  );

  const renderMenuItemDetails = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailItem icon={Coffee} label="Category" value={service.category} />
      <DetailItem icon={Utensils} label="Cuisine" value={service.cuisine} />
      <DetailItem icon={Utensils} label="Ingredients" value={service.ingredients ? service.ingredients.join(', ') : 'N/A'} />
      <DetailItem icon={Utensils} label="Allergens" value={service.allergens ? service.allergens.join(', ') : 'N/A'} />
      {service.nutritionalInfo && (
        <div className="col-span-2">
          <h4 className="font-semibold text-gray-700 mb-2">Nutritional Info:</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <DetailItem label="Calories" value={`${service.nutritionalInfo.calories} kcal`} />
            <DetailItem label="Protein" value={`${service.nutritionalInfo.protein}g`} />
            <DetailItem label="Carbs" value={`${service.nutritionalInfo.carbohydrates}g`} />
            <DetailItem label="Fat" value={`${service.nutritionalInfo.fat}g`} />
          </div>
        </div>
      )}
      <DetailItem icon={Clock} label="Prep Time" value={service.preparationTime ? `${service.preparationTime} min` : 'N/A'} />
      <DetailItem icon={Utensils} label="Spicy Level" value={service.spicyLevel ? `${service.spicyLevel}/5` : 'N/A'} />
      <DetailItem
        icon={Utensils}
        label="Dietary"
        value={[
          service.isVegetarian && 'Vegetarian',
          service.isVegan && 'Vegan',
          service.isGlutenFree && 'Gluten-Free'
        ].filter(Boolean).join(', ') || 'N/A'}
      />
      <DetailItem icon={Utensils} label="Portion Size" value={service.portionSize} />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <img
            src={
              service.images && service.images.length > 0
                ? `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/${service.images[0].replace(/\\/g, '/')}`
                : '/fallback-image.jpg'
            }
            alt={service.name || 'Default Name'}
            className="w-full h-64 object-cover"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </motion.button>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{service.name}</h2>
              <p className="text-2xl font-semibold text-emerald-600">${service.price}</p>
            </div>
            <div className="flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onEdit(service)}
                className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors"
              >
                <Edit2 className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(service._id);
                  onClose();
                }}
                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
          <p className="text-gray-600 mb-6">{service.description}</p>
          <div className="space-y-6">
            <DetailItem icon={Clock} label="Availability" value={service.availability} />
            {service.capacity && (
              <DetailItem
                icon={Users}
                label="Capacity"
                value={`Adults: ${service.capacity.adults}, Children: ${service.capacity.children}`}
              />
            )}
            {businessType === 'hotel' ? renderHotelRoomDetails() : renderMenuItemDetails()}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-center space-x-2">
    {Icon && <Icon className="w-5 h-5 text-gray-500" />}
    <span className="font-medium text-gray-700">{label}:</span>
    <span className="text-gray-600">{value || 'N/A'}</span>
  </div>
);

export default ExpandedServiceCard;

