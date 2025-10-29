import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import PaymentModal from '../../components/udhari/PaymentModal';
import CreditLimit from '../../components/udhari/CreditLimit';
import { udhariService } from '../../services/api/udhariService';
import { formatCurrency } from '../../utils/helpers';
import { toast } from 'sonner';

const UdhariManagement = () => {
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [payOpen, setPayOpen] = useState(false);

  const load = async () => {
    const list = await udhariService.getAllUdhariCustomers();
    setCustomers(list);
  };

  useEffect(() => { load(); }, []);

  const recordPayment = async ({ amount, description }) => {
    await udhariService.recordPayment(selected.id, amount, description);
    toast.success('Payment recorded');
    setPayOpen(false);
    load();
  };

  const updateLimit = async (limit) => {
    await udhariService.updateCreditLimit(selected.id, limit);
    toast.success('Limit updated');
    load();
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <PageHeader title="Udhari Management" subtitle="Manage customer credit and payments" />
      <div className="grid gap-4">
        {customers.map((c) => (
          <Card key={c.id}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{c.name}</p>
                <p className="text-sm text-muted-foreground">{c.email}</p>
                <p className="text-sm mt-1">Balance: <span className="font-semibold text-primary">{formatCurrency(c.udhariBalance)}</span></p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => { setSelected(c); setPayOpen(true); }}>Record Payment</Button>
                <Button size="sm" variant="outline" onClick={() => setSelected(c)}>Set Limit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {customers.length === 0 && <p className="text-center text-muted-foreground py-10">No pending udhari</p>}
      </div>

      {selected && (
        <div className="mt-4">
          <CreditLimit currentLimit={selected.creditLimit || 5000} onUpdate={updateLimit} />
        </div>
      )}

      <PaymentModal
        isOpen={payOpen}
        onClose={() => setPayOpen(false)}
        onSubmit={recordPayment}
        customerData={{ name: selected?.name, udhariBalance: selected?.udhariBalance || 0 }}
      />
    </div>
  );
};

export default UdhariManagement;