import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { orderService } from '../../services/api/orderService';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { formatCurrency, formatDate } from '../../utils/helpers';
import { toast } from 'sonner';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const load = async () => {
    const all = await orderService.getAllOrders();
    setOrders(all);
  };

  useEffect(() => { load(); }, []);

  const update = async (id, status) => {
    await orderService.updateOrderStatus(id, status);
    toast.success('Status updated');
    load();
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <PageHeader title="Manage Orders" subtitle="Track and update order statuses" />
      <div className="grid gap-4">
        {orders.map((o) => (
          <Card key={o.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Order #{o.id.slice(-6).toUpperCase()}</span>
                <Badge>{o.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Customer</span><span className="font-medium">{o.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Total</span><span className="font-semibold text-primary">{formatCurrency(o.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Time</span><span>{formatDate(o.createdAt, 'PPp')}</span>
              </div>
              <div className="flex gap-2 pt-2">
                {o.status !== 'preparing' && <Button size="sm" onClick={() => update(o.id, 'preparing')}>Preparing</Button>}
                {o.status !== 'ready' && <Button size="sm" onClick={() => update(o.id, 'ready')}>Ready</Button>}
                {o.status !== 'delivered' && <Button size="sm" variant="gradient" onClick={() => update(o.id, 'delivered')}>Delivered</Button>}
              </div>
            </CardContent>
          </Card>
        ))}
        {orders.length === 0 && <p className="text-center text-muted-foreground py-10">No orders found</p>}
      </div>
    </div>
  );
};

export default ManageOrders;