import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import UdhariCard from '../../components/udhari/UdhariCard';
import TransactionList from '../../components/udhari/TransactionList';
import PaymentModal from '../../components/udhari/PaymentModal';
import { useAuth } from '../../hooks/useAuth';
import { udhariService } from '../../services/api/udhariService';
import { toast } from 'sonner';

const Udhari = () => {
  const { user } = useAuth();
  const [data, setData] = useState({ balance: 0, creditLimit: 0, transactions: [] });
  const [open, setOpen] = useState(false);

  const load = async () => {
    if (!user?.uid) return;
    try {
      const d = await udhariService.getUserUdhariData(user.uid);
      setData(d);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => {
    load();
  }, [user]);

  const recordPayment = async ({ amount, description }) => {
    try {
      await udhariService.recordPayment(user.uid, amount, description);
      toast.success('Payment recorded');
      setOpen(false);
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 px-4">
      <PageHeader title="Udhari" subtitle="View your balance and transactions" />
      <div className="grid gap-4">
        <UdhariCard balance={data.balance} creditLimit={data.creditLimit} />
        <button
          onClick={() => setOpen(true)}
          className="bg-primary text-white rounded-lg py-3 active:scale-[0.98]"
        >
          Make a Payment
        </button>
        <TransactionList transactions={data.transactions} />
      </div>

      <PaymentModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={recordPayment}
        customerData={{ name: user?.name || user?.email, udhariBalance: data.balance }}
      />
    </div>
  );
};

export default Udhari;