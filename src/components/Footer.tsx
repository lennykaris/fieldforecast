import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ShieldAlert, CheckCircle2, Mail, Send, Award, Users } from 'lucide-react';

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
    <footer className="w-full dark:bg-[#070c16] light:bg-slate-50 border-t dark:border-slate-800/60 light:border-slate-200 dark:text-slate-400 light:text-slate-600 pt-14 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b dark:border-slate-800/60 light:border-slate-200">

          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0ea5e9] to-[#38bdf8] flex items-center justify-center shadow-md">
                <TrendingUp className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="font-black text-xl tracking-tight dark:text-white light:text-slate-900 font-display">
                FIELD<span className="text-[#38bdf8]">FORECASTS</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed max-w-sm">
              High-probability sports predictions across Europe's top football leagues using statistical form modeling and match analytics.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center space-x-1.5 text-xs dark:text-slate-300 light:text-slate-700 font-semibold dark:bg-slate-900 light:bg-white px-3 py-1.5 rounded-lg border dark:border-slate-800 light:border-slate-200">
                <Award className="w-4 h-4 text-[#38bdf8]" />
                <span>87.4% Win Rate</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs dark:text-slate-300 light:text-slate-700 font-semibold dark:bg-slate-900 light:bg-white px-3 py-1.5 rounded-lg border dark:border-slate-800 light:border-slate-200">
                <Users className="w-4 h-4 text-[#38bdf8]" />
                <span>14,500+ VIP Members</span>
              </div>
            </div>
          </div>

          {/* Nav Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider dark:text-slate-200 light:text-slate-900">Platform</h4>
            <ul className="space-y-2 text-xs">
              {[
                { to: '/', label: 'Home' },
                { to: '/tips', label: 'Daily Free Tips' },
                { to: '/vip', label: 'VIP Pass' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/admin', label: 'Admin CMS' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="hover:text-[#38bdf8] transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider dark:text-slate-200 light:text-slate-900">Account</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/login" className="hover:text-[#38bdf8] transition-colors">Log In</Link></li>
              <li><Link to="/signup" className="hover:text-[#38bdf8] transition-colors">Sign Up Free</Link></li>
              <li><span className="dark:text-slate-500 light:text-slate-400">Stripe & PayPal</span></li>
              <li><span className="dark:text-slate-500 light:text-slate-400">Telegram Alerts</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider dark:text-slate-200 light:text-slate-900">Morning Briefing</h4>
            <p className="text-xs dark:text-slate-500 light:text-slate-500">
              Free picks to your inbox every morning at 09:00 GMT.
            </p>

            {subscribed ? (
              <div className="p-3 dark:bg-sky-500/10 light:bg-sky-50 border border-sky-500/30 rounded-lg flex items-center space-x-2 text-xs text-[#38bdf8] font-medium">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Subscribed! See you tomorrow.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="w-full dark:bg-slate-900 light:bg-white border dark:border-slate-800 light:border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs dark:text-slate-200 light:text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#38bdf8] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-slate-950 text-xs font-bold rounded-lg transition-all flex items-center justify-center space-x-1.5 hover:brightness-110"
                >
                  <span>Subscribe</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Responsible Gaming */}
        <div className="py-6 border-b dark:border-slate-800/60 light:border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-1 flex justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full dark:bg-slate-900 light:bg-sky-50 border dark:border-slate-800 light:border-sky-200 flex items-center justify-center font-bold text-[#38bdf8] text-sm font-mono">
              18+
            </div>
          </div>
          <div className="md:col-span-11 text-xs space-y-1">
            <div className="flex items-center space-x-1.5 dark:text-slate-300 light:text-slate-800 font-medium">
              <ShieldAlert className="w-4 h-4 text-[#38bdf8] flex-shrink-0" />
              <span>Responsible Gaming & Disclaimer</span>
            </div>
            <p className="leading-relaxed dark:text-slate-500 light:text-slate-500">
              Fieldforecasts is an informational sports analytics platform. All content and predictions are for entertainment purposes. Sports betting involves financial risk. Visit{' '}
              <a href="https://www.begambleaware.org" target="_blank" rel="noreferrer" className="text-[#38bdf8] underline font-semibold">
                BeGambleAware.org
              </a>{' '}
              if you need assistance.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-7 flex flex-col md:flex-row items-center justify-between text-xs dark:text-slate-600 light:text-slate-400">
          <p>© {new Date().getFullYear()} Fieldforecasts. All rights reserved.</p>
          <div className="flex space-x-5 mt-4 md:mt-0">
            <a href="#terms" className="dark:hover:text-slate-300 light:hover:text-slate-700 transition-colors">Terms</a>
            <a href="#privacy" className="dark:hover:text-slate-300 light:hover:text-slate-700 transition-colors">Privacy</a>
            <a href="#cookie" className="dark:hover:text-slate-300 light:hover:text-slate-700 transition-colors">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
