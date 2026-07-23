import React, { useState } from 'react';
import { Crown, Check, X, Calculator, Trophy } from 'lucide-react';
import { PricingCard } from '../components/PricingCard';
import { SUBSCRIPTION_PLANS } from '../data/predictions';
import type { SubscriptionPlan } from '../types/prediction';
import { useAuth } from '../context/AuthContext';

interface VipPageProps {
  onOpenCheckout: (plan: SubscriptionPlan) => void;
}

export const VipPage: React.FC<VipPageProps> = ({ onOpenCheckout }) => {
  const { user } = useAuth();
  const [stakePerBet, setStakePerBet] = useState<number>(50);
  const [betsPerWeek, setBetsPerWeek] = useState<number>(10);

  const monthlyWagered = stakePerBet * betsPerWeek * 4;
  const estimatedMonthlyProfit = Math.round(monthlyWagered * 0.348);

  const featureMatrix = [
    { feature: 'Daily Free Predictions', free: true, pro: true, champion: true },
    { feature: '85%+ Confidence VIP Picks', free: false, pro: true, champion: true },
    { feature: 'Tactical & Form Deep Analyses', free: false, pro: true, champion: true },
    { feature: 'High-Odds Value Accumulators', free: false, pro: true, champion: true },
    { feature: 'VIP Telegram Bot Alerts', free: false, pro: true, champion: true },
    { feature: 'Bankroll & ROI Calculator', free: false, pro: true, champion: true },
    { feature: '1-on-1 Staking Strategy Advice', free: false, pro: false, champion: true },
    { feature: 'Early-Bird Line Movement Alerts', free: false, pro: false, champion: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

      {/* ─── Header — no pill/badge label ─── */}
      <div className="text-center max-w-3xl mx-auto space-y-4 relative">
        <div className="flex items-center justify-center space-x-3 mb-2">
          <Crown className="w-8 h-8 text-[#38bdf8] fill-[#38bdf8]" />
          <h1 className="text-4xl sm:text-6xl font-black dark:text-white light:text-slate-900 tracking-tight font-display">
            VIP PASS
          </h1>
        </div>
        <p className="text-xs sm:text-base dark:text-slate-400 light:text-slate-600 leading-relaxed">
          Highest confidence picks, tactical breakdowns, and value accumulators engineered to outperform bookmaker margins.
        </p>
      </div>

      {/* ─── Pricing Cards ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {SUBSCRIPTION_PLANS.map(plan => {
          const isCurrent = user?.plan === (plan.id === 'annual_vip' ? 'annual_vip' : plan.id === 'monthly_vip' ? 'monthly_vip' : 'free');
          return (
            <PricingCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={isCurrent}
              onSelectPlan={onOpenCheckout}
            />
          );
        })}
      </div>

      {/* ─── ROI Calculator ─── */}
      <div className="bet-card rounded-3xl p-8 sm:p-12 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b dark:border-slate-800 light:border-slate-200 pb-6">
          <div className="flex items-center space-x-3">
            <Calculator className="w-6 h-6 text-[#38bdf8]" />
            <div>
              <h2 className="text-2xl sm:text-3xl font-black dark:text-white light:text-slate-900 font-display">
                ROI Simulator
              </h2>
              <p className="text-xs dark:text-slate-500 light:text-slate-400 mt-0.5">
                Estimate your monthly returns
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold dark:text-slate-400 light:text-slate-600 dark:bg-slate-900 light:bg-slate-100 border dark:border-slate-800 light:border-slate-200 px-3 py-1.5 rounded-xl">
            Based on historical +34.8% field yield
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="dark:text-slate-300 light:text-slate-700">Average Stake Per Bet</span>
                <span className="text-[#38bdf8] font-mono text-sm">${stakePerBet}</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={stakePerBet}
                onChange={e => setStakePerBet(Number(e.target.value))}
                className="w-full h-2 dark:bg-slate-800 light:bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="dark:text-slate-300 light:text-slate-700">Bets Per Week</span>
                <span className="text-[#38bdf8] font-mono text-sm">{betsPerWeek} bets</span>
              </div>
              <input
                type="range"
                min="3"
                max="35"
                step="1"
                value={betsPerWeek}
                onChange={e => setBetsPerWeek(Number(e.target.value))}
                className="w-full h-2 dark:bg-slate-800 light:bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#38bdf8]"
              />
            </div>
          </div>

          <div className="lg:col-span-5 p-7 rounded-2xl dark:bg-[#080d19] light:bg-sky-50 border dark:border-slate-800 light:border-sky-200 text-center space-y-3">
            <Trophy className="w-8 h-8 text-[#38bdf8] mx-auto" />
            <span className="text-xs font-bold dark:text-slate-400 light:text-slate-600 uppercase tracking-wider block">
              Est. Monthly Profit
            </span>
            <span className="text-4xl sm:text-5xl font-black text-[#38bdf8] font-mono block">
              +${estimatedMonthlyProfit.toLocaleString()}
            </span>
            <p className="text-[11px] dark:text-slate-500 light:text-slate-400">
              On ${monthlyWagered.toLocaleString()} total wagered at 34.8% historical ROI
            </p>
          </div>
        </div>
      </div>

      {/* ─── Feature Comparison Table ─── */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black dark:text-white light:text-slate-900 text-center font-display">
          Plan Comparison
        </h2>

        <div className="bet-card rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs dark:text-slate-300 light:text-slate-700">
              <thead className="dark:bg-slate-900 light:bg-slate-50 font-bold uppercase tracking-wider text-[10px] border-b dark:border-slate-800 light:border-slate-200">
                <tr>
                  <th className="py-4 px-6 dark:text-slate-200 light:text-slate-800">Feature</th>
                  <th className="py-4 px-6 text-center dark:text-slate-400 light:text-slate-500">Free</th>
                  <th className="py-4 px-6 text-center text-[#38bdf8]">Pro ($29.99)</th>
                  <th className="py-4 px-6 text-center text-[#38bdf8]">Champion ($199.99)</th>
                </tr>
              </thead>
              <tbody className="divide-y dark:divide-slate-800 light:divide-slate-100">
                {featureMatrix.map((row, idx) => (
                  <tr key={idx} className="dark:hover:bg-slate-900/50 light:hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6 font-semibold dark:text-slate-200 light:text-slate-800">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {row.free ? <Check className="w-5 h-5 text-[#38bdf8] mx-auto" /> : <X className="w-4 h-4 dark:text-slate-700 light:text-slate-300 mx-auto" />}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {row.pro ? <Check className="w-5 h-5 text-[#38bdf8] mx-auto" /> : <X className="w-4 h-4 dark:text-slate-700 light:text-slate-300 mx-auto" />}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {row.champion ? <Check className="w-5 h-5 text-[#38bdf8] mx-auto" /> : <X className="w-4 h-4 dark:text-slate-700 light:text-slate-300 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};
