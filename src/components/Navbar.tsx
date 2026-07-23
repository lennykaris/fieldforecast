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
      {/* Floating Island Container */}
      <div
        className={`max-w-4xl mx-auto rounded-2xl nav-island transition-all duration-300 ${
          scrolled ? 'shadow-2xl shadow-black/30' : 'shadow-lg shadow-black/10'
        }`}
      >
        <div className="flex items-center justify-between px-5 py-3">

          {/* Wordmark */}
          <Link to="/" className="flex-shrink-0">
            <span
              className="font-black text-base tracking-tight font-display"
              style={{ color: 'var(--text-primary)' }}
            >
              FIELD<span style={{ color: 'var(--brand)' }}>FORECASTS</span>
            </span>
          </Link>

          {/* Desktop Nav Links — center */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
                style={{
                  color: isActive(to) ? 'var(--text-primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive(to) ? 'var(--bg-elevated)' : 'transparent',
                }}
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
              className="hidden sm:block px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
              style={{ color: 'var(--text-muted)', backgroundColor: 'var(--bg-elevated)' }}
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>

            {/* VIP badge or CTA */}
            {isVip ? (
              <span
                className="hidden sm:block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-md border"
                style={{ color: 'var(--brand)', borderColor: 'var(--brand)' }}
              >
                VIP
              </span>
            ) : (
              <button
                onClick={() => { if (onOpenCheckout) onOpenCheckout(); else navigate('/vip'); }}
                className="px-4 py-1.5 text-xs font-bold text-slate-950 rounded-lg transition-colors"
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
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors"
                  style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
                >
                  <span>{user?.name?.split(' ')[0]}</span>
                  <span style={{ color: 'var(--text-muted)' }}>▾</span>
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-xl border overflow-hidden shadow-2xl animate-fadein"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
                  >
                    <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                      <p className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-muted)' }}>Account</p>
                      <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{user?.email}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2.5 text-xs font-medium transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2.5 text-xs font-medium transition-colors"
                          style={{ color: 'var(--text-secondary)' }}
                          onClick={() => setDropdownOpen(false)}
                        >
                          Admin
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-xs font-medium text-red-400 transition-colors"
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
                className="hidden sm:block px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors"
                style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}
              >
                Log In
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden px-3 py-1.5 rounded-lg text-xs font-semibold border"
              style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
            >
              {mobileOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>

        {/* Mobile Drawer — inside the island */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-5 py-4 space-y-1"
            style={{ borderColor: 'var(--border)' }}
          >
            {navLinks.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="block px-3 py-3 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: isActive(to) ? 'var(--text-primary)' : 'var(--text-secondary)',
                  backgroundColor: isActive(to) ? 'var(--bg-elevated)' : 'transparent',
                }}
              >
                {label}
              </Link>
            ))}

            <div className="pt-3 flex items-center gap-2 border-t mt-2" style={{ borderColor: 'var(--border)' }}>
              {!isLoggedIn && (
                <Link
                  to="/login"
                  className="flex-1 py-2.5 text-xs font-semibold text-center rounded-lg border"
                  style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}
                >
                  Log In
                </Link>
              )}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 text-xs font-semibold text-center rounded-lg border text-red-400"
                  style={{ borderColor: 'var(--border)' }}
                >
                  Sign Out
                </button>
              )}
              <button
                onClick={toggleTheme}
                className="px-4 py-2.5 text-xs font-semibold rounded-lg border"
                style={{ color: 'var(--text-muted)', borderColor: 'var(--border)', backgroundColor: 'var(--bg-elevated)' }}
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
