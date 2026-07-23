import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

  const stats = [
    { val: '87.4%', label: 'Win Rate' },
    { val: '+34.8%', label: 'Monthly ROI' },
    { val: '14,500+', label: 'VIP Members' },
    { val: '4.9 / 5.0', label: 'Subscriber Rating' },
  ];

  const faqs = [
    {
      q: 'How are predictions generated?',
      a: 'We combine xG (Expected Goals) algorithms with expert tactical analysis, tracking injury reports, manager tendencies, and market line movements.',
    },
    {
      q: 'What is the verified win rate?',
      a: 'Our historical performance holds an 87.4% win rate on high-confidence picks and +34.8% average monthly ROI, verified independently.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes. No long-term contracts. Pause or cancel instantly from your Dashboard. No questions asked.',
    },
    {
      q: 'Which leagues are covered?',
      a: 'UEFA Champions League, Premier League, La Liga, Serie A, and Bundesliga. More leagues added monthly.',
    },
  ];

  const features = [
    {
      title: 'Statistical Form Modeling',
      desc: 'Predictive models analyse xG, defensive shape, injury data, and set-piece efficiency across 10,000+ historical fixtures.',
    },
    {
      title: 'Value Accumulators',
      desc: 'VIP members receive curated doubles and trebles engineered to maximise expected value against bookmaker margins.',
    },
    {
      title: 'Transparent Record',
      desc: 'Every tip is logged at publication time. No retroactive changes. Performance publicly audited monthly.',
    },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-base)' }}>

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Stadium background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-stadium.png')" }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(6,10,18,0.82) 0%, rgba(6,10,18,0.50) 40%, rgba(6,10,18,0.97) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(6,10,18,0.55) 0%, transparent 50%, rgba(6,10,18,0.55) 100%)' }} />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 py-24 text-center">

          {/* Eyebrow */}
          <p
            className="text-[11px] font-bold uppercase tracking-[0.2em] mb-6"
            style={{ color: 'var(--brand)' }}
          >
            Data-Backed Football Predictions
          </p>

          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-[90px] font-black tracking-tight text-white leading-[0.9] font-display mb-6">
            FIELD<br />
            <span style={{ color: 'var(--brand)' }}>FORECASTS</span>
          </h1>

          <p className="text-base sm:text-lg text-white/50 max-w-lg mx-auto leading-relaxed mb-10">
            Free tips every morning. High-probability VIP value bets for serious bettors.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <button
              onClick={() => onOpenCheckout(popularPlan)}
              className="w-full sm:w-auto px-8 py-4 font-bold text-sm text-slate-950 rounded-xl transition-all hover:brightness-110"
              style={{ backgroundColor: 'var(--brand)' }}
            >
              Unlock VIP — $29/mo
            </button>
            <Link
              to="/tips"
              className="w-full sm:w-auto px-8 py-4 font-medium text-sm text-white rounded-xl border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all text-center"
            >
              Today's Free Tips
            </Link>
          </div>

          {/* ─── STATS — below CTAs as requested ─── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-0 border border-white/10 rounded-2xl overflow-hidden max-w-3xl mx-auto backdrop-blur-sm bg-white/[0.02]">
            {stats.map(({ val, label }, i) => (
              <div
                key={label}
                className={`flex-1 py-4 px-3 sm:px-4 text-center ${i < stats.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-white/10' : ''}`}
              >
                <div className="text-lg sm:text-xl md:text-2xl font-black text-white font-mono leading-none whitespace-nowrap">{val}</div>
                <div className="text-[9px] sm:text-[10px] text-white/40 font-semibold uppercase tracking-wider mt-1.5 whitespace-nowrap">{label}</div>
              </div>
            ))}
          </div>

          {/* League tags */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {['Premier League', 'La Liga', 'Serie A', 'Champions League', 'Bundesliga'].map(league => (
              <span
                key={league}
                className="px-3 py-1 text-[10px] font-medium uppercase tracking-widest rounded"
                style={{ color: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {league}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FREE PICKS ─── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 py-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--brand)' }}>
              Free Picks
            </p>
            <h2 className="text-2xl sm:text-3xl font-black font-display" style={{ color: 'var(--text-primary)' }}>
              Today's Predictions
            </h2>
          </div>
          <Link
            to="/tips"
            className="text-xs font-semibold underline underline-offset-4 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            See all tips
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {freeTips.map(prediction => (
            <PredictionCard key={prediction.id} prediction={prediction} />
          ))}
        </div>
      </section>

      {/* ─── VIP TEASER ─── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20">
        <div
          className="relative rounded-2xl overflow-hidden border"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-surface)' }}
        >
          {/* Subtle stadium texture */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
            style={{ backgroundImage: "url('/hero-stadium.png')" }}
          />

          <div className="relative z-10 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--brand)' }}>
                  VIP Selections
                </p>
                <h2 className="text-2xl sm:text-3xl font-black leading-tight font-display" style={{ color: 'var(--text-primary)' }}>
                  Tonight's High-Probability Picks
                </h2>
              </div>

              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Model flagged <strong style={{ color: 'var(--text-primary)' }}>2 value picks</strong> with 90%+ win probability and odds of 2.10+. Subscribers only.
              </p>

              <ul className="space-y-2.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                {[
                  'Real Madrid vs Bayern Munich',
                  'Man City vs Liverpool — Asian Handicap -1.0',
                ].map(pick => (
                  <li key={pick} className="flex items-center gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: 'var(--brand)' }}
                    />
                    {pick}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => onOpenCheckout(popularPlan)}
                className="inline-block px-6 py-3 font-bold text-xs uppercase tracking-wider text-slate-950 rounded-lg transition-all hover:brightness-110"
                style={{ backgroundColor: 'var(--brand)' }}
              >
                Unlock VIP — $29/mo
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
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

      {/* ─── WHY ─── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-black font-display" style={{ color: 'var(--text-primary)' }}>
            Why Bettors Choose Us
          </h2>
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            No guesswork. Pure statistics and market intelligence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {features.map(({ title, desc }) => (
            <div key={title} className="p-7 rounded-2xl bet-card space-y-3">
              <h3 className="text-sm font-bold font-display" style={{ color: 'var(--text-primary)' }}>{title}</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="max-w-3xl mx-auto px-5 sm:px-8 pb-20">
        <h2
          className="text-2xl font-black mb-8 font-display"
          style={{ color: 'var(--text-primary)' }}
        >
          Questions
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="rounded-xl overflow-hidden bet-card">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-sm font-semibold transition-colors"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span>{faq.q}</span>
                  <span
                    className="ml-4 flex-shrink-0 text-lg leading-none font-light"
                    style={{ color: 'var(--brand)' }}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div
                    className="px-5 pb-5 text-xs leading-relaxed border-t pt-4"
                    style={{ color: 'var(--text-secondary)', borderColor: 'var(--border)' }}
                  >
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 pb-20">
        <div
          className="relative rounded-2xl overflow-hidden text-center py-20 px-8 border"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-surface)' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center opacity-[0.04]"
            style={{ backgroundImage: "url('/hero-stadium.png')" }}
          />
          <div className="relative z-10 max-w-md mx-auto space-y-4">
            <h2
              className="text-3xl sm:text-4xl font-black font-display"
              style={{ color: 'var(--text-primary)' }}
            >
              Bet Smarter.
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Join 14,500+ subscribers. Cancel anytime.
            </p>
            <div className="pt-3">
              <button
                onClick={() => onOpenCheckout(popularPlan)}
                className="px-8 py-4 font-bold text-sm text-slate-950 rounded-xl transition-all hover:brightness-110"
                style={{ backgroundColor: 'var(--brand)' }}
              >
                Get Started — $29/mo
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
