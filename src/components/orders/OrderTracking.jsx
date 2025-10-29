import React from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Coffee, Package, CheckCircle, X } from 'lucide-react';
import { cn } from '../../utils/cn';

const OrderTracking = ({ status }) => {
  const steps = [
    { id: 'pending', name: 'Order Placed', icon: Check },
    { id: 'preparing', name: 'Preparing', icon: Coffee },
    { id: 'ready', name: 'Ready', icon: Package },
    { id: 'delivered', name: 'Delivered', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === status);
  const isCancelled = status === 'cancelled';

  if (isCancelled) {
    return (
      <div className="flex items-center justify-center p-4 bg-destructive/10 rounded-lg">
        <X className="w-5 h-5 text-destructive mr-2" />
        <span className="text-destructive font-medium">Order Cancelled</span>
      </div>
    );
  }

  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all",
                    isCompleted
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground",
                    isCurrent && "ring-4 ring-primary/20 animate-pulse"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className={cn(
                  "text-xs mt-2 text-center",
                  isCompleted ? "text-foreground font-medium" : "text-muted-foreground"
                )}>
                  {step.name}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex-1 h-0.5 mx-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted && index < currentStepIndex ? '100%' : '0%' }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full bg-primary"
                  />
                  <div className={cn(
                    "h-full -mt-0.5",
                    isCompleted && index < currentStepIndex ? "bg-transparent" : "bg-muted"
                  )} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default OrderTracking;