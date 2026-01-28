import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Droplet, LogOut, Package, Users, Trash2, Plus } from 'lucide-react';
import { useAuth, API } from '@/App';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [supplierForm, setSupplierForm] = useState({
    name: '',
    supplier_type: '',
    contact_number: '',
    email: '',
    address: ''
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/orders`);
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(`${API}/admin/suppliers`);
      setSuppliers(response.data);
    } catch (error) {
      toast.error('Failed to fetch suppliers');
    }
  };

  useEffect(() => {
    fetchOrders();
    fetchSuppliers();
  }, []);

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/admin/suppliers`, supplierForm);
      toast.success('Supplier added successfully!');
      setSupplierForm({ name: '', supplier_type: '', contact_number: '', email: '', address: '' });
      fetchSuppliers();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to add supplier');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSupplier = async (supplierId) => {
    if (!window.confirm('Are you sure you want to delete this supplier?')) return;
    try {
      await axios.delete(`${API}/admin/suppliers/${supplierId}`);
      toast.success('Supplier deleted');
      fetchSuppliers();
    } catch (error) {
      toast.error('Failed to delete supplier');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/80 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplet className="w-8 h-8 text-primary-500" />
            <span className="text-2xl font-syne font-bold text-primary-900">BlueCust Admin</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-600">Admin Panel</span>
            <Button
              data-testid="logout-btn"
              onClick={handleLogout}
              variant="ghost"
              className="text-slate-600 hover:text-red-600"
            >
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-syne font-bold text-primary-900 mb-2">Admin Dashboard</h1>
            <p className="text-slate-600">Manage orders and suppliers</p>
          </motion.div>

          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="bg-white/60 backdrop-blur-sm border border-slate-200">
              <TabsTrigger data-testid="orders-tab" value="orders" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
                <Package className="w-4 h-4 mr-2" /> All Orders
              </TabsTrigger>
              <TabsTrigger data-testid="suppliers-tab" value="suppliers" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
                <Users className="w-4 h-4 mr-2" /> Suppliers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <div className="grid gap-6">
                {orders.length === 0 ? (
                  <Card className="backdrop-blur-xl bg-white/60 border border-white/50">
                    <CardContent className="py-12 text-center">
                      <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">No orders yet</p>
                    </CardContent>
                  </Card>
                ) : (
                  orders.map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Card className="backdrop-blur-xl bg-white/60 border border-white/50 hover:shadow-lg transition-all">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-xl font-syne text-primary-900">Order #{order.id.slice(0, 8)}</CardTitle>
                              <CardDescription>{new Date(order.order_date).toLocaleDateString()}</CardDescription>
                            </div>
                            <div className="px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-sm font-medium capitalize">
                              {order.status}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm text-slate-500 mb-1">Business Name</p>
                              <p className="font-semibold text-primary-900">{order.business_name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500 mb-1">Contact</p>
                              <p className="font-semibold text-primary-900">{order.contact_number}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500 mb-1">Email</p>
                              <p className="font-semibold text-primary-900">{order.user_email}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500 mb-1">Quantity</p>
                              <p className="font-semibold text-primary-900">{order.quantity} bottles</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500 mb-1">Total Amount</p>
                              <p className="font-semibold text-primary-900">₹{order.total_amount}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500 mb-1">Payment Mode</p>
                              <p className="font-semibold text-primary-900 capitalize">{order.payment_mode}</p>
                            </div>
                            <div className="md:col-span-3">
                              <p className="text-sm text-slate-500 mb-1">Sticker Text</p>
                              <p className="font-semibold text-primary-900">{order.sticker_text}</p>
                            </div>
                            {order.sticker_design_notes && (
                              <div className="md:col-span-3">
                                <p className="text-sm text-slate-500 mb-1">Design Notes</p>
                                <p className="text-slate-700">{order.sticker_design_notes}</p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="suppliers">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="backdrop-blur-xl bg-white/60 border border-white/50">
                    <CardHeader>
                      <CardTitle className="text-2xl font-syne text-primary-900 flex items-center">
                        <Plus className="w-6 h-6 mr-2" /> Add New Supplier
                      </CardTitle>
                      <CardDescription>Add bottle manufacturer or water supplier</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleAddSupplier} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name" className="text-slate-700 font-medium mb-2 block">Supplier Name</Label>
                            <Input
                              id="name"
                              data-testid="supplier-name-input"
                              type="text"
                              required
                              value={supplierForm.name}
                              onChange={(e) => setSupplierForm({ ...supplierForm, name: e.target.value })}
                              className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3"
                              placeholder="ABC Bottle Manufacturing"
                            />
                          </div>

                          <div>
                            <Label htmlFor="supplier_type" className="text-slate-700 font-medium mb-2 block">Supplier Type</Label>
                            <Select
                              value={supplierForm.supplier_type}
                              onValueChange={(value) => setSupplierForm({ ...supplierForm, supplier_type: value })}
                              required
                            >
                              <SelectTrigger data-testid="supplier-type-select" className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="bottle_manufacturer">Bottle Manufacturer</SelectItem>
                                <SelectItem value="water_supplier">Water Supplier</SelectItem>
                                <SelectItem value="both">Both</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label htmlFor="supplier_email" className="text-slate-700 font-medium mb-2 block">Email</Label>
                            <Input
                              id="supplier_email"
                              data-testid="supplier-email-input"
                              type="email"
                              required
                              value={supplierForm.email}
                              onChange={(e) => setSupplierForm({ ...supplierForm, email: e.target.value })}
                              className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3"
                              placeholder="supplier@example.com"
                            />
                          </div>

                          <div>
                            <Label htmlFor="supplier_contact" className="text-slate-700 font-medium mb-2 block">Contact Number</Label>
                            <Input
                              id="supplier_contact"
                              data-testid="supplier-contact-input"
                              type="tel"
                              required
                              value={supplierForm.contact_number}
                              onChange={(e) => setSupplierForm({ ...supplierForm, contact_number: e.target.value })}
                              className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3"
                              placeholder="9876543210"
                            />
                          </div>

                          <div className="md:col-span-2">
                            <Label htmlFor="supplier_address" className="text-slate-700 font-medium mb-2 block">Address</Label>
                            <Input
                              id="supplier_address"
                              data-testid="supplier-address-input"
                              type="text"
                              required
                              value={supplierForm.address}
                              onChange={(e) => setSupplierForm({ ...supplierForm, address: e.target.value })}
                              className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3"
                              placeholder="123 Industrial Area, City, State - PIN"
                            />
                          </div>
                        </div>

                        <Button
                          data-testid="add-supplier-btn"
                          type="submit"
                          disabled={loading}
                          className="w-full rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 font-bold tracking-wide px-8 py-3"
                        >
                          {loading ? 'Adding...' : 'Add Supplier'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>

                <div className="grid gap-6">
                  {suppliers.length === 0 ? (
                    <Card className="backdrop-blur-xl bg-white/60 border border-white/50">
                      <CardContent className="py-12 text-center">
                        <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">No suppliers added yet</p>
                      </CardContent>
                    </Card>
                  ) : (
                    suppliers.map((supplier) => (
                      <motion.div
                        key={supplier.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <Card className="backdrop-blur-xl bg-white/60 border border-white/50 hover:shadow-lg transition-all">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-xl font-syne text-primary-900">{supplier.name}</CardTitle>
                                <CardDescription className="capitalize">{supplier.supplier_type.replace('_', ' ')}</CardDescription>
                              </div>
                              <Button
                                data-testid={`delete-supplier-${supplier.id}`}
                                onClick={() => handleDeleteSupplier(supplier.id)}
                                variant="ghost"
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid md:grid-cols-3 gap-4">
                              <div>
                                <p className="text-sm text-slate-500 mb-1">Email</p>
                                <p className="font-semibold text-primary-900">{supplier.email}</p>
                              </div>
                              <div>
                                <p className="text-sm text-slate-500 mb-1">Contact</p>
                                <p className="font-semibold text-primary-900">{supplier.contact_number}</p>
                              </div>
                              <div className="md:col-span-3">
                                <p className="text-sm text-slate-500 mb-1">Address</p>
                                <p className="text-slate-700">{supplier.address}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
