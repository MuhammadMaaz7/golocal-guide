import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import PaymentMethodCard from '../../components/business/settings/PaymentMethodCard';
import AddPaymentForm from '../../components/business/settings/AddPaymentForm';

const Payment = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'bank',
      name: 'Bank Account',
      details: 'HBL - **** 1234',
      isDefault: true
    },
    {
      id: 2,
      type: 'jazzcash',
      name: 'JazzCash',
      details: '+92 300 **** 789',
      isDefault: false
    },
    {
      id: 3,
      type: 'easypaisa',
      name: 'EasyPaisa',
      details: '+92 333 **** 456',
      isDefault: false
    }
  ]);

  const handleSetDefault = (methodId) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === methodId
      }))
    );
  };

  const handleDelete = (methodId) => {
    setPaymentMethods(methods =>
      methods.filter(method => method.id !== methodId)
    );
  };

  const handleAddPayment = (formData) => {
    const newMethod = {
      id: Date.now(),
      type: formData.type,
      name: formData.type === 'bank' ? formData.bankName :
            formData.type === 'jazzcash' ? 'JazzCash' :
            formData.type === 'easypaisa' ? 'EasyPaisa' : 'Card',
      details: formData.type === 'bank' ? 
               `${formData.bankName} - **** ${formData.accountNumber.slice(-4)}` :
               `+${formData.phoneNumber}`,
      isDefault: false
    };
    
    setPaymentMethods([...paymentMethods, newMethod]);
    setShowAddForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  Payment Settings
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                  Manage your payment methods and preferences
                </p>
              </div>
              {!showAddForm && (
                <button
                  onClick={() => setShowAddForm(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                  Add Payment Method
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            <AnimatePresence mode="wait">
              {showAddForm ? (
                <AddPaymentForm
                  key="add-form"
                  onSubmit={handleAddPayment}
                  onCancel={() => setShowAddForm(false)}
                />
              ) : (
                <motion.div
                  key="payment-list"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-4"
                >
                  {paymentMethods.map((method) => (
                    <PaymentMethodCard
                      key={method.id}
                      method={method}
                      isDefault={method.isDefault}
                      onSetDefault={() => handleSetDefault(method.id)}
                      onEdit={() => console.log('Edit:', method.id)}
                      onDelete={() => handleDelete(method.id)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Payment;

