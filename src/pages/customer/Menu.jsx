import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { fetchMenuItems, setSelectedCategory, setSearchQuery } from "../../features/menu/menuSlice";
import CategoryChips from "../../components/menu/CategoryChips";
import MenuCardV2 from "../../components/menu/MenuCardV2";
import { Input } from "../../components/ui/Input";
import { Search } from "lucide-react";

const Menu = () => {
  const dispatch = useDispatch();
  const { filteredItems, items, isLoading, categories, selectedCategory, searchQuery } = useSelector((s) => s.menu);
  const [localSearch, setLocalSearch] = useState(searchQuery || "");

  useEffect(() => { if (!items?.length) dispatch(fetchMenuItems()); }, [dispatch]);
  useEffect(() => { const t = setTimeout(() => dispatch(setSearchQuery(localSearch)), 250); return () => clearTimeout(t); }, [localSearch, dispatch]);

  return (
    <div className="pb-24 pt-4 px-4 max-w-5xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <Input value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} placeholder="Search coffee, snacks…" className="pl-10" />
      </div>
      <div className="mt-3">
        <CategoryChips categories={categories} selected={selectedCategory} onChange={(c)=>dispatch(setSelectedCategory(c))} />
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-56 bg-muted rounded-xl animate-pulse" />)
        ) : filteredItems.length === 0 ? (
          <p className="text-center text-muted-foreground py-16">No items found</p>
        ) : (
          filteredItems.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <MenuCardV2 item={item} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
export default Menu;