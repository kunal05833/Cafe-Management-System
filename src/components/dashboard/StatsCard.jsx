import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '../../utils/cn';

const StatsCard = ({ title, value, change, icon: Icon, color, index }) => {
  const isPositive = change >= 0;
  
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500',
    red: 'bg-red-500'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="relative overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-3xl font-bold">{value}</h2>
                {change !== undefined && (
                  <div className={cn(
                    "flex items-center gap-1 text-sm font-medium",
                    isPositive ? "text-green-600" : "text-red-600"
                  )}>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{Math.abs(change)}%</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className={cn(
              "p-3 rounded-lg",
              colorClasses[color],
              "bg-opacity-10"
            )}>
              <Icon className={cn("w-6 h-6", `text-${color}-600`)} />
            </div>
          </div>
        </CardContent>
        
        {/* Background Pattern */}
        <div className="absolute -right-8 -bottom-8 opacity-5">
          <Icon className="w-32 h-32" />
        </div>
      </Card>
    </motion.div>
  );
};

export default StatsCard;