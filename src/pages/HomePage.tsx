import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  Crown, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Percent, 
  DollarSign, 
  Users,
  Flame
} from 'lucide-react';
import { usePredictions } from '../context/PredictionsContext';
import { useAuth } from '../context/AuthContext';
import { PredictionCard } from '../components/PredictionCard';
import { SUBSCRIPTION_PLANS } from '../data/predictions';
import type { SubscriptionPlan } from '../types/prediction';

interface HomePageProps {
  onOpenCheckout: (plan: SubscriptionPlan) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenCheckout }) => {
  const { predictions } = usePredictions();
  const { isVip } = useAuth();
  const navigate = useNavigate();

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Free picks preview (3 items)
  const freeTips = predictions.filter(p => p.tier === 'free').slice(0, 3);
  
  // Teaser VIP picks (2 items)
  const vipTeasers = predictions.filter(p => p.tier === 'vip').slice(0, 2);

  const popularPlan = SUBSCRIPTION_PLANS.find(p => p.popular) || SUBSCRIPTION_PLANS[1];

  const faqs = [
    {
      q: 'How are Fieldforecasts predictions generated?',
      a: 'We combine advanced statistical xG (Expected Goals) algorithms with expert tactical analysis, tracking team injury reports, manager tendencies, and market line movements.',
    },
    {
      q: 'What is the average win rate of VIP predictions?',
      a: 'Our verified historical performance holds an 87.4% win rate on high-confidence (85%+) picks and a +34.8% average monthly Return on Investment (ROI).',
    },
    {
      q: 'Can I cancel my VIP subscription anytime?',
      a: 'Yes, absolutely! There are no long-term contracts. You can pause or cancel your subscription instantly from your Subscriber Dashboard.',
    },
    {
      q: 'Which sports and leagues are covered?',
      a: 'We cover Europe\'s top football competitions: UEFA Champions League, English Premier League, Spanish La Liga, Italian Serie A, and German Bundesliga.',
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 pb-16 overflow-hidden">
        
        {/* Glow backdrop graphics */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#5EB8E8]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Top Pill Alert */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#5EB8E8]/10 border border-[#5EB8E8]/30 text-[#5EB8E8] text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Today's Match Picks Now Live • 87.4% Win Rate</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
            Unfair Advantage in <br />
            <span className="text-gradient-brand">Sports Prediction</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Data-backed statistical models and high-confidence football insights. Get daily free tips or unlock high-odds VIP picks with proven monthly ROI.
          </p>

          {/* Hero CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenCheckout(popularPlan)}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-[#5EB8E8] text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-xl shadow-amber-400/20 hover:brightness-110 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Crown className="w-5 h-5 fill-slate-950" />
              <span>Unlock VIP Picks Now</span>
            </button>

            <Link
              to="/tips"
              className="w-full sm:w-auto px-8 py-4 glass-card text-white hover:text-[#5EB8E8] font-bold text-sm rounded-2xl border border-slate-700 hover:border-[#5EB8E8]/50 transition-all flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5 text-[#5EB8E8]" />
              <span>View Free Tips</span>
            </Link>
          </div>

          {/* Live Stats Ticker Grid */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            <div className="p-4 rounded-2xl glass-card border border-slate-800 text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#5EB8E8] font-mono">87.4%</span>
              <p className="text-xs text-slate-400 font-semibold mt-1">Verified Win Rate</p>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-800 text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">+34.8%</span>
              <p className="text-xs text-slate-400 font-semibold mt-1">Avg Monthly ROI</p>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-800 text-center">
              <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">14,500+</span>
              <p className="text-xs text-slate-400 font-semibold mt-1">Active VIP Members</p>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-slate-800 text-center">
              <span className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">4.9 / 5.0</span>
              <p className="text-xs text-slate-400 font-semibold mt-1">Subscriber Rating</p>
            </div>
          </div>

        </div>
      </section>

      {/* TODAY'S FREE TIPS PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-[#5EB8E8] text-xs font-bold uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Daily Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-1">
              Today's Free Predictions
            </h2>
          </div>

          <Link
            to="/tips"
            className="text-xs font-bold text-[#5EB8E8] hover:text-sky-300 flex items-center space-x-1 uppercase tracking-wider"
          >
            <span>Explore All Free Predictions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeTips.map(prediction => (
            <PredictionCard key={prediction.id} prediction={prediction} />
          ))}
        </div>
      </section>

      {/* LOCKED VIP PICKS TEASER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-[#151e32] to-slate-900 border-2 border-amber-500/40 p-8 sm:p-12 overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Crown className="w-4 h-4 fill-amber-400" />
                <span>Exclusive Locked VIP Match Picks</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                High-Odds Champions League & Premier League VIP Value Bets
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Our AI model has flagged 2 premium value picks for tonight's fixtures with calculated probabilities over 90% and decimal odds of 2.10+.
              </p>

              <div className="flex flex-wrap gap-4 text-xs text-slate-300 font-semibold pt-2">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Real Madrid vs Bayern Munich (Qualify)</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>Man City vs Liverpool (-1.0 Asian Handicap)</span>
                </span>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onOpenCheckout(popularPlan)}
                  className="px-8 py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-[#5EB8E8] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-amber-400/20 hover:brightness-110 transition-all flex items-center space-x-2"
                >
                  <Crown className="w-4 h-4 fill-slate-950" />
                  <span>Unlock Both VIP Tips ($29.99/mo)</span>
                </button>
              </div>
            </div>

            {/* Teaser Cards Grid */}
            <div className="lg:col-span-5 grid grid-cols-1 gap-4">
              {vipTeasers.map(p => (
                <PredictionCard
                  key={p.id}
                  prediction={p}
                  onUnlockClick={() => onOpenCheckout(popularPlan)}
                />
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* WHY CHOOSE FIELDFORECASTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5EB8E8]">Data Science Meets Sports</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
            Why Bettors Trust Fieldforecasts
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-400">
            We eliminate emotional guesswork by relying strictly on quantitative statistical modeling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl glass-card border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#5EB8E8]/10 border border-[#5EB8E8]/30 flex items-center justify-center text-[#5EB8E8]">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">xG Quantitative Modeling</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Our proprietary predictive algorithms analyze shot location xG, defensive pressure metrics, and set-piece efficiency across 10,000+ matches.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">High-Value Accumulators</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              VIP members receive curated double and triple accumulator combinations engineered for maximum expected value (+EV) against bookmaker odds.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-card border border-slate-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Transparent Tracking</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No hidden record changes or erased losses. Every tip published is recorded live and audited in our public performance logs.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5EB8E8]">Got Questions?</span>
          <h2 className="text-3xl font-black text-white mt-1">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-card border border-slate-800 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#5EB8E8]" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#5EB8E8]/20 via-slate-900 to-[#5EB8E8]/20 border border-[#5EB8E8]/40 p-8 sm:p-12 text-center relative overflow-hidden">
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Ready to Upgrade Your Sports Betting Strategy?
          </h2>
          <p className="mt-4 text-xs sm:text-base text-slate-300 max-w-xl mx-auto">
            Join over 14,500 subscribers leveraging Fieldforecasts daily picks. Cancel anytime.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => onOpenCheckout(popularPlan)}
              className="px-8 py-4 bg-[#5EB8E8] hover:bg-sky-300 text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-xl shadow-[#5EB8E8]/30 transition-all transform hover:scale-105 flex items-center space-x-2"
            >
              <Crown className="w-4 h-4 fill-slate-950" />
              <span>Get Started ($29.99/mo)</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
