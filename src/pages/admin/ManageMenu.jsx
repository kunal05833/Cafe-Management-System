import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Edit2, Trash2, X, Save } from "lucide-react";
import { db } from "../../firebase/config"; // ✅ FIXED IMPORT PATH
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const ManageMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Hot Coffee",
    image: "☕",
    available: true,
  });

  const categories = [
    "Hot Coffee",
    "Cold Drinks",
    "Snacks",
    "Desserts",
    "Special",
  ];

  const emojis = ["☕", "🥤", "🥪", "🍰", "🍕", "🍔", "🌮", "🍜", "🍵", "🧃"];

  // ================================
  // ✅ Fetch menu from Firestore
  // ================================
  const fetchMenuItems = async () => {
    try {
      setLoading(true);

      const querySnapshot = await getDocs(collection(db, "menuItems"));

      const items = querySnapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setMenuItems(items);
    } catch (error) {
      console.error("Error fetching menu:", error);
      alert("Error fetching menu items. Check Firestore rules / paths.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  // ================================
  // Handle Input Change
  // ================================
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ================================
  // ✅ Add or Update item
  // ================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedData = {
      ...formData,
      price: Number(formData.price), // 🔥 ENSURE NUMBER
    };

    try {
      if (editingItem) {
        const itemRef = doc(db, "menuItems", editingItem.id);

        // 🔥 Do not save "id" inside firestore
        const { id, ...updatePayload } = sanitizedData;

        await updateDoc(itemRef, updatePayload);
        alert("Item updated!");
      } else {
        await addDoc(collection(db, "menuItems"), sanitizedData);
        alert("Item added!");
      }

      handleCloseModal();
      fetchMenuItems();
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error saving item.");
    }
  };

  // ================================
  // Delete item
  // ================================
  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;

    try {
      await deleteDoc(doc(db, "menuItems", id));
      setMenuItems(menuItems.filter((i) => i.id !== id));
      alert("Item deleted!");
    } catch (error) {
      console.error("Error deleting:", error);
      alert("Error deleting item.");
    }
  };

  // ================================
  // Open Edit Modal
  // ================================
  const handleEdit = (item) => {
    setEditingItem(item);

    // 🔥 remove id before editing
    const { id, ...rest } = item;

    setFormData(rest);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingItem(null);

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "Hot Coffee",
      image: "☕",
      available: true,
    });
  };

  // ================================
  // Search Filter
  // ================================
  const filteredItems = menuItems.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Menu Management 🍽️
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Add, edit, or remove menu items
            </p>
          </div>

          <motion.button
            onClick={() => setShowModal(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold shadow-lg"
          >
            <Plus className="w-5 h-5" /> Add New Item
          </motion.button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-amber-500"
            />
          </div>
        </div>

        {/* Menu Items Grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading menu...</p>
        ) : filteredItems.length === 0 ? (
          <p className="text-center text-gray-500">No menu items found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg"
              >
                <div className="relative h-40 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                  <div className="text-6xl">{item.image}</div>

                  <div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${
                      item.available
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {item.available ? "Available" : "Unavailable"}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>

                  <span className="px-3 py-1 bg-amber-100 text-amber-600 text-xs font-semibold rounded-full">
                    {item.category}
                  </span>

                  <div className="flex justify-between items-center mt-4">
                    <div className="text-2xl font-bold text-amber-600">
                      ₹{item.price}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 bg-blue-100 text-blue-600 rounded-xl"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* ================================
          Add / Edit Modal  
        ================================== */}
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={handleCloseModal}
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold">
                    {editingItem ? "Edit Item" : "Add New Item"}
                  </h2>
                  <button onClick={handleCloseModal}>
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="font-semibold mb-2 block">Item Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="font-semibold mb-2 block">Price (₹) *</label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        min="0"
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="font-semibold mb-2 block">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 resize-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Category */}
                    <div>
                      <label className="font-semibold mb-2 block">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Emoji */}
                    <div>
                      <label className="font-semibold mb-2 block">Icon</label>
                      <select
                        name="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border-2 text-2xl"
                      >
                        {emojis.map((em) => (
                          <option key={em} value={em}>
                            {em}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Available */}
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      name="available"
                      checked={formData.available}
                      onChange={handleInputChange}
                      className="w-5 h-5"
                    />
                    <label>Available for order</label>
                  </div>

                  {/* Submit Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2"
                    >
                      <Save className="w-5 h-5" />
                      {editingItem ? "Update Item" : "Add Item"}
                    </button>

                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-6 py-3 bg-gray-200 rounded-xl"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ManageMenu;
