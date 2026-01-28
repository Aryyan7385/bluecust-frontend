import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Droplet, ArrowLeft } from 'lucide-react';
import { useAuth, API } from '@/App';
import { toast } from 'sonner';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    contact_number: '',
    business_name: '',
    business_type: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/register`, formData);
      login(response.data.token, response.data.user);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Button
          data-testid="back-to-home-btn"
          onClick={() => navigate('/')}
          variant="ghost"
          className="mb-6 text-slate-600 hover:text-primary-600"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Button>

        <div className="backdrop-blur-xl bg-white/60 border border-white/50 shadow-lg rounded-2xl p-8">
          <div className="flex items-center justify-center space-x-2 mb-8">
            <Droplet className="w-8 h-8 text-primary-500" />
            <span className="text-3xl font-syne font-bold text-primary-900">BlueCust</span>
          </div>

          <h2 className="text-2xl font-syne font-bold text-center text-primary-900 mb-2">Get Started</h2>
          <p className="text-center text-slate-600 mb-8">Create your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="business_name" className="text-slate-700 font-medium mb-2 block">Business Name</Label>
              <Input
                id="business_name"
                data-testid="business-name-input"
                type="text"
                required
                value={formData.business_name}
                onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
                className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3 transition-all outline-none backdrop-blur-sm"
                placeholder="Your Restaurant/Hotel Name"
              />
            </div>

            <div>
              <Label htmlFor="business_type" className="text-slate-700 font-medium mb-2 block">Business Type</Label>
              <Select
                value={formData.business_type}
                onValueChange={(value) => setFormData({ ...formData, business_type: value })}
                required
              >
                <SelectTrigger data-testid="business-type-select" className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3">
                  <SelectValue placeholder="Select business type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                  <SelectItem value="hotel">Hotel</SelectItem>
                  <SelectItem value="cafe">Cafe</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="email" className="text-slate-700 font-medium mb-2 block">Email</Label>
              <Input
                id="email"
                data-testid="email-input"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3 transition-all outline-none backdrop-blur-sm"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <Label htmlFor="contact_number" className="text-slate-700 font-medium mb-2 block">Contact Number</Label>
              <Input
                id="contact_number"
                data-testid="contact-number-input"
                type="tel"
                required
                value={formData.contact_number}
                onChange={(e) => setFormData({ ...formData, contact_number: e.target.value })}
                className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3 transition-all outline-none backdrop-blur-sm"
                placeholder="9876543210"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-slate-700 font-medium mb-2 block">Password</Label>
              <Input
                id="password"
                data-testid="password-input"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="bg-white/50 border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 rounded-xl px-4 py-3 transition-all outline-none backdrop-blur-sm"
                placeholder="••••••••"
              />
            </div>

            <Button
              data-testid="register-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 font-bold tracking-wide px-8 py-3"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <p className="text-center text-slate-600 mt-6">
            Already have an account?{' '}
            <button
              data-testid="go-to-login-btn"
              onClick={() => navigate('/login')}
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Login
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
