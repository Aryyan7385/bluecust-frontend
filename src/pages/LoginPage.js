import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Droplet, ArrowLeft } from 'lucide-react';
import { useAuth, API } from '@/App';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${API}/auth/login`, formData);
      login(response.data.token, response.data.user);
      toast.success('Login successful!');
      navigate(response.data.user.is_admin ? '/admin' : '/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Login failed');
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

          <h2 className="text-2xl font-syne font-bold text-center text-primary-900 mb-2">Welcome Back</h2>
          <p className="text-center text-slate-600 mb-8">Login to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6">
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
              data-testid="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 font-bold tracking-wide px-8 py-3"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          <p className="text-center text-slate-600 mt-6">
            Don't have an account?{' '}
            <button
              data-testid="go-to-register-btn"
              onClick={() => navigate('/register')}
              className="text-primary-600 font-semibold hover:text-primary-700 transition-colors"
            >
              Register
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
