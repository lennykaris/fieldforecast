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
  Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC<{ onOpenCheckout?: () => void }> = ({ onOpenCheckout }) => {
  const { user, isLoggedIn, isVip, isAdmin, logout } = useAuth();
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#0EA5E9] flex items-center justify-center shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <TrendingUp className="w-6 h-6 text-white stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 font-mono">
                  FIELD<span className="text-[#0EA5E9]">FORECASTS</span>
                </span>
                <span className="bg-sky-50 text-[#0EA5E9] border border-sky-200 text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded tracking-wider">
                  PRO
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                Sports Prediction Platform
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                isActive('/') 
                  ? 'text-[#0EA5E9] bg-sky-50 border border-sky-200' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link
              to="/tips"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                isActive('/tips') 
                  ? 'text-[#0EA5E9] bg-sky-50 border border-sky-200' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Zap className="w-4 h-4 text-[#0EA5E9]" />
              <span>Daily Free Tips</span>
            </Link>

            <Link
              to="/vip"
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                isActive('/vip') 
                  ? 'text-[#0EA5E9] bg-sky-50 border border-sky-300 font-bold' 
                  : 'text-slate-700 hover:text-[#0EA5E9] hover:bg-sky-50'
              }`}
            >
              <Crown className="w-4 h-4 text-[#0EA5E9]" />
              <span>VIP Pass</span>
            </Link>

            {isLoggedIn && (
              <Link
                to="/dashboard"
                className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                  isActive('/dashboard') 
                    ? 'text-[#0EA5E9] bg-sky-50 border border-sky-200' 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
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
                  ? 'text-[#0EA5E9] bg-sky-50 border border-sky-200' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-slate-500" />
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
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-[#0EA5E9] hover:bg-sky-600 rounded-lg shadow-md transition-all flex items-center space-x-1.5"
              >
                <Crown className="w-4 h-4 fill-white" />
                <span>Unlock VIP ($29/mo)</span>
              </button>
            )}

            {isVip && (
              <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-sky-50 border border-sky-300 rounded-full text-[#0EA5E9] text-xs font-bold">
                <Crown className="w-3.5 h-3.5 fill-[#0EA5E9]" />
                <span>VIP ACTIVE</span>
              </div>
            )}

            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:border-sky-300 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0EA5E9] text-white flex items-center justify-center font-bold text-xs">
                    {user?.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-slate-800 max-w-[100px] truncate">
                    {user?.name}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in"
                    onMouseLeave={() => setUserDropdownOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-400">Signed in as</p>
                      <p className="text-sm font-semibold text-slate-900 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-50 text-[#0EA5E9] border border-sky-100">
                        {user?.plan.replace('_', ' ')}
                      </span>
                    </div>

                    <Link
                      to="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0EA5E9]"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#0EA5E9]" />
                      <span>Subscriber Dashboard</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center space-x-2 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-[#0EA5E9]"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#0EA5E9]" />
                        <span>Admin Panel</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50"
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
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center space-x-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </Link>
                <Link
                  to="/signup"
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0EA5E9] hover:bg-sky-600 rounded-lg shadow transition-colors"
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
                className="px-3 py-1.5 text-[11px] font-bold text-white bg-[#0EA5E9] rounded-lg flex items-center space-x-1"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>VIP</span>
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Home
          </Link>
          <Link
            to="/tips"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
          >
            <span>Daily Free Tips</span>
            <Zap className="w-4 h-4 text-[#0EA5E9]" />
          </Link>
          <Link
            to="/vip"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-bold text-[#0EA5E9] bg-sky-50 border border-sky-200 flex items-center justify-between"
          >
            <span>VIP Pass & Pricing</span>
            <Crown className="w-4 h-4" />
          </Link>
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Subscriber Dashboard
          </Link>
          <Link
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:bg-slate-50"
          >
            Admin Panel CMS
          </Link>

          <div className="pt-4 border-t border-slate-200 space-y-2">
            {isLoggedIn ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50 rounded-lg flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out ({user?.email})</span>
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2 text-xs font-semibold text-white bg-[#0EA5E9] rounded-lg"
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
