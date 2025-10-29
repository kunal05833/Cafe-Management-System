import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '../ui/Tabs';
import { Input } from '../ui/Input';
import { Search, Filter } from 'lucide-react';
import { ORDER_STATUS } from '../../utils/constants';

const OrderFilters = ({ onFilterChange, onSearchChange }) => {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input
          type="text"
          placeholder="Search orders..."
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="all" onValueChange={onFilterChange}>
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value={ORDER_STATUS.PENDING}>Pending</TabsTrigger>
          <TabsTrigger value={ORDER_STATUS.PREPARING}>Preparing</TabsTrigger>
          <TabsTrigger value={ORDER_STATUS.READY}>Ready</TabsTrigger>
          <TabsTrigger value={ORDER_STATUS.DELIVERED}>Delivered</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default OrderFilters;