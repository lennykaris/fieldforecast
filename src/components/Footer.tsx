import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ShieldAlert, CheckCircle2, Mail, Send, Award, HeartHandshake } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-[#070c18] border-t border-slate-800 text-slate-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#5EB8E8] to-cyan-400 flex items-center justify-center shadow-lg shadow-[#5EB8E8]/20">
                <TrendingUp className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white font-mono">
                FIELD<span className="text-[#5EB8E8]">FORECASTS</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Fieldforecasts leverages advanced predictive modeling and expert match analytics to deliver high-probability sports tips across Europe's top football leagues.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-semibold bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <Award className="w-4 h-4 text-[#5EB8E8]" />
                <span>87.4% Verified Win Rate</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-slate-300 font-semibold bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60">
                <HeartHandshake className="w-4 h-4 text-amber-400" />
                <span>14,500+ VIP Members</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-[#5EB8E8] transition-colors">Home & Highlights</Link>
              </li>
              <li>
                <Link to="/tips" className="hover:text-[#5EB8E8] transition-colors">Daily Free Predictions</Link>
              </li>
              <li>
                <Link to="/vip" className="hover:text-amber-400 transition-colors font-semibold text-amber-300/90">VIP Subscription Pass</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#5EB8E8] transition-colors">Subscriber Dashboard</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#5EB8E8] transition-colors">Admin CMS Portal</Link>
              </li>
            </ul>
          </div>

          {/* Quick Demo Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Account Access</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/login" className="hover:text-[#5EB8E8] transition-colors">Member Log In</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-[#5EB8E8] transition-colors">Create Free Account</Link>
              </li>
              <li>
                <span className="text-slate-500">Stripe & PayPal Supported (Demo)</span>
              </li>
              <li>
                <span className="text-slate-500">Telegram VIP Alerts</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Daily Free Briefing</h4>
            <p className="text-xs text-slate-400">
              Get 1 top-tier free pick delivered directly to your inbox every morning.
            </p>

            {subscribed ? (
              <div className="p-3 bg-[#5EB8E8]/10 border border-[#5EB8E8]/30 rounded-lg flex items-center space-x-2 text-xs text-[#5EB8E8] font-medium">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Subscribed! Check your inbox tomorrow.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5EB8E8]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#5EB8E8] hover:bg-sky-300 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-1.5"
                >
                  <span>Subscribe Free Tips</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Responsible Gaming Notice */}
        <div className="py-6 border-b border-slate-800/80 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-1 flex justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center font-bold text-red-400 text-sm">
              18+
            </div>
          </div>
          <div className="md:col-span-11 text-xs text-slate-500 space-y-1">
            <div className="flex items-center space-x-1.5 text-slate-400 font-medium">
              <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>Responsible Gaming & Disclaimer</span>
            </div>
            <p className="leading-relaxed">
              Fieldforecasts is an informational sports analytics and prediction demo website. All content, odds, and predictions are provided strictly for entertainment and strategic analysis purposes. Sports betting involves financial risk; never bet money you cannot afford to lose. If you or someone you know has a gambling problem, please seek assistance at <a href="https://www.begambleaware.org" target="_blank" rel="noreferrer" className="text-[#5EB8E8] underline">BeGambleAware.org</a>.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Fieldforecasts Demo. All rights reserved. Built with React, Vite & Tailwind CSS.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#cookie" className="hover:text-slate-400 transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
