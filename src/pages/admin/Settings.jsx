import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Store, Bell, Shield, Palette } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { Switch } from '../../components/ui/Switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import PageHeader from '../../components/common/PageHeader';
import { toast } from 'sonner';

const Settings = () => {
  const [settings, setSettings] = useState({
    storeName: 'Café Delight',
    storeEmail: 'hello@cafedelight.com',
    storePhone: '+91 98765 43210',
    storeAddress: '123 Coffee Street, Mumbai',
    taxRate: 5,
    currency: 'INR',
    notifications: {
      newOrder: true,
      lowStock: true,
      dailyReport: false,
      customerFeedback: true
    },
    theme: 'light',
    autoAcceptOrders: false,
    orderPrefix: 'ORD',
    udhariLimit: 5000
  });

  const handleSave = () => {
    // Save settings to Firebase
    toast.success('Settings saved successfully!');
  };

  const handleChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (type, value) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: value
      }
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Configure your café management system"
      />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="w-5 h-5" />
                Store Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={settings.storeName}
                    onChange={(e) => handleChange('storeName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={settings.storeEmail}
                    onChange={(e) => handleChange('storeEmail', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Phone</Label>
                  <Input
                    id="storePhone"
                    value={settings.storePhone}
                    onChange={(e) => handleChange('storePhone', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => handleChange('taxRate', parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeAddress">Address</Label>
                <textarea
                  id="storeAddress"
                  value={settings.storeAddress}
                  onChange={(e) => handleChange('storeAddress', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  rows="3"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
                        <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">New Order Notifications</p>
                    <p className="text-sm text-muted-foreground">Get notified when new orders are placed</p>
                  </div>
                  <Switch
                    checked={settings.notifications.newOrder}
                    onCheckedChange={(value) => handleNotificationChange('newOrder', value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Low Stock Alerts</p>
                    <p className="text-sm text-muted-foreground">Get alerts when items are running low</p>
                  </div>
                  <Switch
                    checked={settings.notifications.lowStock}
                    onCheckedChange={(value) => handleNotificationChange('lowStock', value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Daily Reports</p>
                    <p className="text-sm text-muted-foreground">Receive daily sales and performance reports</p>
                  </div>
                  <Switch
                    checked={settings.notifications.dailyReport}
                    onCheckedChange={(value) => handleNotificationChange('dailyReport', value)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Customer Feedback</p>
                    <p className="text-sm text-muted-foreground">Get notified about customer reviews</p>
                  </div>
                  <Switch
                    checked={settings.notifications.customerFeedback}
                    onCheckedChange={(value) => handleNotificationChange('customerFeedback', value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Appearance Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="grid grid-cols-3 gap-4">
                  {['light', 'dark', 'system'].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => handleChange('theme', theme)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        settings.theme === theme
                          ? 'border-primary bg-primary/10'
                          : 'border-muted hover:border-primary/50'
                      }`}
                    >
                      <p className="font-medium capitalize">{theme}</p>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Advanced Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto-Accept Orders</p>
                    <p className="text-sm text-muted-foreground">Automatically accept new orders</p>
                  </div>
                  <Switch
                    checked={settings.autoAcceptOrders}
                    onCheckedChange={(value) => handleChange('autoAcceptOrders', value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderPrefix">Order ID Prefix</Label>
                  <Input
                    id="orderPrefix"
                    value={settings.orderPrefix}
                    onChange={(e) => handleChange('orderPrefix', e.target.value)}
                    placeholder="ORD"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="udhariLimit">Default Udhari Limit (₹)</Label>
                  <Input
                    id="udhariLimit"
                    type="number"
                    value={settings.udhariLimit}
                    onChange={(e) => handleChange('udhariLimit', parseFloat(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end">
        <Button variant="gradient" onClick={handleSave}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;