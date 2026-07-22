import React from 'react';
import { CheckCircle2, Crown, Zap, Sparkles, ArrowRight } from 'lucide-react';
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
          ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-[#151e32] border-2 border-amber-400 shadow-2xl shadow-amber-500/10 transform lg:-translate-y-2'
          : 'glass-card glass-card-hover border-slate-800'
      }`}
    >
      {/* Popular Highlight Badge */}
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-[#5EB8E8] text-slate-950 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
          <span>MOST POPULAR CHOICE</span>
        </div>
      )}

      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <span>{plan.name}</span>
            {plan.popular && <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />}
          </h3>

          {plan.savings && (
            <span className="text-[11px] font-extrabold uppercase tracking-wide bg-[#5EB8E8]/10 text-[#5EB8E8] border border-[#5EB8E8]/30 px-2.5 py-1 rounded-full">
              {plan.savings}
            </span>
          )}
        </div>

        <p className="mt-2 text-xs text-slate-400 leading-relaxed min-h-[36px]">
          {plan.description}
        </p>

        {/* Pricing tag */}
        <div className="mt-6 flex items-baseline space-x-1 pb-6 border-b border-slate-800">
          <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
            {plan.price}
          </span>
          <span className="text-slate-400 text-sm font-medium">{plan.period}</span>
        </div>

        {/* Features List */}
        <div className="mt-6 space-y-3">
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider">Included Perks:</p>
          <ul className="space-y-2.5">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-300">
                <CheckCircle2
                  className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                    plan.popular ? 'text-amber-400' : 'text-[#5EB8E8]'
                  }`}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Action Button */}
      <div className="mt-8">
        {isCurrentPlan ? (
          <div className="w-full py-3.5 bg-slate-800 text-emerald-400 text-xs font-bold rounded-xl border border-emerald-500/30 text-center flex items-center justify-center space-x-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Active Subscription</span>
          </div>
        ) : (
          <button
            onClick={() => onSelectPlan(plan)}
            className={`w-full py-3.5 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg transform hover:scale-[1.02] ${
              plan.popular
                ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-[#5EB8E8] text-slate-950 shadow-amber-400/20 hover:brightness-110'
                : 'bg-[#5EB8E8] text-slate-950 hover:bg-sky-300 shadow-[#5EB8E8]/20'
            }`}
          >
            <span>Subscribe Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
