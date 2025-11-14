import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Bell, Shield, CreditCard, Store, Mail, Globe } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    storeName: 'Cafe Hub',
    email: 'admin@cafehub.com',
    phone: '+91 9876543210',
    address: '123 Main Street, City, State',
    currency: 'INR',
    timezone: 'Asia/Kolkata',
    emailNotifications: true,
    smsNotifications: false,
    orderNotifications: true,
    paymentNotifications: true,
    minOrderValue: 50,
    deliveryCharge: 30,
    taxRate: 5,
    creditLimit: 5000
  });

  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
    alert('Settings saved successfully!');
  };

  const sections = [
    {
      title: 'Store Information',
      icon: Store,
      color: 'from-blue-500 to-cyan-600',
      fields: [
        { name: 'storeName', label: 'Store Name', type: 'text' },
        { name: 'email', label: 'Email', type: 'email' },
        { name: 'phone', label: 'Phone', type: 'tel' },
        { name: 'address', label: 'Address', type: 'text' }
      ]
    },
    {
      title: 'Regional Settings',
      icon: Globe,
      color: 'from-purple-500 to-pink-600',
      fields: [
        { 
          name: 'currency', 
          label: 'Currency', 
          type: 'select',
          options: ['INR', 'USD', 'EUR', 'GBP']
        },
        { 
          name: 'timezone', 
          label: 'Timezone', 
          type: 'select',
          options: ['Asia/Kolkata', 'America/New_York', 'Europe/London']
        }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      color: 'from-amber-500 to-orange-600',
      fields: [
        { name: 'emailNotifications', label: 'Email Notifications', type: 'checkbox' },
        { name: 'smsNotifications', label: 'SMS Notifications', type: 'checkbox' },
        { name: 'orderNotifications', label: 'Order Notifications', type: 'checkbox' },
        { name: 'paymentNotifications', label: 'Payment Notifications', type: 'checkbox' }
      ]
    },
    {
      title: 'Business Settings',
      icon: CreditCard,
      color: 'from-green-500 to-emerald-600',
      fields: [
        { name: 'minOrderValue', label: 'Minimum Order Value (₹)', type: 'number' },
        { name: 'deliveryCharge', label: 'Delivery Charge (₹)', type: 'number' },
        { name: 'taxRate', label: 'Tax Rate (%)', type: 'number' },
        { name: 'creditLimit', label: 'Default Credit Limit (₹)', type: 'number' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Settings ⚙️
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Configure your cafe settings
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </motion.button>
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {sections.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: sectionIndex * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${section.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {section.title}
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {section.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className={field.type === 'checkbox' ? 'md:col-span-2' : ''}>
                    {field.type === 'checkbox' ? (
                      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                        <input
                          type="checkbox"
                          id={field.name}
                          name={field.name}
                          checked={settings[field.name]}
                          onChange={handleChange}
                          className="w-5 h-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                        />
                        <label htmlFor={field.name} className="font-medium text-gray-900 dark:text-white cursor-pointer">
                          {field.label}
                        </label>
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          {field.label}
                        </label>
                        {field.type === 'select' ? (
                          <select
                            name={field.name}
                            value={settings[field.name]}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-500 outline-none transition-all text-gray-900 dark:text-white"
                          >
                            {field.options.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            value={settings[field.name]}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 focus:border-amber-500 dark:focus:border-amber-500 outline-none transition-all text-gray-900 dark:text-white"
                          />
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-3xl p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-red-600 dark:text-red-400" />
            <h2 className="text-xl font-bold text-red-600 dark:text-red-400">
              Danger Zone
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            These actions are irreversible. Please proceed with caution.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all">
              Reset All Data
            </button>
            <button className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all">
              Export Database
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;