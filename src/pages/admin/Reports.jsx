import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Download, Calendar, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import PageHeader from '../../components/common/PageHeader';
import SalesChart from '../../components/dashboard/SalesChart';
import RevenueChart from '../../components/dashboard/RevenueChart';
import { formatCurrency, formatDate } from '../../utils/helpers';

const Reports = () => {
  const [dateRange, setDateRange] = useState('week');
  const [reportType, setReportType] = useState('sales');

  // Sample data
  const salesData = [
    { name: 'Mon', sales: 4000 },
    { name: 'Tue', sales: 3000 },
    { name: 'Wed', sales: 5000 },
    { name: 'Thu', sales: 2780 },
    { name: 'Fri', sales: 6890 },
    { name: 'Sat', sales: 8390 },
    { name: 'Sun', sales: 7490 },
  ];

  const revenueData = [
    { category: 'Coffee', revenue: 12000, orders: 450 },
    { category: 'Snacks', revenue: 8000, orders: 320 },
    { category: 'Desserts', revenue: 6000, orders: 180 },
    { category: 'Beverages', revenue: 4000, orders: 150 },
  ];

  const summaryStats = {
    totalRevenue: 45231,
    totalOrders: 1100,
    averageOrderValue: 41.12,
    topProduct: 'Cappuccino',
    growthRate: 12.5
  };

  const handleExport = (format) => {
    // Export logic here
    console.log(`Exporting ${reportType} report in ${format} format`);
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Comprehensive business insights and performance metrics"
      >
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport('pdf')}>
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport('excel')}>
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </PageHeader>

      {/* Date Range Selector */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <span className="font-medium">Date Range:</span>
            </div>
            <div className="flex gap-2">
              {['today', 'week', 'month', 'year'].map((range) => (
                <Button
                  key={range}
                  variant={dateRange === range ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setDateRange(range)}
                  className="capitalize"
                >
                  {range}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">{formatCurrency(summaryStats.totalRevenue)}</p>
              <p className="text-xs text-green-600">+{summaryStats.growthRate}% from last period</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <p className="text-2xl font-bold">{summaryStats.totalOrders}</p>
              <p className="text-xs text-muted-foreground">Across all categories</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Avg Order Value</p>
              <p className="text-2xl font-bold">{formatCurrency(summaryStats.averageOrderValue)}</p>
              <p className="text-xs text-muted-foreground">Per transaction</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Top Product</p>
              <p className="text-2xl font-bold">{summaryStats.topProduct}</p>
              <p className="text-xs text-muted-foreground">Best seller</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-muted-foreground">Growth Rate</p>
              <p className="text-2xl font-bold text-green-600">+{summaryStats.growthRate}%</p>
              <p className="text-xs text-muted-foreground">vs last period</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Report Tabs */}
      <Tabs value={reportType} onValueChange={setReportType}>
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-4">
          <SalesChart data={salesData} title="Sales Trend" />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <RevenueChart data={revenueData} />
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Product Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Product performance table */}
              <div className="space-y-4">
                {revenueData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="font-medium">{item.category}</span>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(item.revenue)}</p>
                      <p className="text-sm text-muted-foreground">{item.orders} orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Customer analytics coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;