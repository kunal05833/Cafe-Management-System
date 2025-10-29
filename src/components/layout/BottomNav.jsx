import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Coffee, ShoppingCart, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCartCount } from '../../features/cart/cartSlice';
import { cn } from '../../utils/cn';

const tabs = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/menu', label: 'Menu', icon: Coffee },
  { to: '/customer/cart', label: 'Cart', icon: ShoppingCart },
  { to: '/customer/profile', label: 'Profile', icon: User },
];

const BottomNav = () => {
  const count = useSelector(selectCartCount);
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t shadow-sm md:hidden">
      <div className="grid grid-cols-4">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <NavLink key={t.to} to={t.to} className={({isActive})=>cn("flex flex-col items-center justify-center py-2 text-xs", isActive?"text-primary font-semibold":"text-muted-foreground")}>
              <div className="relative">
                <Icon className="w-5 h-5" />
                {t.to === '/customer/cart' && count > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full text-[10px] w-4 h-4 grid place-items-center">{count}</span>
                )}
              </div>
              <span className="mt-1">{t.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
export default BottomNav;