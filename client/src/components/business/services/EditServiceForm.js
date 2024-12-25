import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Save, Clock, Users, Utensils, Coffee, Bed, RatioIcon as AspectRatio, Mountain, CigaretteIcon as Smoking, PawPrint, LogIn, LogOut } from 'lucide-react';

const EditServiceForm = ({ service, businessType, onClose, onSave }) => {
  const [formData, setFormData] = useState(service);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const renderHotelRoomFields = () => (
    <>
      <InputField name="bedType" label="Bed Type" value={formData.bedType} onChange={handleChange} icon={Bed} />
      <InputField name="roomSize" label="Room Size (sq ft)" value={formData.roomSize} onChange={handleChange} icon={AspectRatio} type="number" />
      <InputField name="viewType" label="View Type" value={formData.viewType} onChange={handleChange} icon={Mountain} />
      <InputField name="amenities" label="Amenities (comma-separated)" value={formData.amenities ? formData.amenities.join(', ') : ''} onChange={handleChange} icon={Utensils} />
      <div className="col-span-2 grid grid-cols-2 gap-4">
        <CheckboxField name="policies.smokingAllowed" label="Smoking Allowed" checked={formData.policies?.smokingAllowed} onChange={handleChange} icon={Smoking} />
        <CheckboxField name="policies.petFriendly" label="Pet Friendly" checked={formData.policies?.petFriendly} onChange={handleChange} icon={PawPrint} />
      </div>
      <InputField name="policies.checkInTime" label="Check-in Time" value={formData.policies?.checkInTime} onChange={handleChange} icon={LogIn} />
      <InputField name="policies.checkOutTime" label="Check-out Time" value={formData.policies?.checkOutTime} onChange={handleChange} icon={LogOut} />
    </>
  );

  const renderMenuItemFields = () => (
    <>
      <InputField name="category" label="Category" value={formData.category} onChange={handleChange} icon={Coffee} />
      <InputField name="cuisine" label="Cuisine" value={formData.cuisine} onChange={handleChange} icon={Utensils} />
      <InputField name="ingredients" label="Ingredients (comma-separated)" value={formData.ingredients ? formData.ingredients.join(', ') : ''} onChange={handleChange} icon={Utensils} />
      <InputField name="allergens" label="Allergens (comma-separated)" value={formData.allergens ? formData.allergens.join(', ') : ''} onChange={handleChange} icon={Utensils} />
      <InputField name="preparationTime" label="Preparation Time (minutes)" value={formData.preparationTime} onChange={handleChange} icon={Clock} type="number" />
      <InputField name="spicyLevel" label="Spicy Level (0-5)" value={formData.spicyLevel} onChange={handleChange} icon={Utensils} type="number" min="0" max="5" />
      <div className="col-span-2 grid grid-cols-3 gap-4">
        <CheckboxField name="isVegetarian" label="Vegetarian" checked={formData.isVegetarian} onChange={handleChange} />
        <CheckboxField name="isVegan" label="Vegan" checked={formData.isVegan} onChange={handleChange} />
        <CheckboxField name="isGlutenFree" label="Gluten-Free" checked={formData.isGlutenFree} onChange={handleChange} />
      </div>
      <InputField name="portionSize" label="Portion Size" value={formData.portionSize} onChange={handleChange} icon={Utensils} />
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg shadow-xl overflow-y-auto w-full max-w-2xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Service</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </motion.button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField name="name" label="Name" value={formData.name} onChange={handleChange} />
            <InputField name="price" label="Price" value={formData.price} onChange={handleChange} type="number" step="0.01" />
            <InputField name="description" label="Description" value={formData.description} onChange={handleChange} className="col-span-2" textarea />
            <InputField name="availability" label="Availability" value={formData.availability} onChange={handleChange} icon={Clock} />
            {formData.capacity && (
              <>
                <InputField name="capacity.adults" label="Adult Capacity" value={formData.capacity.adults} onChange={handleChange} icon={Users} type="number" />
                <InputField name="capacity.children" label="Child Capacity" value={formData.capacity.children} onChange={handleChange} icon={Users} type="number" />
              </>
            )}
            {businessType === 'hotel' ? renderHotelRoomFields() : renderMenuItemFields()}
          </div>
          <div className="mt-6 flex justify-end">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Changes
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const InputField = ({ name, label, value, onChange, icon: Icon, className = '', ...props }) => (
  <div className={`flex flex-col ${className}`}>
    <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700 flex items-center">
      {Icon && <Icon className="w-5 h-5 mr-1 text-gray-500" />}
      {label}
    </label>
    {props.textarea ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        rows="3"
        {...props}
      />
    ) : (
      <input
        type="text"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        {...props}
      />
    )}
  </div>
);

const CheckboxField = ({ name, label, checked, onChange, icon: Icon }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
    />
    <label htmlFor={name} className="ml-2 text-sm font-medium text-gray-700 flex items-center">
      {Icon && <Icon className="w-5 h-5 mr-1 text-gray-500" />}
      {label}
    </label>
  </div>
);

export default EditServiceForm;

