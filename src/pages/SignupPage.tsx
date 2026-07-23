import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SignupPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      login(email, name || 'New Member');
      navigate('/dashboard');
    }
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
            Join <span className="text-[#0EA5E9]">Fieldforecasts</span>
          </h1>
          <p className="text-xs text-slate-500">
            Create your account to start receiving high-probability sports predictions.
          </p>
        </div>

        {/* Benefits List Banner */}
        <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-2 text-xs text-slate-700">
          <p className="font-bold text-[#0EA5E9] uppercase tracking-wider text-[10px]">Included with your free account:</p>
          <div className="space-y-1.5 pt-0.5">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#0EA5E9]" />
              <span>Access 3+ daily free football predictions</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#0EA5E9]" />
              <span>Daily email match briefing</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-[#0EA5E9]" />
              <span>Personal subscriber dashboard & stats</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Marcus Sterling"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="marcus@example.com"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Create Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0EA5E9]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#0EA5E9] hover:bg-sky-600 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center space-x-1.5"
            >
              <span>Create Account & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </form>

          <div className="text-center pt-2 text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="text-[#0EA5E9] font-bold hover:underline">
              Log In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
