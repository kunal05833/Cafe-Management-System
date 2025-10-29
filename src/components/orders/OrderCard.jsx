import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Package, Coffee } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatDate, formatCurrency, formatOrderStatus } from '../../utils/formatters';
import { getOrderStatusColor } from '../../utils/helpers';

const OrderCard = ({ order, onClick }) => {
  const getStatusIcon = (status) => {
    const icons = {
      pending: Clock,
      preparing: Coffee,
      ready: Package,
      delivered: CheckCircle,
    };
    const Icon = icons[status] || Clock;
    return <Icon className="w-4 h-4" />;
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-semibold text-lg">
                Order #{order.id.slice(-6).toUpperCase()}
              </h3>
                            <p className="text-sm text-muted-foreground">
                {formatDate(order.createdAt, 'PPp')}
              </p>
            </div>
            <Badge variant={getOrderStatusColor(order.status)} className="flex items-center gap-1">
              {getStatusIcon(order.status)}
              {formatOrderStatus(order.status)}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Items:</span>
              <span className="font-medium">{order.items.length}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-semibold text-primary">{formatCurrency(order.totalAmount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Payment:</span>
              <span>{order.paymentType === 'udhari' ? 'Udhari' : 'Cash'}</span>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t">
            <p className="text-sm text-muted-foreground">
              {order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default OrderCard;