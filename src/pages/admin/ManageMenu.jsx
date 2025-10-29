import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Label } from '../../components/ui/Label';
import { menuAPI } from '../../services/api/menuAPI';
import { toast } from 'sonner';

const ManageMenu = () => {
  const [items, setItems] = useState([]);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: 'coffee', imageURL: '' });

  const load = async () => {
    const data = await menuAPI.getAllItems();
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const price = parseFloat(form.price);
      const newItem = await menuAPI.addItem({ ...form, price });
      setItems((prev) => [newItem, ...prev]);
      toast.success('Menu item added');
      setForm({ name: '', description: '', price: '', category: 'coffee', imageURL: '' });
    } catch (e) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id, imageURL) => {
    if (!confirm('Delete item?')) return;
    await menuAPI.deleteItem(id, imageURL);
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast.success('Deleted');
  };

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <PageHeader title="Manage Menu" subtitle="Add or update menu items" />
      <Card>
        <CardHeader><CardTitle>Add New Item</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div className="space-y-1">
              <Label>Price (₹)</Label>
              <Input type="number" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label>Description</Label>
              <textarea className="w-full border rounded-lg p-2" rows="2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>Category</Label>
              <select className="border rounded-lg p-2 w-full" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                <option value="coffee">Coffee</option>
                <option value="snacks">Snacks</option>
                <option value="desserts">Desserts</option>
                <option value="beverages">Beverages</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label>Image URL</Label>
              <Input value={form.imageURL} onChange={(e) => setForm({ ...form, imageURL: e.target.value })} placeholder="https://..." />
            </div>
            <Button type="submit" variant="gradient" disabled={busy} className="sm:col-span-2">
              {busy ? 'Saving...' : 'Add Item'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <Card key={it.id} className="overflow-hidden">
            <img src={it.imageURL || 'https://via.placeholder.com/600x400?text=No+Image'} className="h-40 w-full object-cover" />
            <CardContent className="p-4">
              <h3 className="font-semibold">{it.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{it.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-primary font-bold">₹{it.price}</span>
                <Button variant="outline" size="sm" onClick={() => remove(it.id, it.imageURL)}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageMenu;