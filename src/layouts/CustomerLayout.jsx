import React from "react";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import BottomNav from "../components/layout/BottomNav";
import CartFab from "../components/shell/CartFab";

const CustomerLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="pt-16 pb-24 md:pb-0">
        <Outlet />
      </motion.main>
      <CartFab />
      <BottomNav />
    </div>
  );
};
export default CustomerLayout;