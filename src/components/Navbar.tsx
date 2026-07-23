import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC<{ onOpenCheckout?: () => void }> = ({ onOpenCheckout }) => {
  const { user, isLoggedIn, isVip, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setDropdownOpen(false); }, [location.pathname]);

  // Detect scroll for island shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/tips', label: 'Free Tips' },
    { to: '/vip', label: 'VIP' },
    ...(isLoggedIn ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
    { to: '/admin', label: 'Admin' },
  ];

  return (
    <div className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
      {/* Floating Dynamic Island Capsule */}
      <div
        className={`max-w-4xl mx-auto rounded-full nav-island transition-all duration-300 ${
          scrolled ? 'shadow-2xl shadow-black/60 border-white/20' : 'shadow-xl shadow-black/30 border-white/10'
        }`}
        style={{
          backgroundColor: 'rgba(11, 18, 32, 0.88)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        <div className="flex items-center justify-between px-5 py-2.5">

          {/* Wordmark */}
          <Link to="/" className="flex-shrink-0 pl-1">
            <span className="font-black text-base tracking-tight text-white font-display">
              FIELD<span style={{ color: 'var(--brand)' }}>FORECASTS</span>
            </span>
          </Link>

          {/* Desktop Nav Links — center */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive(to)
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="hidden sm:block px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 bg-white/10 hover:bg-white/20 hover:text-white transition-colors"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>

            {/* VIP badge or CTA */}
            {isVip ? (
              <span
                className="hidden sm:block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border border-sky-400 text-sky-400 bg-sky-400/10"
              >
                VIP
              </span>
            ) : (
              <button
                onClick={() => { if (onOpenCheckout) onOpenCheckout(); else navigate('/vip'); }}
                className="px-4 py-1.5 text-xs font-bold text-slate-950 rounded-full transition-all hover:brightness-110 shadow-md"
                style={{ backgroundColor: 'var(--brand)' }}
              >
                Unlock VIP
              </button>
            )}

            {/* User account */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
                >
                  <span>{user?.name?.split(' ')[0]}</span>
                  <span className="text-slate-400">▾</span>
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-3 w-48 rounded-2xl border border-white/15 overflow-hidden shadow-2xl animate-fadein z-50"
                    style={{ backgroundColor: '#0d1527' }}
                  >
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-[10px] uppercase tracking-wider mb-0.5 text-slate-400">Account</p>
                      <p className="text-xs font-semibold truncate text-white">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2.5 text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Admin
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-xs font-medium text-red-400 hover:bg-white/10 transition-colors"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden sm:block px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-colors"
              >
                Log In
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200 bg-white/10 border border-white/10"
            >
              {mobileOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Mobile Drawer — inside the island pill */}
        {mobileOpen && (
          <div className="md:hidden border-t border-white/10 px-5 py-4 space-y-1">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive(to) ? 'bg-white/15 text-white' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}

            <div className="pt-3 flex items-center gap-2 border-t border-white/10 mt-2">
              {!isLoggedIn && (
                <Link
                  to="/login"
                  className="flex-1 py-2.5 text-xs font-semibold text-center text-white bg-white/10 rounded-xl border border-white/10"
                >
                  Log In
                </Link>
              )}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 text-xs font-semibold text-center text-red-400 bg-white/10 rounded-xl border border-white/10"
                >
                  Sign Out
                </button>
              )}
              <button
                onClick={toggleTheme}
                className="px-4 py-2.5 text-xs font-semibold text-slate-300 bg-white/10 border border-white/10 rounded-xl"
              >
                {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
