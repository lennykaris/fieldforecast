import React, { useState } from 'react';
import { Crown, Sparkles, Check, X, ShieldCheck, Zap, Calculator, Trophy, ArrowRight } from 'lucide-react';
import { PricingCard } from '../components/PricingCard';
import { SUBSCRIPTION_PLANS } from '../data/predictions';
import type { SubscriptionPlan } from '../types/prediction';
import { useAuth } from '../context/AuthContext';

interface VipPageProps {
  onOpenCheckout: (plan: SubscriptionPlan) => void;
}

export const VipPage: React.FC<VipPageProps> = ({ onOpenCheckout }) => {
  const { user } = useAuth();
  
  // Interactive ROI Calculator State
  const [stakePerBet, setStakePerBet] = useState<number>(50);
  const [betsPerWeek, setBetsPerWeek] = useState<number>(10);

  // Calculated estimated monthly return (+34.8% ROI)
  const monthlyWagered = stakePerBet * betsPerWeek * 4;
  const estimatedMonthlyProfit = Math.round(monthlyWagered * 0.348);

  const featureMatrix = [
    { feature: 'Daily Free Predictions', free: true, pro: true, champion: true },
    { feature: '85%+ High-Confidence VIP Picks', free: false, pro: true, champion: true },
    { feature: 'Tactical & xG Deep Analyses', free: false, pro: true, champion: true },
    { feature: 'High-Odds Value Accumulators', free: false, pro: true, champion: true },
    { feature: 'Direct VIP Telegram Bot Alerts', free: false, pro: true, champion: true },
    { feature: 'Bankroll & ROI Calculator', free: false, pro: true, champion: true },
    { feature: '1-on-1 Staking Strategy Advice', free: false, pro: false, champion: true },
    { feature: 'Early-Bird Line Movement Alerts', free: false, pro: false, champion: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
          <Crown className="w-4 h-4 fill-amber-400" />
          <span>VIP Predictor Access</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
          Invest in High-Probability <br />
          <span className="text-gradient-brand">Sports Predictions</span>
        </h1>
        <p className="text-xs sm:text-base text-slate-300 leading-relaxed">
          Gain immediate access to our highest confidence picks, tactical breakdowns, and value accumulators engineered to outperform standard bookmaker margins.
        </p>
      </div>

      {/* PRICING CARDS GRID */}
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

      {/* INTERACTIVE ROI / PROFIT CALCULATOR */}
      <div className="rounded-3xl glass-card border border-slate-800 p-8 sm:p-12 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center space-x-2 text-[#5EB8E8] text-xs font-bold uppercase tracking-wider">
              <Calculator className="w-4 h-4" />
              <span>Interactive ROI Simulator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Estimate Your Potential Monthly Return
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
            Based on historical +34.8% field yield
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders Area */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Average Unit Stake Per Bet</span>
                <span className="text-[#5EB8E8] font-mono text-sm">${stakePerBet}</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={stakePerBet}
                onChange={e => setStakePerBet(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5EB8E8]"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">VIP Bets Played Per Week</span>
                <span className="text-[#5EB8E8] font-mono text-sm">{betsPerWeek} bets</span>
              </div>
              <input
                type="range"
                min="3"
                max="35"
                step="1"
                value={betsPerWeek}
                onChange={e => setBetsPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5EB8E8]"
              />
            </div>
          </div>

          {/* Result Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Estimated Monthly Net Profit
            </span>
            <span className="text-4xl sm:text-5xl font-black text-emerald-400 font-mono block">
              +${estimatedMonthlyProfit.toLocaleString()}
            </span>
            <p className="text-[11px] text-slate-500">
              *Calculated on ${monthlyWagered.toLocaleString()} total wagered volume at 34.8% historical ROI. Past performance does not guarantee future results.
            </p>
          </div>

        </div>
      </div>

      {/* FEATURE COMPARISON MATRIX */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Detailed Feature Comparison Matrix
          </h2>
          <p className="text-xs text-slate-400 mt-1">See what is included in each subscription tier.</p>
        </div>

        <div className="glass-card border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-slate-300 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-4 px-6">Feature / Perk</th>
                  <th className="py-4 px-6 text-center">Free Tier</th>
                  <th className="py-4 px-6 text-center text-[#5EB8E8]">Pro Predictor ($29.99)</th>
                  <th className="py-4 px-6 text-center text-amber-400">Champion VIP ($199.99)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {featureMatrix.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-6 font-semibold text-slate-200">{row.feature}</td>
                    
                    <td className="py-4 px-6 text-center">
                      {row.free ? (
                        <Check className="w-5 h-5 text-slate-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-600 mx-auto" />
                      )}
                    </td>

                    <td className="py-4 px-6 text-center">
                      {row.pro ? (
                        <Check className="w-5 h-5 text-[#5EB8E8] mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-600 mx-auto" />
                      )}
                    </td>

                    <td className="py-4 px-6 text-center">
                      {row.champion ? (
                        <Check className="w-5 h-5 text-amber-400 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-slate-600 mx-auto" />
                      )}
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
