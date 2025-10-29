import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import OrderCard from '../../components/orders/OrderCard';
import OrderFilters from '../../components/orders/OrderFilters';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserOrders } from '../../features/orders/ordersSlice';
import { useAuth } from '../../hooks/useAuth';

const Orders = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { orders, isLoading } = useSelector((s) => s.orders);
  const [filter, setFilter] = useState('all');
  const [term, setTerm] = useState('');

  useEffect(() => {
    if (user?.uid) dispatch(fetchUserOrders(user.uid));
  }, [dispatch, user]);

  const filtered = orders
    .filter((o) => (filter === 'all' ? true : o.status === filter))
    .filter((o) =>
      [o.id, o.customerName, o.paymentType].join(' ').toLowerCase().includes(term.toLowerCase())
    );

  return (
    <div className="min-h-screen py-4 sm:py-8 px-4">
      <PageHeader title="My Orders" subtitle="Track your order history" />
      <OrderFilters onFilterChange={setFilter} onSearchChange={setTerm} />
      {isLoading ? (
        <LoadingSpinner className="py-16" />
      ) : (
        <div className="mt-4 grid gap-4">
          {filtered.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-10">No orders found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Orders;