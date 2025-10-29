import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Coffee, ArrowRight, ShoppingBag, CreditCard, User } from 'lucide-react';
import { Button } from '../../components/ui/Button';

const Home = () => {
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const name = user?.name || user?.email?.split('@')[0] || 'there';

  // Logged-in view
  if (isAuthenticated) {
    return (
      <div className="min-h-screen pb-24 pt-6 px-4 max-w-5xl mx-auto">
        {/* Greeting */}
        <div className="bg-card border rounded-xl p-5 sm:p-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 grid place-items-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Welcome back</p>
              <h1 className="text-xl font-semibold capitalize">{name}</h1>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link to="/menu" className="group">
            <div className="bg-card border rounded-xl p-4 hover:shadow-sm transition">
              <div className="w-10 h-10 rounded-lg bg-primary/10 grid place-items-center mb-2">
                <Coffee className="w-5 h-5 text-primary" />
              </div>
              <p className="font-medium">Browse Menu</p>
              <p className="text-xs text-muted-foreground">Order your favorite</p>
            </div>
          </Link>

          <Link to="/customer/orders" className="group">
            <div className="bg-card border rounded-xl p-4 hover:shadow-sm transition">
              <div className="w-10 h-10 rounded-lg bg-primary/10 grid place-items-center mb-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <p className="font-medium">My Orders</p>
              <p className="text-xs text-muted-foreground">Track & history</p>
            </div>
          </Link>

          <Link to="/customer/udhari" className="group">
            <div className="bg-card border rounded-xl p-4 hover:shadow-sm transition">
              <div className="w-10 h-10 rounded-lg bg-primary/10 grid place-items-center mb-2">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <p className="font-medium">Udhari</p>
              <p className="text-xs text-muted-foreground">Balance & payments</p>
            </div>
          </Link>

          <Link to="/customer/profile" className="group">
            <div className="bg-card border rounded-xl p-4 hover:shadow-sm transition">
              <div className="w-10 h-10 rounded-lg bg-primary/10 grid place-items-center mb-2">
                <User className="w-5 h-5 text-primary" />
              </div>
              <p className="font-medium">Profile</p>
              <p className="text-xs text-muted-foreground">Account settings</p>
            </div>
          </Link>
        </div>

        {/* Callouts */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-primary/10 to-transparent border rounded-xl p-4">
            <h3 className="font-semibold mb-1">Order faster</h3>
            <p className="text-sm text-muted-foreground">Use quick actions to repeat your last order.</p>
          </div>
          <div className="bg-gradient-to-r from-primary/10 to-transparent border rounded-xl p-4">
            <h3 className="font-semibold mb-1">Track your Udhari</h3>
            <p className="text-sm text-muted-foreground">Check balance and make payments any time.</p>
          </div>
        </div>
      </div>
    );
  }

  // Guest view (no login form here)
  return (
    <div className="min-h-screen grid place-items-center px-4">
      <div className="text-center max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
          <Coffee className="w-4 h-4" />
          <span className="text-sm font-medium">Café Delight</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Fresh coffee. Fast checkout. Mobile-first.
        </h1>
        <p className="text-muted-foreground mb-6">
          Browse our menu, add to cart, and track your orders in real-time.
        </p>
        <div className="flex items-center gap-3 justify-center">
          <Link to="/menu">
            <Button variant="gradient" className="group">
              Explore Menu
              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition" />
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="outline">Sign in</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
