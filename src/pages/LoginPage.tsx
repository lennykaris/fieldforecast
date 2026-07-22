import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, LogIn, Crown, UserCheck, ShieldCheck, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { login, loginWithPreset } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email);
      navigate('/dashboard');
    }
  };

  const handleQuickLogin = (preset: 'free' | 'vip' | 'admin') => {
    loginWithPreset(preset);
    if (preset === 'admin') navigate('/admin');
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#5EB8E8] to-cyan-400 flex items-center justify-center mx-auto shadow-lg shadow-[#5EB8E8]/20">
            <TrendingUp className="w-6 h-6 text-slate-950 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Welcome Back to <span className="text-[#5EB8E8]">Fieldforecasts</span>
          </h1>
          <p className="text-xs text-slate-400">
            Log in to access your subscriber dashboard and VIP match predictions.
          </p>
        </div>

        {/* 1-Click Demo Profiles Preset Banner */}
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-[#5EB8E8] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Instant Demo Profile Shortcuts</span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => handleQuickLogin('free')}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-center text-[10px] font-bold text-slate-200 transition-colors"
            >
              Free User
            </button>

            <button
              onClick={() => handleQuickLogin('vip')}
              className="p-2 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/40 text-center text-[10px] font-bold text-amber-400 transition-colors flex items-center justify-center space-x-1"
            >
              <Crown className="w-3 h-3 fill-amber-400" />
              <span>VIP Pro</span>
            </button>

            <button
              onClick={() => handleQuickLogin('admin')}
              className="p-2 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/40 text-center text-[10px] font-bold text-purple-300 transition-colors flex items-center justify-center space-x-1"
            >
              <ShieldCheck className="w-3 h-3 text-purple-300" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Standard Auth Form */}
        <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="subscriber@example.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5EB8E8]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Password</label>
                <a href="#forgot" className="text-[10px] text-[#5EB8E8] hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5EB8E8]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#5EB8E8] hover:bg-sky-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#5EB8E8]/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Log In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          <div className="text-center pt-2 text-xs text-slate-400">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-[#5EB8E8] font-bold hover:underline">
              Create Free Account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
