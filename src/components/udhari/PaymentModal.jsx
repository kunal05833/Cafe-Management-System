import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Label } from '../ui/Label';
import { CreditCard, DollarSign } from 'lucide-react';
import { formatCurrency } from '../../utils/helpers';
import { validateForm, validators } from '../../utils/validators';

const PaymentModal = ({ isOpen, onClose, onSubmit, customerData }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationRules = {
      amount: [validators.required, validators.positiveNumber],
    };

    const { isValid, errors: validationErrors } = validateForm({ amount }, validationRules);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      amount: parseFloat(amount),
      description: description || `Payment received on ${new Date().toLocaleDateString()}`
    });

    // Reset form
    setAmount('');
    setDescription('');
    setErrors({});
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Payment"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-muted p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Customer:</span>
            <span className="font-medium">{customerData?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Current Balance:</span>
            <span className="font-medium text-primary">
              {formatCurrency(customerData?.udhariBalance || 0)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Payment Amount</Label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (errors.amount) setErrors({ ...errors, amount: null });
              }}
              placeholder="0.00"
              className={`pl-10 ${errors.amount ? 'border-destructive' : ''}`}
            />
          </div>
          {errors.amount && (
            <p className="text-sm text-destructive">{errors.amount}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a note about this payment"
                       className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            rows="3"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="gradient"
            className="flex-1"
          >
            Record Payment
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PaymentModal;