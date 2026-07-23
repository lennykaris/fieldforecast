import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Crown, ShieldCheck, Mail, Lock, Sparkles, ArrowRight } from 'lucide-react';
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-white">
      <div className="w-full max-w-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#0EA5E9] flex items-center justify-center mx-auto shadow-md shadow-sky-500/20">
            <TrendingUp className="w-6 h-6 text-white stroke-[2.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Welcome Back to <span className="text-[#0EA5E9]">Fieldforecasts</span>
          </h1>
          <p className="text-xs text-slate-500">
            Log in to access your subscriber dashboard and VIP match predictions.
          </p>
        </div>

        {/* 1-Click Demo Profiles Preset Banner */}
        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2.5">
          <div className="flex items-center space-x-1.5 text-xs font-bold text-[#0EA5E9] uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Instant Demo Profile Shortcuts</span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => handleQuickLogin('free')}
              className="p-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-center text-[10px] font-bold text-slate-800 transition-colors shadow-xs"
            >
              Free User
            </button>

            <button
              onClick={() => handleQuickLogin('vip')}
              className="p-2 rounded-xl bg-white hover:bg-sky-50 border border-sky-300 text-center text-[10px] font-bold text-[#0EA5E9] transition-colors flex items-center justify-center space-x-1 shadow-xs"
            >
              <Crown className="w-3 h-3 fill-[#0EA5E9]" />
              <span>VIP Pro</span>
            </button>

            <button
              onClick={() => handleQuickLogin('admin')}
              className="p-2 rounded-xl bg-white hover:bg-sky-50 border border-sky-300 text-center text-[10px] font-bold text-[#0EA5E9] transition-colors flex items-center justify-center space-x-1 shadow-xs"
            >
              <ShieldCheck className="w-3 h-3 text-[#0EA5E9]" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {/* Standard Auth Form */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="subscriber@example.com"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Password</label>
                <a href="#forgot" className="text-[10px] text-[#0EA5E9] hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0EA5E9] hover:bg-sky-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Log In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          <div className="text-center pt-2 text-xs text-slate-500">
            Don't have an account yet?{' '}
            <Link to="/signup" className="text-[#0EA5E9] font-bold hover:underline">
              Create Free Account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
