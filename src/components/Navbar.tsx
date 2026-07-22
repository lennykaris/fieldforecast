import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Lock, 
  Crown, 
  LayoutDashboard, 
  ShieldCheck, 
  LogOut, 
  LogIn, 
  Menu, 
  X, 
  User as UserIcon,
  Sparkles,
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC<{ onOpenCheckout?: () => void }> = ({ onOpenCheckout }) => {
  const { user, isLoggedIn, isVip, isAdmin, logout, loginWithPreset } = useAuth();
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b1120]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#5EB8E8] to-cyan-400 flex items-center justify-center shadow-lg shadow-[#5EB8E8]/20 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-xl sm:text-2xl tracking-tight text-white font-mono">
                  FIELD<span className="text-[#5EB8E8]">FORECASTS</span>
                </span>
                <span className="bg-[#5EB8E8]/10 text-[#5EB8E8] border border-[#5EB8E8]/30 text-[10px] uppercase font-bold px-1.5 py-0.5 rounded tracking-wider">
                  AI PRO
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide">
                Sports Prediction Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/') 
                  ? 'text-[#5EB8E8] bg-[#5EB8E8]/10 border border-[#5EB8E8]/20' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              Home
            </Link>

            <Link
              to="/tips"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                isActive('/tips') 
                  ? 'text-[#5EB8E8] bg-[#5EB8E8]/10 border border-[#5EB8E8]/20' 
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-4 h-4 text-[#5EB8E8]" />
              <span>Daily Free Tips</span>
            </Link>

            <Link
              to="/vip"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                isActive('/vip') 
                  ? 'text-amber-400 bg-amber-400/10 border border-amber-400/30' 
                  : 'text-amber-300 hover:text-amber-200 hover:bg-amber-400/10'
              }`}
            >
              <Crown className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>VIP Pass</span>
            </Link>

            {isLoggedIn && (
              <Link
                to="/dashboard"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                  isActive('/dashboard') 
                    ? 'text-[#5EB8E8] bg-[#5EB8E8]/10 border border-[#5EB8E8]/20' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            )}

            <Link
              to="/admin"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                isActive('/admin') 
                  ? 'text-[#5EB8E8] bg-[#5EB8E8]/10 border border-[#5EB8E8]/20' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-slate-400" />
              <span>Admin CMS</span>
            </Link>
          </nav>

          {/* Right Controls / Auth Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {!isVip && (
              <button
                onClick={() => {
                  if (onOpenCheckout) onOpenCheckout();
                  else navigate('/vip');
                }}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-[#5EB8E8] hover:brightness-110 rounded-lg shadow-md transition-all transform hover:scale-105 flex items-center space-x-1.5"
              >
                <Crown className="w-4 h-4 fill-slate-950" />
                <span>Unlock VIP ($29/mo)</span>
              </button>
            )}

            {isVip && (
              <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-400/10 border border-amber-400/40 rounded-full text-amber-400 text-xs font-bold">
                <Crown className="w-3.5 h-3.5 fill-amber-400" />
                <span>VIP ACTIVE</span>
              </div>
            )}

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg bg-slate-800/80 border border-slate-700 hover:border-[#5EB8E8]/50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#5EB8E8]/20 border border-[#5EB8E8]/40 flex items-center justify-center text-[#5EB8E8] font-bold text-xs">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-slate-200 max-w-[100px] truncate">
                    {user?.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-[#5EB8E8]">
                        {user?.plan.replace('_', ' ')}
                      </span>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#5EB8E8]" />
                      <span>Subscriber Dashboard</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#5EB8E8]" />
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
                  className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-lg transition-colors flex items-center space-x-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </Link>
                <Link
                  to="/signup"
                  className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-[#5EB8E8] hover:bg-sky-300 rounded-lg shadow transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            {!isVip && (
              <button
                onClick={() => navigate('/vip')}
                className="px-3 py-1.5 text-[11px] font-bold text-slate-950 bg-amber-400 rounded-lg flex items-center space-x-1"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>VIP</span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-[#0b1120] px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            to="/tips"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800 flex items-center justify-between"
          >
            <span>Daily Free Tips</span>
            <Zap className="w-4 h-4 text-[#5EB8E8]" />
          </Link>
          <Link
            to="/vip"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 flex items-center justify-between"
          >
            <span>VIP Pass & Pricing</span>
            <Crown className="w-4 h-4" />
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800"
          >
            Subscriber Dashboard
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-400 hover:bg-slate-800"
          >
            Admin Panel CMS
          </Link>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 rounded-lg flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out ({user?.email})</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 text-xs font-semibold text-slate-950 bg-[#5EB8E8] rounded-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
