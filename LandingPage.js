import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Droplet, Award, TrendingUp, Users, Phone, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/App';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-lg bg-white/80 border-b border-slate-200/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <Droplet className="w-8 h-8 text-primary-500" />
            <span className="text-2xl font-syne font-bold text-primary-900">BlueCust</span>
          </motion.div>
          <div className="flex items-center space-x-4">
            {user ? (
              <Button
                data-testid="dashboard-btn"
                onClick={() => navigate(user.is_admin ? '/admin' : '/dashboard')}
                className="rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 font-bold tracking-wide px-8 py-3"
              >
                Dashboard
              </Button>
            ) : (
              <>
                <Button
                  data-testid="login-btn"
                  onClick={() => navigate('/login')}
                  variant="ghost"
                  className="text-slate-600 hover:text-primary-600"
                >
                  Login
                </Button>
                <Button
                  data-testid="register-btn"
                  onClick={() => navigate('/register')}
                  className="rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 font-bold tracking-wide px-8 py-3"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="water-ripple" style={{ top: '10%', left: '10%', width: '300px', height: '300px', animationDelay: '0s' }} />
          <div className="water-ripple" style={{ top: '60%', right: '10%', width: '400px', height: '400px', animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-7xl font-syne font-bold text-primary-900 leading-tight tracking-tight mb-6">
              Build Your Brand
              <span className="block bg-gradient-to-r from-secondary-900 to-primary-500 bg-clip-text text-transparent">
                One Bottle at a Time
              </span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Stop promoting other brands. Get custom water bottles with your restaurant, cafe, or hotel branding. Better pricing, better branding, better business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                data-testid="cta-get-started-btn"
                onClick={() => navigate('/register')}
                className="rounded-full bg-gradient-to-r from-primary-500 to-cyan-400 text-white shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-300 font-bold tracking-wide px-8 py-4 text-lg"
              >
                Get Started <ArrowRight className="ml-2" />
              </Button>
              <Button
                data-testid="contact-btn"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
                className="rounded-full border-2 border-primary-500 text-primary-600 hover:bg-primary-50 transition-all duration-300 font-bold px-8 py-4 text-lg"
              >
                Contact Us
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <motion.img
              src="https://images.unsplash.com/photo-1638688569176-5b6db19f9d2a?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NjZ8MHwxfHNlYXJjaHwyfHxnbGFzcyUyMHdhdGVyJTIwYm90dGxlJTIwYnJhbmRpbmclMjBtb2NrdXB8ZW58MHx8fHwxNzY5NjA2NjI5fDA&ixlib=rb-4.1.0&q=85"
              alt="Custom branded water bottle"
              className="w-full h-auto rounded-2xl shadow-2xl animate-float"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: Award, value: '₹16', label: 'Per Bottle' },
            { icon: TrendingUp, value: '100%', label: 'Brand Value' },
            { icon: Users, value: '7', label: 'Team Members' },
            { icon: Droplet, value: '∞', label: 'Customization' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <stat.icon className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <div className="text-3xl font-syne font-bold text-primary-900 mb-2">{stat.value}</div>
              <div className="text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-syne font-bold text-center text-primary-900 mb-16"
          >
            How It Works
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Register', desc: 'Sign up with your business details and contact information.' },
              { step: '02', title: 'Customize', desc: 'Choose quantity and specify your branding text for bottle stickers.' },
              { step: '03', title: 'Get Delivered', desc: 'Download bill, make payment, and receive custom bottles at your location.' }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: idx * 0.2 }}
                className="backdrop-blur-xl bg-white/60 border border-white/50 shadow-lg rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-6xl font-syne font-bold text-primary-100 mb-4">{item.step}</div>
                <h3 className="text-2xl font-syne font-bold text-primary-900 mb-4">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About/CEO Section */}
      <section className="py-24 px-6 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <img
              src="https://images.unsplash.com/photo-1676304918177-d60a7e1c7218?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTN8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGluZGlhbiUyMG1hbGUlMjBjZW8lMjBwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdHxlbnwwfHx8fDE3Njk2MDY2MzV8MA&ixlib=rb-4.1.0&q=85"
              alt="Aryan Singh - CEO"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl lg:text-5xl font-syne font-bold text-primary-900 mb-6">Meet Our Founder</h2>
            <h3 className="text-2xl font-syne font-semibold text-primary-600 mb-4">Aryan Singh, CEO</h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              From struggling entrepreneur to building BlueCust, Aryan identified a gap in the market where restaurants and hotels were unknowingly promoting other brands through generic water bottles.
            </p>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              With a dedicated team of 7 passionate individuals, we're on a mission to help businesses build their brand identity through custom water bottles at unbeatable prices.
            </p>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-1 bg-gradient-to-r from-primary-500 to-cyan-400 rounded-full" />
              <span className="text-slate-500 font-medium">Team of 7 Strong</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-syne font-bold text-primary-900 mb-6"
          >
            Get in Touch
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 mb-12"
          >
            Ready to build your brand? Contact us today to get started.
          </motion.p>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-xl bg-white/60 border border-white/50 shadow-lg rounded-2xl p-12"
          >
            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-primary-500 mt-1" />
                <div>
                  <div className="font-syne font-semibold text-primary-900 mb-1">Phone</div>
                  <a href="tel:7385751471" className="text-slate-600 hover:text-primary-600 transition-colors">
                    7385751471
                  </a>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-primary-500 mt-1" />
                <div>
                  <div className="font-syne font-semibold text-primary-900 mb-1">Email</div>
                  <a href="mailto:aryanrajput7385@gmail.com" className="text-slate-600 hover:text-primary-600 transition-colors break-all">
                    aryanrajput7385@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-secondary-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Droplet className="w-6 h-6" />
            <span className="text-xl font-syne font-bold">BlueCust</span>
          </div>
          <p className="text-blue-200">Building brands, one bottle at a time.</p>
          <p className="text-blue-300 text-sm mt-4">&copy; 2025 BlueCust. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;