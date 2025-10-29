import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Coffee, ShoppingCart, LogOut, Sun, Moon, Menu as MenuIcon, X, Home as HomeIcon, UtensilsCrossed, User2 } from "lucide-react";
import { logoutUser } from "../../features/auth/authSlice";
import { selectCartCount } from "../../features/cart/cartSlice";
import { cn } from "../../utils/cn";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((s) => s.auth);
  const cartCount = useSelector(selectCartCount);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const isDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  const linkClass = ({ isActive }) =>
    cn("inline-flex items-center gap-1 text-sm px-2 py-1 rounded-md transition-colors",
      isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-primary");

  const displayName = user?.name || user?.email?.split("@")[0] || "User";

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      setMobileOpen(false);
      navigate("/login", { replace: true });
    } catch {}
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur border-b">
      <div className="mx-auto max-w-7xl px-4">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Coffee className="w-7 h-7 text-primary" />
            <span className="font-bold text-lg">Café Delight</span>
          </Link>

          <div className="hidden md:flex items-center gap-4">
            <NavLink to="/" className={linkClass} end><HomeIcon className="w-4 h-4" />Home</NavLink>
            <NavLink to="/menu" className={linkClass}><UtensilsCrossed className="w-4 h-4" />Menu</NavLink>

            {isAuthenticated && user?.role === "customer" && (
              <>
                <NavLink to="/customer/orders" className={linkClass}>Orders</NavLink>
                <NavLink to="/customer/udhari" className={linkClass}>Udhari</NavLink>
              </>
            )}
            {isAuthenticated && user?.role === "admin" && (
              <NavLink to="/admin/dashboard" className={linkClass}>Admin</NavLink>
            )}
          </div>

          <div className="hidden md:flex items-center gap-2">
            {isAuthenticated && user?.role === "customer" && (
              <Link to="/customer/cart" className="relative">
                <ShoppingCart className="w-6 h-6 text-foreground hover:text-primary" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full text-[10px] w-4 h-4 grid place-items-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-muted" aria-label="Toggle Theme">
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {isAuthenticated ? (
              <>
                <span className="hidden lg:inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <User2 className="w-4 h-4" /> {displayName}
                </span>
                <button onClick={handleLogout} className="inline-flex items-center gap-1 text-sm px-3 py-2 rounded-md border hover:bg-muted">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:bg-primary/90">Login</Link>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            {isAuthenticated && user?.role === "customer" && (
              <Link to="/customer/cart" className="relative" onClick={() => setMobileOpen(false)}>
                <ShoppingCart className="w-6 h-6 text-foreground" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full text-[10px] w-4 h-4 grid place-items-center">
                    {cartCount}
                  </span>
                )}
              </Link>
            )}
            <button onClick={toggleTheme} className="p-2 rounded-md hover:bg-muted" aria-label="Toggle Theme">
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setMobileOpen((v) => !v)} className="p-2 rounded-md hover:bg-muted" aria-label="Menu">
              {mobileOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-card">
          <div className="px-4 py-3 grid gap-2">
            <NavLink end to="/" className={linkClass} onClick={() => setMobileOpen(false)}><HomeIcon className="w-4 h-4" />Home</NavLink>
            <NavLink to="/menu" className={linkClass} onClick={() => setMobileOpen(false)}><UtensilsCrossed className="w-4 h-4" />Menu</NavLink>
            {isAuthenticated && user?.role === "customer" && (
              <>
                <NavLink to="/customer/orders" className={linkClass} onClick={() => setMobileOpen(false)}>Orders</NavLink>
                <NavLink to="/customer/udhari" className={linkClass} onClick={() => setMobileOpen(false)}>Udhari</NavLink>
              </>
            )}
            {isAuthenticated && user?.role === "admin" && (
              <NavLink to="/admin/dashboard" className={linkClass} onClick={() => setMobileOpen(false)}>Admin</NavLink>
            )}

            <div className="pt-2 border-t mt-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <User2 className="w-4 h-4" />
                {isAuthenticated ? (user?.name || user?.email) : "Guest"}
              </span>
              {isAuthenticated ? (
                <button onClick={handleLogout} className="inline-flex items-center gap-1 text-sm px-3 py-2 rounded-md border hover:bg-muted">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              ) : (
                <Link to="/login" onClick={() => setMobileOpen(false)} className="bg-primary text-white px-4 py-2 rounded-md text-sm">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
export default Navbar;