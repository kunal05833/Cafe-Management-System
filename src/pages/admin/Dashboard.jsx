import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/dashboard/StatsCard';
import SalesChart from '../../components/dashboard/SalesChart';
import RevenueChart from '../../components/dashboard/RevenueChart';
import OrdersTable from '../../components/dashboard/OrdersTable';
import TopProducts from '../../components/dashboard/TopProducts';
import { DollarSign, ShoppingBag, Users, CreditCard } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Revenue', value: '₹45,231', change: 12.5, icon: DollarSign, color: 'green' },
    { title: 'Total Orders', value: '356', change: 8.2, icon: ShoppingBag, color: 'blue' },
    { title: 'Active Customers', value: '2,345', change: -2.4, icon: Users, color: 'purple' },
    { title: 'Pending Udhari', value: '₹12,450', change: 4.1, icon: CreditCard, color: 'orange' },
  ];
  const salesData = [
    { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 }, { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 2780 }, { name: 'Fri', sales: 6890 }, { name: 'Sat', sales: 8390 }, { name: 'Sun', sales: 7490 },
  ];
  const revenueData = [
    { category: 'Coffee', revenue: 12000, orders: 450 },
    { category: 'Snacks', revenue: 8000, orders: 320 },
    { category: 'Desserts', revenue: 6000, orders: 180 },
    { category: 'Beverages', revenue: 4000, orders: 150 },
  ];
  const top = [
    { id: '1', name: 'Cappuccino', quantity: 320, revenue: 19200 },
    { id: '2', name: 'Espresso', quantity: 280, revenue: 16800 },
    { id: '3', name: 'Chocolate Cake', quantity: 130, revenue: 23400 },
  ];
  const recentOrders = [
    { id: 'abc123', customerName: 'John Doe', items: [{},{}], totalAmount: 450, status: 'completed', createdAt: new Date().toISOString() },
    { id: 'def456', customerName: 'Jane', items: [{}], totalAmount: 320, status: 'preparing', createdAt: new Date().toISOString() },
  ];

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <PageHeader title="Dashboard" subtitle="Overview of performance" />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((s, i) => <StatsCard key={s.title} {...s} index={i} />)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SalesChart data={salesData} />
        <RevenueChart data={revenueData} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <OrdersTable orders={recentOrders} onViewOrder={() => {}} />
        <TopProducts products={top} />
      </div>
    </div>
  );
};

export default Dashboard;