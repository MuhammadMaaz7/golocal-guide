import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export default function Policies({ onNext }) {

  const [formData, setFormData] = useState({
    cancellation: '',
    refund: '',
    pets: false,
    smoking: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
      const response = await axios.post('http://localhost:5000/api/business-setup/policies', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 200) {
        onNext(); // Proceed to the next step
      }
    } catch (error) {
      console.error('Error saving policies:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Business Policies</h2>
        <p className="mt-1 text-sm text-gray-600">
          Set your cancellation and refund policies.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="cancellation" className="block text-sm font-medium text-gray-700">
            Cancellation Policy
          </label>
          <textarea
            id="cancellation"
            name="cancellation"
            rows={4}
            value={formData.cancellation}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
            placeholder="Describe your cancellation policy..."
          />
        </div>

        <div>
          <label htmlFor="refund" className="block text-sm font-medium text-gray-700">
            Refund Policy
          </label>
          <textarea
            id="refund"
            name="refund"
            rows={3}
            value={formData.refund}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
            placeholder="Describe your refund policy..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Policies
          </label>
          <div className="mt-2 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="pets"
                  name="pets"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  checked={formData.pets}
                  onChange={handleChange}
                />
              </div>
              <div className="ml-3">
                <label htmlFor="pets" className="text-sm text-gray-700">
                  Pet Policy
                </label>
                <p className="text-xs text-gray-500">Allow pets in your establishment</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="smoking"
                  name="smoking"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  checked={formData.smoking}
                  onChange={handleChange}
                />
              </div>
              <div className="ml-3">
                <label htmlFor="smoking" className="text-sm text-gray-700">
                  Smoking Policy
                </label>
                <p className="text-xs text-gray-500">Allow smoking in designated areas</p>
              </div>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Next Step
        </motion.button>
      </form>
    </div>
  );
}

