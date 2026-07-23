import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Crown, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  ChevronUp,
  Trophy,
  Target,
  TrendingUp,
  Activity
} from 'lucide-react';
import { usePredictions } from '../context/PredictionsContext';
import { PredictionCard } from '../components/PredictionCard';
import { SUBSCRIPTION_PLANS } from '../data/predictions';
import type { SubscriptionPlan } from '../types/prediction';

interface HomePageProps {
  onOpenCheckout: (plan: SubscriptionPlan) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenCheckout }) => {
  const { predictions } = usePredictions();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const freeTips = predictions.filter(p => p.tier === 'free').slice(0, 3);
  const vipTeasers = predictions.filter(p => p.tier === 'vip').slice(0, 2);
  const popularPlan = SUBSCRIPTION_PLANS.find(p => p.popular) || SUBSCRIPTION_PLANS[1];

  const faqs = [
    {
      q: 'How are Fieldforecasts predictions generated?',
      a: 'We combine statistical xG (Expected Goals) algorithms with expert tactical analysis, tracking team injury reports, manager tendencies, and market line movements.',
    },
    {
      q: 'What is the average win rate of VIP predictions?',
      a: 'Our verified historical performance holds an 87.4% win rate on high-confidence picks and a +34.8% average monthly Return on Investment (ROI).',
    },
    {
      q: 'Can I cancel my VIP subscription anytime?',
      a: 'Yes, absolutely! There are no long-term contracts. You can pause or cancel your subscription instantly from your Subscriber Dashboard.',
    },
    {
      q: 'Which sports and leagues are covered?',
      a: "We cover Europe's top football competitions: UEFA Champions League, English Premier League, Spanish La Liga, Italian Serie A, and German Bundesliga.",
    },
  ];

  return (
    <div className="space-y-20 pb-16 dark:bg-[#060a12] light:bg-slate-50 transition-colors">

      {/* ─── HERO SECTION ─── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">

        {/* Stadium background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-stadium.png')" }}
        />

        {/* Dark gradient overlay — heavier at top+bottom, lighter in center */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a12]/90 via-[#060a12]/60 to-[#060a12]/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#060a12]/70 via-transparent to-[#060a12]/70" />

        {/* Sky-blue glow punch */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-sky-400/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">

          {/* Stat ribbon — no pill labels, just numbers */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {[
              { icon: <Activity className="w-4 h-4" />, val: '87.4%', label: 'Win Rate' },
              { icon: <TrendingUp className="w-4 h-4" />, val: '+34.8%', label: 'Avg Monthly ROI' },
              { icon: <Trophy className="w-4 h-4" />, val: '14,500+', label: 'VIP Members' },
              { icon: <Target className="w-4 h-4" />, val: '4.9 / 5.0', label: 'Subscriber Rating' },
            ].map(({ icon, val, label }) => (
              <div key={label} className="flex items-center space-x-2.5 text-white/90">
                <span className="text-[#38bdf8]">{icon}</span>
                <span className="font-mono font-extrabold text-lg sm:text-xl text-white">{val}</span>
                <span className="text-xs text-white/50 font-medium hidden sm:block">{label}</span>
              </div>
            ))}
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white max-w-4xl mx-auto leading-[1.0] font-display">
            FIELD<span className="text-[#38bdf8]">FORECASTS</span>
          </h1>
          <p className="mt-5 text-base sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-light">
            Data-backed football predictions with verified daily picks. Free tips every morning. 
            High-probability VIP value bets for serious bettors.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenCheckout(popularPlan)}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-slate-950 font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg shadow-sky-500/30 hover:brightness-110 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <Crown className="w-5 h-5 fill-slate-950" />
              <span>Unlock VIP — $29/mo</span>
            </button>

            <Link
              to="/tips"
              className="w-full sm:w-auto px-8 py-4 text-white font-bold text-sm rounded-2xl border border-white/20 hover:border-sky-400/50 hover:bg-white/5 backdrop-blur-sm transition-all flex items-center justify-center space-x-2"
            >
              <Zap className="w-5 h-5 text-[#38bdf8]" />
              <span>Today's Free Tips</span>
            </Link>
          </div>

          {/* Subtle league icons / sport markers */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {['Premier League', 'La Liga', 'Serie A', 'Champions League', 'Bundesliga'].map(league => (
              <span
                key={league}
                className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white/40 border border-white/10 rounded-full backdrop-blur-sm"
              >
                {league}
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* ─── TODAY'S FREE PICKS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2 text-[#38bdf8]">
              <Zap className="w-5 h-5" />
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#38bdf8]">Free Picks</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black dark:text-white light:text-slate-900 font-display">
              Today's Predictions
            </h2>
          </div>
          <Link
            to="/tips"
            className="text-xs font-bold text-[#38bdf8] hover:underline flex items-center space-x-1 uppercase tracking-wider"
          >
            <span>All Free Predictions</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {freeTips.map(prediction => (
            <PredictionCard key={prediction.id} prediction={prediction} />
          ))}
        </div>
      </section>

      {/* ─── VIP TEASER BANNER ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden border border-sky-500/30 shadow-xl shadow-sky-500/10">
          
          {/* Background texture */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: "url('/hero-stadium.png')" }}
          />
          <div className="absolute inset-0 dark:bg-[#0a1628]/95 light:bg-sky-50/95" />
          
          <div className="relative z-10 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">

              <div className="flex items-center space-x-3">
                <Crown className="w-7 h-7 text-[#38bdf8] fill-[#38bdf8]" />
                <h2 className="text-2xl sm:text-4xl font-black dark:text-white light:text-slate-900 leading-tight font-display">
                  VIP Match Selections
                </h2>
              </div>

              <p className="text-xs sm:text-sm dark:text-slate-400 light:text-slate-600 leading-relaxed max-w-lg">
                Tonight's model has flagged <span className="text-[#38bdf8] font-bold">2 premium value picks</span> with 90%+ win probability and decimal odds of 2.10+. Unlock instant access below.
              </p>

              <div className="flex flex-wrap gap-4 text-xs dark:text-slate-300 light:text-slate-700 font-semibold pt-2">
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38bdf8]" />
                  <span>Real Madrid vs Bayern Munich</span>
                </span>
                <span className="flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#38bdf8]" />
                  <span>Man City vs Liverpool (-1.0 AH)</span>
                </span>
              </div>

              <button
                onClick={() => onOpenCheckout(popularPlan)}
                className="px-7 py-3.5 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-2 hover:brightness-110 transform hover:scale-105"
              >
                <Crown className="w-4 h-4 fill-slate-950" />
                <span>Unlock VIP Picks — $29/mo</span>
              </button>
            </div>

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

      {/* ─── WHY FIELDFORECASTS ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl sm:text-4xl font-black dark:text-white light:text-slate-900 font-display">
            Why Bettors Trust Fieldforecasts
          </h2>
          <p className="text-xs sm:text-sm dark:text-slate-500 light:text-slate-500">
            No guesswork. Pure statistics, form analysis, and market intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <BarChart3 className="w-6 h-6" />,
              title: 'Statistical Form Modeling',
              desc: 'Our predictive models analyse xG, defensive shape, injury data, and set-piece efficiency across 10,000+ historical fixtures.',
            },
            {
              icon: <Crown className="w-6 h-6" />,
              title: 'High-Value Accumulators',
              desc: 'VIP members receive curated doubles and trebles engineered to maximise expected value against bookmaker margins.',
            },
            {
              icon: <ShieldCheck className="w-6 h-6" />,
              title: 'Transparent Record',
              desc: 'No hidden changes. Every tip is recorded live at publication and logged publicly in our performance tracker.',
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="p-8 rounded-3xl bet-card space-y-4 group transition-all cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-[#38bdf8] group-hover:bg-sky-500/20 transition-colors">
                {icon}
              </div>
              <h3 className="text-base font-bold dark:text-white light:text-slate-900 font-display">{title}</h3>
              <p className="text-xs dark:text-slate-400 light:text-slate-600 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-black dark:text-white light:text-slate-900 mb-8 text-center font-display">
          Frequently Asked
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bet-card overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between font-bold text-sm dark:text-slate-200 light:text-slate-800 hover:text-[#38bdf8] transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#38bdf8] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 dark:text-slate-500 light:text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs dark:text-slate-400 light:text-slate-600 leading-relaxed border-t dark:border-slate-800 light:border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden text-center py-16 px-8 border border-sky-500/20">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-5"
            style={{ backgroundImage: "url('/hero-stadium.png')" }}
          />
          <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-[#0a1628] dark:to-[#060a12] light:bg-gradient-to-br light:from-sky-50 light:to-white" />
          
          <div className="relative z-10 space-y-4">
            <Trophy className="w-12 h-12 text-[#38bdf8] mx-auto" />
            <h2 className="text-3xl sm:text-5xl font-black dark:text-white light:text-slate-900 font-display max-w-2xl mx-auto leading-tight">
              Ready to Bet Smarter?
            </h2>
            <p className="text-sm dark:text-slate-400 light:text-slate-600 max-w-xl mx-auto">
              Join 14,500+ subscribers using Fieldforecasts daily. Cancel anytime.
            </p>
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => onOpenCheckout(popularPlan)}
                className="px-8 py-4 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-slate-950 font-black text-xs uppercase tracking-wider rounded-2xl shadow-lg shadow-sky-500/20 transition-all transform hover:scale-105 flex items-center space-x-2"
              >
                <Crown className="w-4 h-4 fill-slate-950" />
                <span>Get Started — $29/mo</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
