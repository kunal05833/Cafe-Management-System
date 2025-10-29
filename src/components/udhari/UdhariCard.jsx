import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { CreditCard, TrendingUp, AlertCircle } from 'lucide-react';
import { formatCurrency, calculatePercentage } from '../../utils/helpers';
import { Progress } from '../ui/Progress';

const UdhariCard = ({ balance, creditLimit }) => {
  const utilization = calculatePercentage(balance, creditLimit);
  const available = creditLimit - balance;
  const isHighUtilization = utilization > 80;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-primary-500 to-primary-700 text-white">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Udhari Account
            </span>
            {isHighUtilization && (
              <AlertCircle className="w-5 h-5 animate-pulse" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Balance Display */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
              <p className="text-4xl font-bold text-primary">{formatCurrency(balance)}</p>
            </div>

            {/* Credit Utilization */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Credit Utilization</span>
                <span className={isHighUtilization ? 'text-destructive font-medium' : ''}>
                  {utilization}%
                </span>
              </div>
              <Progress 
                value={utilization} 
                className={`h-3 ${isHighUtilization ? 'bg-destructive/20' : ''}`}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Credit Limit</p>
                <p className="text-xl font-semibold">{formatCurrency(creditLimit)}</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Available</p>
                <p className="text-xl font-semibold text-green-600">{formatCurrency(available)}</p>
              </div>
            </div>

            {isHighUtilization && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                <p className="text-sm text-destructive flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  High credit utilization. Consider making a payment.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UdhariCard;