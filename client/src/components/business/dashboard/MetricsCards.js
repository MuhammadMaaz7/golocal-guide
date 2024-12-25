import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Star, Calendar, DollarSign } from 'lucide-react';

export default function MetricsCards({ timeframe }) {
  const metrics = [
    {
      title: 'Total Bookings',
      value: '156',
      change: '+12%',
      isPositive: true,
      comparison: 'vs last period',
      icon: Calendar,
      color: 'bg-emerald-500'
    },
    {
      title: 'Revenue',
      value: '$12,486',
      change: '+18%',
      isPositive: true,
      comparison: 'vs last period',
      icon: DollarSign,
      color: 'bg-emerald-600'
    },
    {
      title: 'Active Customers',
      value: '1,245',
      change: '+5%',
      isPositive: true,
      comparison: 'vs last period',
      icon: Users,
      color: 'bg-emerald-700'
    },
    {
      title: 'Satisfaction Rate',
      value: '4.9/5',
      change: '+0.2',
      isPositive: true,
      comparison: 'vs last period',
      icon: Star,
      color: 'bg-emerald-800'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -2, transition: { duration: 0.2 } }}
          className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center gap-4">
            <div className={`${metric.color} p-3 rounded-lg text-white`}>
              <metric.icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="text-sm text-gray-600 mb-1">{metric.title}</div>
              <div className="flex items-end gap-2">
                <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                <div className={`flex items-center ${
                  metric.isPositive ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  {metric.isPositive ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">{metric.change}</span>
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-1">{metric.comparison}</div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}