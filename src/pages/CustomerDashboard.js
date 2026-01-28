import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Droplet, LogOut, Package, Download, Plus } from 'lucide-react';
import { useAuth, API } from '@/App';
import { toast } from 'sonner';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderForm, setOrderForm] = useState({
    quantity: '',
    sticker_text: '',
    sticker_design_notes: '',
    payment_mode: ''
  });

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API}/orders/user/${user.email}`);
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/orders?user_email=${user.email}`, orderForm);
      toast.success('Order created successfully!');
      setOrderForm({ quantity: '', sticker_text: '', sticker_design_notes: '', payment_mode: '' });
      fetchOrders();
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = async (orderId) => {
    try {
      const response = await axios.get(`${API}/orders/${orderId}/pdf`, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `BlueCust_Order_${orderId.slice(0, 8)}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Bill downloaded!');
    } catch (error) {
      toast.error('Failed to download bill');
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
            <span className="text-2xl font-syne font-bold text-primary-900">BlueCust</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-slate-600">Welcome, <span className="font-semibold">{user?.business_name}</span></span>
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
            <h1 className="text-4xl font-syne font-bold text-primary-900 mb-2">Customer Dashboard</h1>
            <p className="text-slate-600">Manage your custom bottle orders</p>
          </motion.div>

          <Tabs defaultValue="orders" className="space-y-6">
            <TabsList className="bg-white/60 backdrop-blur-sm border border-slate-200">
              <TabsTrigger data-testid="orders-tab" value="orders" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
                <Package className="w-4 h-4 mr-2" /> My Orders
              </TabsTrigger>
              <TabsTrigger data-testid="new-order-tab" value="new-order" className="data-[state=active]:bg-primary-500 data-[state=active]:text-white">
                <Plus className="w-4 h-4 mr-2" /> Place New Order
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <div className="grid gap-6">
                {orders.length === 0 ? (
                  <Card className="backdrop-blur-xl bg-white/60 border border-white/50">
                    <CardContent className="py-12 text-center">
                      <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-500">No orders yet. Place your first order!</p>
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
                            <Button
                              data-testid={`download-btn-${order.id}`}
                              onClick={() => handleDownloadPDF(order.id)}
                              className="rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300"
                            >
                              <Download className="w-4 h-4 mr-2" /> Download Bill
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-slate-500 mb-1">Quantity</p>
                              <p className="font-semibold text-primary-900">{order.quantity} bottles</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500 mb-1">Total Amount</p>
                              <p className="font-semibold text-primary-900">₹{order.total_amount}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500 mb-1">Sticker Text</p>
                              <p className="font-semibold text-primary-900">{order.sticker_text}</p>
                            </div>
                            <div>
                              <p className="text-sm text-slate-500 mb-1">Payment Mode</p>
                              <p className="font-semibold text-primary-900 capitalize">{order.payment_mode}</p>
                            </div>
                            {order.sticker_design_notes && (
                              <div className="md:col-span-2">
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

            <TabsContent value="new-order">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="backdrop-blur-xl bg-white/60 border border-white/50">
                  <CardHeader>
                    <CardTitle className="text-2xl font-syne text-primary-900">Place New Order</CardTitle>
                    <CardDescription>Fill in the details for your custom bottle order</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateOrder} className="space-y-6">
                      <div>
                        <Label htmlFor="quantity" className="text-slate-700 font-medium mb-2 block">Quantity (Number of Bottles)</Label>
                        <Input
                          id="quantity"
                          data-testid="quantity-input"
                          type="number"
                          min="1"
                          required
                          value={orderForm.quantity}
                          onChange={(e) => setOrderForm({ ...orderForm, quantity: e.target.value })}
                          className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3"
                          placeholder="100"
                        />
                        {orderForm.quantity && (
                          <p className="text-sm text-slate-500 mt-2">
                            Total: ₹{orderForm.quantity * 16} (@ ₹16 per bottle)
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="sticker_text" className="text-slate-700 font-medium mb-2 block">Sticker Text (Your Brand Name)</Label>
                        <Input
                          id="sticker_text"
                          data-testid="sticker-text-input"
                          type="text"
                          required
                          value={orderForm.sticker_text}
                          onChange={(e) => setOrderForm({ ...orderForm, sticker_text: e.target.value })}
                          className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3"
                          placeholder="e.g., The Grand Hotel"
                        />
                      </div>

                      <div>
                        <Label htmlFor="sticker_design_notes" className="text-slate-700 font-medium mb-2 block">Design Notes (Optional)</Label>
                        <Textarea
                          id="sticker_design_notes"
                          data-testid="design-notes-input"
                          value={orderForm.sticker_design_notes}
                          onChange={(e) => setOrderForm({ ...orderForm, sticker_design_notes: e.target.value })}
                          className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3"
                          placeholder="Any specific design requirements, colors, logos, etc."
                          rows={4}
                        />
                      </div>

                      <div>
                        <Label htmlFor="payment_mode" className="text-slate-700 font-medium mb-2 block">Payment Mode</Label>
                        <Select
                          value={orderForm.payment_mode}
                          onValueChange={(value) => setOrderForm({ ...orderForm, payment_mode: value })}
                          required
                        >
                          <SelectTrigger data-testid="payment-mode-select" className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3">
                            <SelectValue placeholder="Select payment mode" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="online">Online (UPI: 7385751471@ybl)</SelectItem>
                            <SelectItem value="cash">Cash on Delivery</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button
                        data-testid="submit-order-btn"
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 font-bold tracking-wide px-8 py-3"
                      >
                        {loading ? 'Placing Order...' : 'Place Order'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
