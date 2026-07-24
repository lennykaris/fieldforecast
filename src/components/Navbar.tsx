import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Zap, Crown, User, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC<{ onOpenCheckout?: () => void }> = ({ onOpenCheckout }) => {
  const { user, isLoggedIn, isVip, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => { setDropdownOpen(false); }, [location.pathname]);

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
    { to: '/about', label: 'About' },
    { to: '/tips', label: 'Free Tips' },
    { to: '/vip', label: 'VIP' },
    ...(isLoggedIn ? [{ to: '/dashboard', label: 'Dashboard' }] : []),
    { to: '/admin', label: 'Admin' },
  ];

  const mobileTabs = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/tips', label: 'Free Tips', icon: Zap },
    { to: '/vip', label: 'VIP', icon: Crown },
    {
      to: isLoggedIn ? '/dashboard' : '/login',
      label: isLoggedIn ? (user?.name?.split(' ')[0] || 'Account') : 'Log In',
      icon: User,
    },
  ];

  return (
    <>
      {/* ─── DESKTOP TOP FLOATING NAVBAR (md and up) ─── */}
      <div className="hidden md:block fixed top-4 left-0 right-0 z-50 px-6 lg:px-8">
        <div
          className={`max-w-4xl mx-auto rounded-full nav-island transition-all duration-300 ${
            scrolled ? 'shadow-2xl shadow-black/70 border-white/25' : 'shadow-xl shadow-black/40 border-white/15'
          }`}
          style={{
            backgroundColor: 'rgba(11, 18, 32, 0.90)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
          }}
        >
          <div className="flex items-center justify-between px-5 py-2.5">
            {/* Wordmark */}
            <Link to="/" className="flex-shrink-0 pl-1">
              <span className="font-black text-base tracking-tight text-white font-display">
                FIELD<span style={{ color: 'var(--brand)' }}>FORECASTS</span>
              </span>
            </Link>

            {/* Nav Links */}
            <nav className="flex items-center gap-1">
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

            {/* Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-full text-xs font-semibold text-slate-300 bg-white/10 hover:bg-white/20 hover:text-white transition-colors"
              >
                {theme === 'dark' ? 'Light' : 'Dark'}
              </button>

              {isVip ? (
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full border border-sky-400 text-sky-400 bg-sky-400/10">
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

              {isLoggedIn ? (
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/10 transition-colors"
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
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 rounded-full border border-white/10 transition-colors"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── MOBILE BOTTOM TAB BAR ISLAND (< md) ─── */}
      <div className="md:hidden fixed bottom-3 left-3 right-3 z-50">
        <div
          className="rounded-full shadow-2xl shadow-black/80 border border-white/15 px-3 py-2 flex items-center justify-around backdrop-blur-xl"
          style={{ backgroundColor: 'rgba(10, 16, 28, 0.94)' }}
        >
          {mobileTabs.map(({ to, label, icon: Icon }) => {
            const active = isActive(to);
            return (
              <Link
                key={to}
                to={to}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-full transition-all ${
                  active ? 'text-[#38bdf8]' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                <span className="text-[10px] font-semibold mt-0.5 tracking-tight whitespace-nowrap">
                  {label}
                </span>
              </Link>
            );
          })}

          {/* Quick theme toggle icon on mobile tab bar */}
          <button
            onClick={toggleTheme}
            className="flex flex-col items-center justify-center py-1 px-2.5 text-slate-400 hover:text-white"
            title="Toggle Theme"
          >
            <span className="text-[10px] font-extrabold uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 border border-white/10">
              {theme === 'dark' ? '☀️' : '🌙'}
            </span>
            <span className="text-[9px] font-medium mt-0.5 tracking-tight text-slate-400">
              Theme
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
