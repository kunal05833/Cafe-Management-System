import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Coffee, 
  ShoppingBag, 
  CreditCard,
  Users,
  BarChart3,
  Settings,
  LogOut
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/menu', label: 'Menu Management', icon: Coffee },
    { path: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { path: '/admin/udhari', label: 'Udhari System', icon: CreditCard },
    { path: '/admin/customers', label: 'Customers', icon: Users },
    { path: '/admin/reports', label: 'Reports', icon: BarChart3 },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      className={cn(
        "fixed lg:relative z-40 h-full bg-card border-r transition-all duration-300",
        isOpen ? "w-64" : "w-0"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold gradient-text">Admin Panel</h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "hover:bg-muted"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button
            onClick={() => dispatch(logoutUser())}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;