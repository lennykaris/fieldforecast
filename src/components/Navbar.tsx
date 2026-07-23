import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Crown, 
  LayoutDashboard, 
  ShieldCheck, 
  LogOut, 
  LogIn, 
  Menu, 
  X, 
  Zap,
  Sun,
  Moon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export const Navbar: React.FC<{ onOpenCheckout?: () => void }> = ({ onOpenCheckout }) => {
  const { user, isLoggedIn, isVip, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b dark:border-slate-800/80 light:border-slate-200 dark:bg-[#070c16]/90 light:bg-white/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0ea5e9] to-[#38bdf8] flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white font-display">
                FIELD<span className="text-[#38bdf8]">FORECASTS</span>
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
                Sports Betting Predictions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                isActive('/') 
                  ? 'text-[#38bdf8] bg-sky-500/10 border border-sky-500/30' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-500/10'
              }`}
            >
              Home
            </Link>

            <Link
              to="/tips"
              className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                isActive('/tips') 
                  ? 'text-[#38bdf8] bg-sky-500/10 border border-sky-500/30' 
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-500/10'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Daily Tips</span>
            </Link>

            <Link
              to="/vip"
              className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                isActive('/vip') 
                  ? 'text-[#38bdf8] bg-sky-500/10 border border-sky-500/40' 
                  : 'text-slate-700 dark:text-slate-200 hover:text-[#38bdf8]'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>VIP Pass</span>
            </Link>

            {isLoggedIn && (
              <Link
                to="/dashboard"
                className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                  isActive('/dashboard') 
                    ? 'text-[#38bdf8] bg-sky-500/10 border border-sky-500/30' 
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-500/10'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>
            )}

            <Link
              to="/admin"
              className={`px-3.5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center space-x-1.5 ${
                isActive('/admin') 
                  ? 'text-[#38bdf8] bg-sky-500/10 border border-sky-500/30' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-500/10'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>Admin</span>
            </Link>
          </nav>

          {/* Right Controls / Auth Actions */}
          <div className="hidden md:flex items-center space-x-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border dark:border-slate-800 light:border-slate-200 dark:bg-slate-900 light:bg-slate-100 text-slate-600 dark:text-slate-300 hover:text-[#38bdf8] transition-colors"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {!isVip && (
              <button
                onClick={() => {
                  if (onOpenCheckout) onOpenCheckout();
                  else navigate('/vip');
                }}
                className="px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:brightness-110 rounded-lg shadow-md transition-all flex items-center space-x-1.5 transform hover:scale-105"
              >
                <Crown className="w-3.5 h-3.5 fill-slate-950" />
                <span>Unlock VIP ($29/mo)</span>
              </button>
            )}

            {isVip && (
              <div className="flex items-center space-x-1.5 px-3 py-1 bg-sky-500/10 border border-sky-500/40 rounded-full text-[#38bdf8] text-xs font-bold">
                <Crown className="w-3.5 h-3.5 fill-[#38bdf8]" />
                <span>VIP ACTIVE</span>
              </div>
            )}

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg dark:bg-slate-900 light:bg-slate-100 border dark:border-slate-800 light:border-slate-200 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0ea5e9] text-slate-950 font-bold text-xs flex items-center justify-center">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-slate-900 dark:text-slate-200 max-w-[100px] truncate">
                    {user?.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 dark:bg-slate-900 light:bg-white border dark:border-slate-800 light:border-slate-200 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b dark:border-slate-800 light:border-slate-100">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.email}</p>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-800/20 hover:text-[#38bdf8]"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#38bdf8]" />
                      <span>Subscriber Dashboard</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-800/20 hover:text-[#38bdf8]"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#38bdf8]" />
                        <span>Admin Panel</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 text-xs font-bold uppercase text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors flex items-center space-x-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </Link>
                <Link
                  to="/signup"
                  className="px-3.5 py-2 text-xs font-bold uppercase text-slate-950 bg-[#38bdf8] hover:bg-sky-300 rounded-lg shadow transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border dark:border-slate-800 light:border-slate-200 text-slate-600 dark:text-slate-300"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>

            {!isVip && (
              <button
                onClick={() => navigate('/vip')}
                className="px-3 py-1.5 text-[11px] font-bold text-slate-950 bg-[#38bdf8] rounded-lg flex items-center space-x-1"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>VIP</span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b dark:border-slate-800 light:border-slate-200 dark:bg-[#070c16] light:bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-bold uppercase text-slate-700 dark:text-slate-200 hover:bg-slate-800/20"
          >
            Home
          </Link>
          <Link
            to="/tips"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-bold uppercase text-slate-700 dark:text-slate-200 hover:bg-slate-800/20 flex items-center justify-between"
          >
            <span>Daily Free Tips</span>
            <Zap className="w-4 h-4 text-[#38bdf8]" />
          </Link>
          <Link
            to="/vip"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-bold uppercase text-[#38bdf8] bg-sky-500/10 border border-sky-500/20 flex items-center justify-between"
          >
            <span>VIP Pass & Pricing</span>
            <Crown className="w-4 h-4" />
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-bold uppercase text-slate-700 dark:text-slate-200 hover:bg-slate-800/20"
          >
            Subscriber Dashboard
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-xs font-bold uppercase text-slate-500 hover:bg-slate-800/20"
          >
            Admin Panel CMS
          </Link>
        </div>
      )}
    </header>
  );
};
