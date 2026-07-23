import React from 'react';
import { CheckCircle2, Crown, ArrowRight } from 'lucide-react';
import type { SubscriptionPlan } from '../types/prediction';

interface PricingCardProps {
  plan: SubscriptionPlan;
  isCurrentPlan?: boolean;
  onSelectPlan: (plan: SubscriptionPlan) => void;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  isCurrentPlan,
  onSelectPlan,
}) => {
  return (
    <div
      className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
        plan.popular
          ? 'bet-card border-2 border-[#38bdf8] shadow-xl shadow-sky-500/10 transform lg:-translate-y-2'
          : 'bet-card border'
      }`}
    >
      {/* Popular Highlight Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-slate-950 text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md flex items-center space-x-1 font-display">
          <span>MOST POPULAR CHOICE</span>
        </div>
      )}

      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center space-x-2 font-display">
            <span>{plan.name}</span>
            {plan.popular && <Crown className="w-5 h-5 text-[#38bdf8] fill-[#38bdf8]" />}
          </h3>

          {plan.savings && (
            <span className="text-[11px] font-extrabold uppercase tracking-wide bg-sky-500/10 text-[#38bdf8] border border-sky-500/30 px-2.5 py-1 rounded-full font-mono">
              {plan.savings}
            </span>
          )}
        </div>

        <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed min-h-[36px]">
          {plan.description}
        </p>

        {/* Pricing tag */}
        <div className="mt-6 flex items-baseline space-x-1 pb-6 border-b dark:border-slate-800 light:border-slate-200">
          <span className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-mono">
            {plan.price}
          </span>
          <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">{plan.period}</span>
        </div>

        {/* Features List */}
        <div className="mt-6 space-y-3">
          <p className="text-xs font-extrabold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-display">Included Features:</p>
          <ul className="space-y-2.5">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#38bdf8]" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8">
        {isCurrentPlan ? (
          <div className="w-full py-3.5 bg-sky-500/10 text-[#38bdf8] text-xs font-extrabold uppercase tracking-wider rounded-xl border border-sky-500/30 text-center flex items-center justify-center space-x-1.5 font-display">
            <CheckCircle2 className="w-4 h-4" />
            <span>Active Subscription</span>
          </div>
        ) : (
          <button
            onClick={() => onSelectPlan(plan)}
            className="w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-md transform hover:scale-[1.02] bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-slate-950 font-display"
          >
            <span>Subscribe Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
