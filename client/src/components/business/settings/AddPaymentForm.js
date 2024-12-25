import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, BanknoteIcon as Bank, Smartphone } from 'lucide-react';

const AddPaymentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    type: '',
    accountNumber: '',
    accountTitle: '',
    bankName: '',
    phoneNumber: ''
  });

  const paymentMethods = [
    { id: 'bank', name: 'Bank Account', icon: Bank },
    { id: 'jazzcash', name: 'JazzCash', icon: Smartphone },
    { id: 'easypaisa', name: 'EasyPaisa', icon: Smartphone },
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-xl shadow-sm"
    >
      <h2 className="text-xl font-semibold mb-6">Add Payment Method</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`
                flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-all
                ${formData.type === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
              `}
            >
              <input
                type="radio"
                name="paymentType"
                value={method.id}
                checked={formData.type === method.id}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="hidden"
              />
              <method.icon className="w-6 h-6 text-gray-600" />
              <span className="font-medium text-gray-900">{method.name}</span>
            </label>
          ))}
        </div>

        {formData.type && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="space-y-4"
          >
            {(formData.type === 'jazzcash' || formData.type === 'easypaisa') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>
            )}

            {formData.type === 'bank' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter bank name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Title
                  </label>
                  <input
                    type="text"
                    value={formData.accountTitle}
                    onChange={(e) => setFormData({ ...formData, accountTitle: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter account title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter account number"
                  />
                </div>
              </>
            )}

            {formData.type === 'card' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter card number"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter CVV"
                    />
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:text-gray-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Payment Method
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddPaymentForm;

