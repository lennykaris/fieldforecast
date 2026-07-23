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
    <footer className="w-full bg-slate-50 border-t border-slate-200 text-slate-600 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-[#0EA5E9] flex items-center justify-center shadow-md shadow-sky-500/20">
                <TrendingUp className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-900 font-mono">
                FIELD<span className="text-[#0EA5E9]">FORECASTS</span>
              </span>
            </Link>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Fieldforecasts delivers high-probability sports predictions across Europe's top football leagues using predictive modeling and match analytics.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="flex items-center space-x-1.5 text-xs text-slate-700 font-semibold bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                <Award className="w-4 h-4 text-[#0EA5E9]" />
                <span>87.4% Verified Win Rate</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-slate-700 font-semibold bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-xs">
                <HeartHandshake className="w-4 h-4 text-[#0EA5E9]" />
                <span>14,500+ VIP Members</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Platform</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-[#0EA5E9] transition-colors">Home & Highlights</Link>
              </li>
              <li>
                <Link to="/tips" className="hover:text-[#0EA5E9] transition-colors">Daily Free Predictions</Link>
              </li>
              <li>
                <Link to="/vip" className="hover:text-[#0EA5E9] transition-colors font-semibold text-[#0EA5E9]">VIP Subscription Pass</Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#0EA5E9] transition-colors">Subscriber Dashboard</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-[#0EA5E9] transition-colors">Admin CMS Portal</Link>
              </li>
            </ul>
          </div>

          {/* Quick Demo Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Account Access</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/login" className="hover:text-[#0EA5E9] transition-colors">Member Log In</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-[#0EA5E9] transition-colors">Create Free Account</Link>
              </li>
              <li>
                <span className="text-slate-400">Stripe & PayPal Supported</span>
              </li>
              <li>
                <span className="text-slate-400">Telegram VIP Alerts</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">Daily Free Briefing</h4>
            <p className="text-xs text-slate-500">
              Get top free match picks delivered directly to your inbox every morning.
            </p>

            {subscribed ? (
              <div className="p-3 bg-sky-50 border border-sky-200 rounded-lg flex items-center space-x-2 text-xs text-[#0EA5E9] font-medium">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Subscribed! Check your inbox tomorrow.</span>
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
                    placeholder="Enter your email address"
                    className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0EA5E9]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#0EA5E9] hover:bg-sky-600 text-white text-xs font-bold rounded-lg transition-colors flex items-center justify-center space-x-1.5 shadow-xs"
                >
                  <span>Subscribe Free Tips</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Responsible Gaming Notice */}
        <div className="py-6 border-b border-slate-200 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-1 flex justify-center md:justify-start">
            <div className="w-10 h-10 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center font-bold text-[#0EA5E9] text-sm">
              18+
            </div>
          </div>
          <div className="md:col-span-11 text-xs text-slate-500 space-y-1">
            <div className="flex items-center space-x-1.5 text-slate-800 font-medium">
              <ShieldAlert className="w-4 h-4 text-[#0EA5E9] flex-shrink-0" />
              <span>Responsible Gaming & Disclaimer</span>
            </div>
            <p className="leading-relaxed">
              Fieldforecasts is an informational sports analytics platform. All content and predictions are provided strictly for entertainment and strategic analysis. Sports betting involves financial risk; never bet money you cannot afford to lose. If you need assistance, visit <a href="https://www.begambleaware.org" target="_blank" rel="noreferrer" className="text-[#0EA5E9] underline font-semibold">BeGambleAware.org</a>.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Fieldforecasts. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#terms" className="hover:text-slate-800 transition-colors">Terms of Service</a>
            <a href="#privacy" className="hover:text-slate-800 transition-colors">Privacy Policy</a>
            <a href="#cookie" className="hover:text-slate-800 transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
