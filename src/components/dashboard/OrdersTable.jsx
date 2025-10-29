import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { formatDate, formatCurrency } from '../../utils/helpers';
import { getOrderStatusColor } from '../../utils/helpers';
import { Eye } from 'lucide-react';
import { Button } from '../ui/Button';

const OrdersTable = ({ orders, onViewOrder }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium text-muted-foreground">Order ID</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Customer</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Items</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Total</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Time</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="p-4 font-medium">#{order.id.slice(-6).toUpperCase()}</td>
                  <td className="p-4">{order.customerName}</td>
                  <td className="p-4">{order.items.length}</td>
                  <td className="p-4 font-semibold">{formatCurrency(order.totalAmount)}</td>
                  <td className="p-4">
                    <Badge variant={getOrderStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-muted-foreground">
                    {formatDate(order.createdAt, 'p')}
                  </td>
                  <td className="p-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onViewOrder(order)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrdersTable;