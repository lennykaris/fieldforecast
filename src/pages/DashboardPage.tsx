import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Crown, 
  Zap, 
  CreditCard, 
  Settings, 
  CheckCircle2, 
  Lock, 
  TrendingUp, 
  Bell, 
  Calendar, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePredictions } from '../context/PredictionsContext';
import { PredictionCard } from '../components/PredictionCard';
import type { SubscriptionPlan } from '../types/prediction';
import { SUBSCRIPTION_PLANS } from '../data/predictions';

interface DashboardPageProps {
  onOpenCheckout: (plan: SubscriptionPlan) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onOpenCheckout }) => {
  const { user, isLoggedIn, isVip, loginWithPreset } = useAuth();
  const { predictions } = usePredictions();
  const navigate = useNavigate();

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Filter VIP predictions
  const vipPredictions = predictions.filter(p => p.tier === 'vip');

  const popularPlan = SUBSCRIPTION_PLANS.find(p => p.popular) || SUBSCRIPTION_PLANS[1];

  if (!isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-[#5EB8E8]/10 border border-[#5EB8E8]/30 text-[#5EB8E8] rounded-2xl flex items-center justify-center mx-auto shadow-xl">
          <LayoutDashboard className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-extrabold text-white">Subscriber Dashboard</h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Please log in to your account or try one of our 1-click demo profiles to access the subscriber dashboard.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => loginWithPreset('vip')}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-[#5EB8E8] text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-400/20 hover:brightness-110 transition-all flex items-center justify-center space-x-1.5"
          >
            <Crown className="w-4 h-4 fill-slate-950" />
            <span>Log In as Demo VIP Subscriber</span>
          </button>

          <button
            onClick={() => loginWithPreset('free')}
            className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
          >
            <span>Log In as Demo Free User</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              Welcome Back, {user.name}!
            </h1>
            {isVip && (
              <span className="bg-amber-400/10 text-amber-400 border border-amber-400/40 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center space-x-1">
                <Crown className="w-3 h-3 fill-amber-400" />
                <span>VIP PRO</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Account: <span className="text-slate-200 font-mono">{user.email}</span> • Member status active.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setPaymentModalOpen(true)}
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors flex items-center space-x-1.5"
          >
            <CreditCard className="w-4 h-4 text-[#5EB8E8]" />
            <span>Manage Payment Method</span>
          </button>

          {!isVip && (
            <button
              onClick={() => onOpenCheckout(popularPlan)}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-[#5EB8E8] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-400/20 hover:brightness-110 transition-all flex items-center space-x-1.5"
            >
              <Crown className="w-4 h-4 fill-slate-950" />
              <span>Upgrade to VIP</span>
            </button>
          )}
        </div>
      </div>

      {/* ACTIVE SUBSCRIPTION OVERVIEW CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Plan Info */}
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Active Plan</span>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white capitalize">
              {user.plan.replace('_', ' ')}
            </h3>
            {isVip ? (
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                ACTIVE
              </span>
            ) : (
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                FREE TIER
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400">
            {isVip ? 'Renews automatically on standard cycle.' : 'Upgrade to unlock 90%+ confidence picks.'}
          </p>
        </div>

        {/* Win Rate Stats */}
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">This Month VIP Yield</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-[#5EB8E8] font-mono">+18.4 Units</span>
            <span className="text-xs text-emerald-400 font-bold">88% Hit Rate</span>
          </div>
          <p className="text-xs text-slate-400">14 Wins / 2 Losses on High-Confidence recommendations.</p>
        </div>

        {/* Quick Telegram Alert Link */}
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Telegram Instant Bot</span>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-white">Live Match Alerts</h4>
            <Bell className="w-5 h-5 text-amber-400" />
          </div>
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#5EB8E8] hover:underline flex items-center space-x-1 font-semibold pt-1"
          >
            <span>Connect Telegram VIP Channel</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>

      {/* UNLOCKED VIP PREDICTIONS SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white flex items-center space-x-2">
              <span>Unlocked VIP Predictions</span>
              <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />
            </h2>
            <p className="text-xs text-slate-400">
              {isVip ? 'Showing all high-confidence picks unlocked for your subscription.' : 'Subscribe to VIP to unlock full predictions below.'}
            </p>
          </div>

          {!isVip && (
            <button
              onClick={() => onOpenCheckout(popularPlan)}
              className="text-xs font-bold text-amber-400 hover:underline flex items-center space-x-1"
            >
              <span>Unlock All ({vipPredictions.length} Picks Available)</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vipPredictions.map(prediction => (
            <PredictionCard
              key={prediction.id}
              prediction={prediction}
              onUnlockClick={() => onOpenCheckout(popularPlan)}
            />
          ))}
        </div>
      </div>

      {/* MANAGE PAYMENT MODAL PLACEHOLDER */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 text-center">
            <CreditCard className="w-10 h-10 text-[#5EB8E8] mx-auto" />
            <h3 className="text-lg font-bold text-white">Manage Payment Method</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              This is a frontend demo placeholder. In production, this opens your integrated Stripe Customer Portal to update credit card details, view invoices, or update billing addresses.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl border border-slate-700 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
