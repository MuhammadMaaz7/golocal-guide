import { motion } from 'framer-motion';
import { CreditCard, BanknoteIcon as Bank, Smartphone, Edit2, Trash2 } from 'lucide-react';

const PaymentMethodCard = ({ method, isDefault, onSetDefault, onEdit, onDelete }) => {
  const getMethodIcon = () => {
    switch (method.type.toLowerCase()) {
      case 'bank':
        return <Bank className="w-6 h-6" />;
      case 'jazzcash':
      case 'easypaisa':
        return <Smartphone className="w-6 h-6" />;
      default:
        return <CreditCard className="w-6 h-6" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        relative p-4 rounded-xl border transition-all
        ${isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-500'}
      `}
    >
      <input
        type="radio"
        checked={isDefault}
        onChange={onSetDefault}
        className="absolute right-4 top-4"
      />
      <div className="flex items-start gap-3">
        <div className={`
          flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-lg
          ${method.type.toLowerCase() === 'jazzcash' ? 'bg-red-100' :
            method.type.toLowerCase() === 'easypaisa' ? 'bg-green-100' :
            'bg-blue-100'}
        `}>
          {getMethodIcon()}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">
              {method.name}
            </h3>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {method.details}
          </p>
          <div className="flex items-center gap-4 mt-2">
            {isDefault && (
              <span className="text-sm text-blue-600 font-medium">
                Default payment method
              </span>
            )}
            <div className="flex items-center gap-2">
              <button
                onClick={onEdit}
                className="text-sm text-gray-600 hover:text-blue-600 flex items-center gap-1"
              >
                <Edit2 className="w-3 h-3" /> Edit
              </button>
              <button
                onClick={onDelete}
                className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PaymentMethodCard;

