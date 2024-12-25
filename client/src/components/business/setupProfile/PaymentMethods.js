import { motion } from 'framer-motion';
import { CreditCard, Wallet, BanknoteIcon as Bank } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PaymentMethods({ onNext }) {

  const [formData, setFormData] = useState({
    creditCard: false,
    digitalWallet: false,
    bankTransfer: false,
    paymentNotes: '',
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/business-setup/payment-methods',
         formData, 
         {
           headers: { Authorization: `Bearer ${token}` }
         });
      onNext();
    } catch (error) {
      console.error('Error saving contact information:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Payment Methods</h2>
        <p className="mt-1 text-sm text-gray-600">
          Select which payment methods you accept.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                  id="credit_card"
                  name="creditCard"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  checked={formData.creditCard}
                  onChange={handleChange}
              />
            </div>
            <div className="ml-3">
              <label htmlFor="credit_card" className="font-medium text-gray-700">
                Credit Card
              </label>
              <div className="flex items-center mt-1">
                <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">Visa, Mastercard, Amex</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-start">
            <div className="flex items-center h-5">
            <input
              id="digital_wallet"
              name="digitalWallet"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              checked={formData.digitalWallet}
              onChange={handleChange}
            />
            </div>
            <div className="ml-3">
              <label htmlFor="digital_wallet" className="font-medium text-gray-700">
                Digital Wallet
              </label>
              <div className="flex items-center mt-1">
                <Wallet className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">Apple Pay, Google Pay</span>
              </div>
            </div>
          </div>

          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                id="bank_transfer"
                name="bankTransfer"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                checked={formData.bankTransfer}
                onChange={handleChange}
              />
            </div>
            <div className="ml-3">
              <label htmlFor="bank_transfer" className="font-medium text-gray-700">
                Bank Transfer
              </label>
              <div className="flex items-center mt-1">
                <Bank className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">Direct bank transfer</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="payment_notes" className="block text-sm font-medium text-gray-700">
            Additional Payment Information
          </label>
          <textarea
            id="payment_notes"
            name="payment_notes"
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
            placeholder="Any additional payment-related information..."
          />
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

