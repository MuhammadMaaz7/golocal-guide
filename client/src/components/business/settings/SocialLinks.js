import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import FormInput from './FormInput';

const SocialLinks = ({ links, onChange }) => {
  const [newLink, setNewLink] = useState({ platform: '', url: '' });

  const platforms = [
    { id: 'facebook', icon: Facebook, label: 'Facebook' },
    { id: 'instagram', icon: Instagram, label: 'Instagram' },
    { id: 'twitter', icon: Twitter, label: 'Twitter' },
    { id: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
  ];

  const handleAdd = () => {
    if (newLink.platform && newLink.url) {
      onChange([...links, newLink]);
      setNewLink({ platform: '', url: '' });
    }
  };

  const handleRemove = (index) => {
    onChange(links.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Social Media Links</label>
      
      <div className="space-y-4">
        {links.map((link, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex items-center gap-4"
          >
            <div className="w-40">
              <select
                value={link.platform}
                onChange={(e) => {
                  const newLinks = [...links];
                  newLinks[index].platform = e.target.value;
                  onChange(newLinks);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                {platforms.map(platform => (
                  <option key={platform.id} value={platform.id}>
                    {platform.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <FormInput
                type="url"
                value={link.url}
                onChange={(e) => {
                  const newLinks = [...links];
                  newLinks[index].url = e.target.value;
                  onChange(newLinks);
                }}
                placeholder="Enter URL"
              />
            </div>
            <button
              onClick={() => handleRemove(index)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="w-40">
          <select
            value={newLink.platform}
            onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          >
            <option value="">Select Platform</option>
            {platforms.map(platform => (
              <option key={platform.id} value={platform.id}>
                {platform.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <FormInput
            type="url"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            placeholder="Enter URL"
          />
        </div>
        <button
          onClick={handleAdd}
          className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SocialLinks;

