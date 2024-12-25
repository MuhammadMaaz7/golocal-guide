import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Camera } from 'lucide-react';

const ProfilePicture = ({ currentImage, onImageChange, onImageDelete }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageChange(file);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
      <div className="flex items-center gap-6">
        <motion.div
          className={`relative w-32 h-32 rounded-full overflow-hidden border-2 
            ${isDragging ? 'border-emerald-500 bg-emerald-50' : 'border-gray-300'}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          animate={{ borderColor: isDragging ? '#9061F9' : '#E5E7EB' }}
        >
          {currentImage ? (
            <img
              src={typeof currentImage === 'string' ? currentImage : URL.createObjectURL(currentImage)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onImageChange(e.target.files[0])}
            className="hidden"
            id="profile-picture"
          />
        </motion.div>
        <div className="space-y-2">
          <button
            onClick={() => document.getElementById('profile-picture').click()}
            className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-emerald-600 rounded-lg hover:bg-emerald-700"
          >
            <Upload className="w-4 h-4" />
            Upload New Picture
          </button>
          {currentImage && (
            <button
              onClick={onImageDelete}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
            >
              <X className="w-4 h-4" />
              Remove Picture
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePicture;

