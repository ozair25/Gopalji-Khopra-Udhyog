import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, Mail, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('admin@gopalji');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Fallback static bypass login "for now"
    if (email === 'admin@gopalji' && password === 'gopalji@123') {
      sessionStorage.setItem('isOfflineAdmin', 'true');
      setLoading(false);
      navigate('/admin');
      return;
    }

    try {
      // NOTE: Using a mock-like behavior for this specific demo login if user hasn't created the user in console yet
      // BUT for real firebase auth, we'll try to sign in.
      // If the user hasn't set up the email/password provider, this might fail.
      await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.removeItem('isOfflineAdmin');
      navigate('/admin');
    } catch (err: any) {
      console.error(err);
      setError('Invalid credentials. Please ensure admin@gopalji and correct password are used.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-light flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-warm-white p-10 rounded-[2.5rem] shadow-2xl border border-gold-accent/10"
      >
        <div className="text-center mb-10">
          <div className="flex flex-col items-center mb-6">
            <span className="text-3xl font-bold tracking-tighter text-coconut-brown leading-none">GOPALJI</span>
            <span className="text-[10px] tracking-[0.4em] uppercase font-semibold text-gold-accent">Khopra Udhyog</span>
          </div>
          <h2 className="text-2xl font-serif text-coconut-brown">Admin Portal</h2>
          <p className="text-xs text-coconut-brown/50 mt-2">Secure access for commercial leads</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gold-accent px-1 italic">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-accent opacity-40" size={16} />
              <input 
                type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-cream-light/30 border border-gold-accent/10 rounded-xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:border-gold-accent transition-colors" 
                placeholder="admin@gopalji"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gold-accent px-1 italic">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-accent opacity-40" size={16} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cream-light/30 border border-gold-accent/10 rounded-xl pl-12 pr-5 py-4 text-sm focus:outline-none focus:border-gold-accent transition-colors" 
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {error && (
            <p className="text-[10px] text-red-500 font-bold bg-red-50 p-3 rounded-lg border border-red-100">{error}</p>
          )}

          <button 
            disabled={loading}
            type="submit"
            className="w-full bg-coconut-brown text-warm-white py-5 rounded-xl text-[10px] uppercase font-black tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-gold-accent transition-all shadow-xl shadow-coconut-brown/10 disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : 'Authenticate Access'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
