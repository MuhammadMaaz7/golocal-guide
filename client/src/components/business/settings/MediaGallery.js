import React from 'react';
import { motion } from 'framer-motion';
import { X, Image, Film } from 'lucide-react';

const MediaGallery = ({ media = [], onMediaAdd, onMediaDelete }) => {
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    onMediaAdd(files);
  };

  const renderMediaItem = (item, index) => {
    let content;
    if (typeof item === 'string') {
      // Existing media (URL)
      if (item.match(/\.(jpeg|jpg|gif|png)$/i)) {
        content = <img src={item} alt={`Gallery item ${index + 1}`} className="w-full h-full object-cover" />;
      } else if (item.match(/\.(mp4|webm|ogg)$/i)) {
        content = <video src={item} className="w-full h-full object-cover" />;
      } else {
        content = <div className="w-full h-full flex items-center justify-center bg-gray-200">Unsupported file type</div>;
      }
    } else if (item instanceof File) {
      // New media (File object)
      if (item.type.startsWith('image/')) {
        content = <img src={URL.createObjectURL(item)} alt={`Gallery item ${index + 1}`} className="w-full h-full object-cover" />;
      } else if (item.type.startsWith('video/')) {
        content = <video src={URL.createObjectURL(item)} className="w-full h-full object-cover" />;
      } else {
        content = <div className="w-full h-full flex items-center justify-center bg-gray-200">Unsupported file type</div>;
      }
    } else {
      content = <div className="w-full h-full flex items-center justify-center bg-gray-200">Invalid media item</div>;
    }

    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100"
      >
        {content}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center">
          <button
            onClick={() => onMediaDelete(index)}
            className="opacity-0 group-hover:opacity-100 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="absolute top-2 right-2">
          {(typeof item === 'string' && item.match(/\.(jpeg|jpg|gif|png)$/i)) || (item instanceof File && item.type.startsWith('image/')) ? (
            <Image className="w-5 h-5 text-white" />
          ) : (
            <Film className="w-5 h-5 text-white" />
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Media Gallery</label>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
          id="media-upload"
        />
        <div className="space-y-4">
          <div className="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <div>
            <button
              type="button"
              onClick={() => document.getElementById('media-upload').click()}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              Upload media
            </button>
            <p className="text-sm text-gray-500 mt-1">
              or drag and drop images/videos here
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(media) ? media.map(renderMediaItem) : null}
      </div>
    </div>
  );
};

export default MediaGallery;

