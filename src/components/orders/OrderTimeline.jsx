import React from 'react';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/helpers';
import { Clock, Coffee, Package, CheckCircle, X } from 'lucide-react';

const OrderTimeline = ({ events }) => {
  const getEventIcon = (type) => {
    const icons = {
      created: Clock,
      preparing: Coffee,
      ready: Package,
      delivered: CheckCircle,
      cancelled: X
    };
    return icons[type] || Clock;
  };

  const getEventColor = (type) => {
    const colors = {
      created: 'text-blue-600 bg-blue-100',
      preparing: 'text-yellow-600 bg-yellow-100',
      ready: 'text-green-600 bg-green-100',
      delivered: 'text-gray-600 bg-gray-100',
      cancelled: 'text-red-600 bg-red-100'
    };
    return colors[type] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="space-y-4">
      {events.map((event, index) => {
        const Icon = getEventIcon(event.type);
        const colorClass = getEventColor(event.type);

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-4"
          >
            <div className="relative">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
              {index < events.length - 1 && (
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-8 bg-muted" />
              )}
            </div>
            
            <div className="flex-1 pb-8">
              <h4 className="font-medium">{event.title}</h4>
              <p className="text-sm text-muted-foreground">{event.description}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDate(event.timestamp, 'PPp')}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;