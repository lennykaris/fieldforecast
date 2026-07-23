import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Crown, 
  CreditCard, 
  Bell, 
  ExternalLink
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

  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Filter VIP predictions
  const vipPredictions = predictions.filter(p => p.tier === 'vip');

  const popularPlan = SUBSCRIPTION_PLANS.find(p => p.popular) || SUBSCRIPTION_PLANS[1];

  if (!isLoggedIn || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 bg-sky-500/10 border border-sky-500/30 text-[#38bdf8] rounded-2xl flex items-center justify-center mx-auto shadow-md">
          <LayoutDashboard className="w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-extrabold dark:text-white light:text-slate-900 font-display">Subscriber Dashboard</h1>
        <p className="text-xs sm:text-sm dark:text-slate-400 light:text-slate-600 max-w-md mx-auto">
          Please log in or try a 1-click demo profile to access the subscriber dashboard.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => loginWithPreset('vip')}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center space-x-1.5"
          >
            <Crown className="w-4 h-4 fill-slate-950" />
            <span>Demo VIP Login</span>
          </button>

          <button
            onClick={() => loginWithPreset('free')}
            className="w-full sm:w-auto px-6 py-3 dark:bg-slate-900 light:bg-slate-100 dark:hover:bg-slate-800 light:hover:bg-slate-200 dark:text-slate-200 light:text-slate-800 font-semibold text-xs rounded-xl border dark:border-slate-800 light:border-slate-200 transition-colors"
          >
            <span>Demo Free Login</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Welcome Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b dark:border-slate-800 light:border-slate-200 pb-6">
        <div>
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-4xl font-black dark:text-white light:text-slate-900 font-display">
              Welcome Back, {user.name}!
            </h1>
            {isVip && (
              <span className="bg-sky-500/10 text-[#38bdf8] border border-sky-500/30 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center space-x-1">
                <Crown className="w-3 h-3 fill-[#38bdf8]" />
                <span>VIP</span>
              </span>
            )}
          </div>
          <p className="text-xs dark:text-slate-500 light:text-slate-500 mt-1">
            <span className="font-mono">{user.email}</span> • Active
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setPaymentModalOpen(true)}
            className="px-4 py-2.5 dark:bg-slate-900 light:bg-slate-50 dark:hover:bg-slate-800 light:hover:bg-slate-100 dark:text-slate-300 light:text-slate-700 font-semibold text-xs rounded-xl border dark:border-slate-800 light:border-slate-200 transition-colors flex items-center space-x-1.5"
          >
            <CreditCard className="w-4 h-4 text-[#38bdf8]" />
            <span>Billing</span>
          </button>

          {!isVip && (
            <button
              onClick={() => onOpenCheckout(popularPlan)}
              className="px-5 py-2.5 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-1.5 hover:brightness-110"
            >
              <Crown className="w-4 h-4 fill-slate-950" />
              <span>Upgrade VIP</span>
            </button>
          )}
        </div>
      </div>

      {/* ACTIVE SUBSCRIPTION OVERVIEW CARD */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Plan Info */}
        <div className="p-6 rounded-2xl bet-card space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider dark:text-slate-500 light:text-slate-400">Active Plan</span>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold dark:text-white light:text-slate-900 capitalize font-display">
              {user.plan.replace('_', ' ')}
            </h3>
            {isVip ? (
              <span className="text-xs font-bold text-[#38bdf8] bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/30">
                ACTIVE
              </span>
            ) : (
              <span className="text-xs font-bold dark:text-slate-500 light:text-slate-500 dark:bg-slate-900 light:bg-slate-100 px-2.5 py-0.5 rounded-full border dark:border-slate-800 light:border-slate-200">
                FREE
              </span>
            )}
          </div>
          <p className="text-xs dark:text-slate-500 light:text-slate-500">
            {isVip ? 'Renews automatically.' : 'Upgrade to unlock 90%+ confidence picks.'}
          </p>
        </div>

        {/* Win Rate Stats */}
        <div className="p-6 rounded-2xl bet-card space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider dark:text-slate-500 light:text-slate-400">Monthly Yield</span>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold text-[#38bdf8] font-mono">+18.4 Units</span>
            <span className="text-xs text-[#38bdf8] font-bold">88% Hit Rate</span>
          </div>
          <p className="text-xs dark:text-slate-500 light:text-slate-500">14 Wins / 2 Losses on high-confidence picks.</p>
        </div>

        {/* Telegram */}
        <div className="p-6 rounded-2xl bet-card space-y-3">
          <span className="text-[10px] font-bold uppercase tracking-wider dark:text-slate-500 light:text-slate-400">Telegram Alerts</span>
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold dark:text-white light:text-slate-900">Live Match Alerts</h4>
            <Bell className="w-5 h-5 text-[#38bdf8]" />
          </div>
          <a
            href="https://telegram.org"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#38bdf8] hover:underline flex items-center space-x-1 font-semibold pt-1"
          >
            <span>Connect VIP Channel</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

      </div>

      {/* UNLOCKED VIP PREDICTIONS SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black dark:text-white light:text-slate-900 flex items-center space-x-2 font-display">
              <Crown className="w-5 h-5 text-[#38bdf8] fill-[#38bdf8]" />
              <span>VIP Picks</span>
            </h2>
            <p className="text-xs dark:text-slate-500 light:text-slate-500">
              {isVip ? 'High-confidence picks unlocked for your subscription.' : 'Subscribe to VIP to unlock all predictions.'}
            </p>
          </div>

          {!isVip && (
            <button
              onClick={() => onOpenCheckout(popularPlan)}
              className="text-xs font-bold text-[#38bdf8] hover:underline flex items-center space-x-1"
            >
              <span>Unlock All ({vipPredictions.length} Picks)</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md dark:bg-slate-900 light:bg-white border dark:border-slate-800 light:border-slate-200 rounded-3xl p-6 space-y-4 text-center shadow-2xl">
            <CreditCard className="w-10 h-10 text-[#38bdf8] mx-auto" />
            <h3 className="text-lg font-bold dark:text-white light:text-slate-900 font-display">Manage Billing</h3>
            <p className="text-xs dark:text-slate-400 light:text-slate-600 leading-relaxed">
              Frontend demo — in production this opens your Stripe Customer Portal to update card details, view invoices, or change billing info.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setPaymentModalOpen(false)}
                className="w-full py-2.5 dark:bg-slate-800 light:bg-slate-100 dark:hover:bg-slate-700 light:hover:bg-slate-200 dark:text-slate-200 light:text-slate-800 font-bold text-xs rounded-xl border dark:border-slate-700 light:border-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
