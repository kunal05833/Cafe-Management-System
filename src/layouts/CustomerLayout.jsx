import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { 
  FaHome, FaUtensils, FaShoppingCart, FaUser, 
  FaBell, FaGift, FaSignOutAlt, FaBars, FaTimes,
  FaHistory, FaCalendarAlt
} from 'react-icons/fa';

export default function CustomerLayout() {
  const { user, logout } = useAuth();
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/login');
    }
  };

  const menuItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/menu', icon: FaUtensils, label: 'Menu' },
    { path: '/cart', icon: FaShoppingCart, label: 'Cart', badge: cartItems.length },
    { path: '/orders', icon: FaHistory, label: 'Orders' },
    { path: '/reservations', icon: FaCalendarAlt, label: 'Reservations' },
    { path: '/rewards', icon: FaGift, label: 'Rewards' },
    { path: '/profile', icon: FaUser, label: 'Profile' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <FaUtensils className="text-white text-xl" />
              </div>
              <span className="text-xl font-bold text-gray-800">Cafe</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all relative ${
                      isActive(item.path)
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon />
                    <span className="font-medium">{item.label}</span>
                    {item.badge > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all ml-2"
              >
                <FaSignOutAlt />
                <span className="font-medium">Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-600 p-2"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 relative ${
                      isActive(item.path)
                        ? 'bg-orange-500 text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                    {item.badge > 0 && (
                      <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 w-full"
              >
                <FaSignOutAlt size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">About Us</h3>
              <p className="text-gray-400 text-sm">
                Your favorite cafe management system. Order online, track your orders, and enjoy delicious food!
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/menu" className="text-gray-400 hover:text-white">Menu</Link></li>
                <li><Link to="/orders" className="text-gray-400 hover:text-white">My Orders</Link></li>
                <li><Link to="/reservations" className="text-gray-400 hover:text-white">Reservations</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Phone: +91 1234567890</li>
                <li>Email: info@cafe.com</li>
                <li>Address: Your Location</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Cafe Management System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}