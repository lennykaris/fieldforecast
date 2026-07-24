import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <footer
      className="w-full border-t pt-14 pb-10"
      style={{
        backgroundColor: 'var(--footer-bg)',
        borderColor: 'var(--footer-border)',
        color: 'var(--footer-text-secondary)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Top grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b"
          style={{ borderColor: 'var(--footer-border)' }}
        >

          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/">
              <span className="font-black text-lg tracking-tight font-display" style={{ color: 'var(--footer-text-primary)' }}>
                FIELD<span style={{ color: 'var(--brand)' }}>FORECASTS</span>
              </span>
            </Link>
            <p className="text-xs leading-relaxed max-w-xs" style={{ color: 'var(--footer-text-secondary)' }}>
              High-probability sports predictions across Europe's top football leagues using statistical form modeling and match analytics.
            </p>
            <div className="flex gap-3 pt-1">
              {[
                { val: '87.4%', label: 'Win Rate' },
                { val: '14,500+', label: 'Members' },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="px-3 py-2 rounded-lg border text-center"
                  style={{ borderColor: 'var(--footer-border)', backgroundColor: 'var(--footer-card-bg)' }}
                >
                  <div className="text-xs font-black font-mono" style={{ color: 'var(--brand)' }}>{val}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: 'var(--footer-text-muted)' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Platform links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--footer-text-primary)' }}>
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { to: '/', label: 'Home' },
                { to: '/about', label: 'About Us' },
                { to: '/tips', label: 'Daily Free Tips' },
                { to: '/vip', label: 'VIP Pass' },
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/admin', label: 'Admin' },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="transition-colors hover:underline underline-offset-2"
                    style={{ color: 'var(--footer-text-secondary)' }}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account links */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--footer-text-primary)' }}>
              Account & Legal
            </h4>
            <ul className="space-y-2 text-xs" style={{ color: 'var(--footer-text-secondary)' }}>
              <li><Link to="/login" className="hover:underline underline-offset-2">Log In</Link></li>
              <li><Link to="/signup" className="hover:underline underline-offset-2">Sign Up Free</Link></li>
              <li><Link to="/about" className="hover:underline underline-offset-2">About Field Forecast</Link></li>
              <li><Link to="/privacy" className="hover:underline underline-offset-2">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:underline underline-offset-2">Terms & Conditions</Link></li>
              <li><Link to="/gdpr" className="hover:underline underline-offset-2">GDPR & Journalism</Link></li>
              <li><Link to="/copyright" className="hover:underline underline-offset-2">Copyright Notice</Link></li>
              <li><Link to="/refund-policy" className="hover:underline underline-offset-2">Refund Policy</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--footer-text-primary)' }}>
              Morning Briefing
            </h4>
            <p className="text-xs" style={{ color: 'var(--footer-text-secondary)' }}>
              Free picks delivered to your inbox every morning at 09:00 GMT.
            </p>

            {subscribed ? (
              <div
                className="p-3 rounded-lg border text-xs font-medium text-center"
                style={{ borderColor: 'var(--brand)', color: 'var(--brand)', backgroundColor: 'rgba(56,189,248,0.06)' }}
              >
                Subscribed! See you tomorrow.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="input-field w-full rounded-lg px-4 py-2.5 text-xs"
                  style={{ backgroundColor: 'var(--footer-card-bg)', borderColor: 'var(--footer-border)', color: 'var(--footer-text-primary)' }}
                />
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-bold text-slate-950 rounded-lg transition-all hover:brightness-110"
                  style={{ backgroundColor: 'var(--brand)' }}
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Responsible Gaming */}
        <div
          className="py-6 border-b grid grid-cols-1 md:grid-cols-12 gap-4 items-start"
          style={{ borderColor: 'var(--footer-border)' }}
        >
          <div className="md:col-span-1">
            <div
              className="w-9 h-9 rounded-full border flex items-center justify-center font-bold text-xs font-mono"
              style={{ borderColor: 'var(--brand)', color: 'var(--brand)' }}
            >
              18+
            </div>
          </div>
          <div className="md:col-span-11 space-y-1">
            <p className="text-xs font-semibold" style={{ color: 'var(--footer-text-primary)' }}>
              Responsible Gaming & Disclaimer
            </p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--footer-text-muted)' }}>
              Fieldforecasts is an informational sports analytics platform. All content is for entertainment purposes. Betting involves financial risk.{' '}
              <a
                href="https://www.begambleaware.org"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2"
                style={{ color: 'var(--brand)' }}
              >
                BeGambleAware.org
              </a>
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="pt-6 pb-28 md:pb-0 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ color: 'var(--footer-text-muted)' }}
        >
          <p>© {new Date().getFullYear()} Fieldforecasts. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/terms" className="hover:underline underline-offset-2 transition-colors">Terms</Link>
            <Link to="/privacy" className="hover:underline underline-offset-2 transition-colors">Privacy Policy</Link>
            <Link to="/gdpr" className="hover:underline underline-offset-2 transition-colors">GDPR & Journalism</Link>
            <Link to="/copyright" className="hover:underline underline-offset-2 transition-colors">Copyright</Link>
            <Link to="/refund-policy" className="hover:underline underline-offset-2 transition-colors">Refund Policy</Link>
            <Link to="/about" className="hover:underline underline-offset-2 transition-colors">About Us</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
