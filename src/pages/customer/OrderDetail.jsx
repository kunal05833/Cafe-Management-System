import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import OrderTracking from '../../components/orders/OrderTracking';
import OrderTimeline from '../../components/orders/OrderTimeline';
import { formatDate, formatCurrency } from '../../utils/helpers';
import { getOrderStatusColor } from '../../utils/helpers';

const OrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrderDetails();
  }, [orderId]);

  const fetchOrderDetails = async () => {
    // Fetch order details from Firebase
    // Mock data for now
    setOrder({
      id: orderId,
      status: 'preparing',
      items: [
        { id: 1, name: 'Cappuccino', quantity: 2, price: 120 },
        { id: 2, name: 'Chocolate Cake', quantity: 1, price: 180 }
      ],
      totalAmount: 420,
      paymentType: 'cash',
      customerName: 'John Doe',
      customerPhone: '9876543210',
      deliveryAddress: '123 Coffee Street, Mumbai',
      createdAt: new Date().toISOString(),
      events: [
        { type: 'created', title: 'Order Placed', description: 'Your order has been received', timestamp: new Date() },
        { type: 'preparing', title: 'Preparing', description: 'We are preparing your order', timestamp: new Date() }
      ]
    });
    setLoading(false);
  };

  if (loading || !order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Orders
          </Button>
          
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Order #{order.id.slice(-6).toUpperCase()}</h1>
            <Badge variant={getOrderStatusColor(order.status)} className="text-lg px-4 py-2">
              {order.status}
            </Badge>
          </div>
        </motion.div>

        {/* Order Tracking */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <OrderTracking status={order.status} />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  ))}
                  <div className="border-t pt-3 flex justify-between items-center">
                    <p className="font-semibold">Total Amount</p>
                    <p className="text-xl font-bold text-primary">{formatCurrency(order.totalAmount)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderTimeline events={order.events} />
              </CardContent>
            </Card>
          </div>

          {/* Order Info */}
          <div className="space-y-6">
            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{order.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Phone className="w-3 h-3" /> Phone
                  </p>
                  <p className="font-medium">{order.customerPhone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Delivery Address
                  </p>
                  <p className="font-medium">{order.deliveryAddress}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium capitalize">{order.paymentType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Date</p>
                  <p className="font-medium">{formatDate(order.createdAt, 'PPp')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;