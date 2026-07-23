import React, { useState } from 'react';
import { Search, Crown, ArrowRight, Zap, Trophy } from 'lucide-react';
import { usePredictions } from '../context/PredictionsContext';
import { PredictionCard } from '../components/PredictionCard';
import { LEAGUE_OPTIONS, SUBSCRIPTION_PLANS } from '../data/predictions';
import type { SubscriptionPlan } from '../types/prediction';

interface FreeTipsPageProps {
  onOpenCheckout: (plan: SubscriptionPlan) => void;
}

export const FreeTipsPage: React.FC<FreeTipsPageProps> = ({ onOpenCheckout }) => {
  const { predictions } = usePredictions();
  const [selectedLeague, setSelectedLeague] = useState('All Leagues');
  const [searchQuery, setSearchQuery] = useState('');

  const freePredictions = predictions.filter(p => p.tier === 'free');

  const filteredPredictions = freePredictions.filter(p => {
    const matchesLeague = selectedLeague === 'All Leagues' || p.league === selectedLeague;
    const matchesSearch =
      p.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tip.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLeague && matchesSearch;
  });

  const popularPlan = SUBSCRIPTION_PLANS.find(p => p.popular) || SUBSCRIPTION_PLANS[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">

      {/* Page Header — clean, no pills/labels */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-[#38bdf8]" />
          <h1 className="text-3xl sm:text-5xl font-black dark:text-white light:text-slate-900 font-display">
            Daily Free Tips
          </h1>
        </div>
        <p className="text-xs sm:text-sm dark:text-slate-400 light:text-slate-600 max-w-xl">
          Match tips across Premier League, La Liga, Serie A, Champions League, and Bundesliga. Updated daily at 09:00 AM GMT.
        </p>
      </div>

      {/* Filters */}
      <div className="bet-card rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-stretch md:items-center gap-4">
        
        {/* Search */}
        <div className="relative flex-grow max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search team or tip type..."
            className="w-full dark:bg-slate-900 light:bg-slate-50 border dark:border-slate-800 light:border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs dark:text-slate-200 light:text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#38bdf8] transition-colors"
          />
        </div>

        {/* League Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none flex-wrap gap-1">
          {LEAGUE_OPTIONS.map(league => (
            <button
              key={league}
              onClick={() => setSelectedLeague(league)}
              className={`px-3.5 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap transition-all ${
                selectedLeague === league
                  ? 'bg-[#38bdf8] text-slate-950 shadow-md'
                  : 'dark:bg-slate-900 light:bg-slate-100 dark:text-slate-300 light:text-slate-600 dark:border-slate-800 light:border-slate-200 border hover:border-sky-400/50 hover:text-[#38bdf8]'
              }`}
            >
              {league}
            </button>
          ))}
        </div>
      </div>

      {/* Result count */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold dark:text-slate-500 light:text-slate-400 uppercase tracking-wider">
          {filteredPredictions.length} tip{filteredPredictions.length !== 1 ? 's' : ''} today
        </span>
        <span className="text-[11px] dark:text-slate-600 light:text-slate-400">Updated 09:00 AM GMT</span>
      </div>

      {/* Predictions Grid */}
      {filteredPredictions.length === 0 ? (
        <div className="p-12 text-center bet-card rounded-3xl space-y-3">
          <Trophy className="w-10 h-10 text-slate-500 mx-auto" />
          <p className="text-sm font-semibold dark:text-slate-500 light:text-slate-500">No tips found for your criteria.</p>
          <button
            onClick={() => { setSelectedLeague('All Leagues'); setSearchQuery(''); }}
            className="text-xs font-bold text-[#38bdf8] underline"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPredictions.map(prediction => (
            <PredictionCard key={prediction.id} prediction={prediction} />
          ))}
        </div>
      )}

      {/* VIP Upgrade Strip */}
      <div className="bet-card rounded-3xl border border-sky-500/20 p-7 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center sm:text-left">
          <div className="flex items-center space-x-2 justify-center sm:justify-start">
            <Crown className="w-5 h-5 text-[#38bdf8] fill-[#38bdf8]" />
            <span className="text-sm font-black dark:text-white light:text-slate-900 font-display">Want Higher Odds & Value Accumulators?</span>
          </div>
          <p className="text-xs dark:text-slate-400 light:text-slate-600 max-w-md">
            VIP members unlock 90%+ confidence picks, Asian handicap lines, and same-day Telegram alerts.
          </p>
        </div>

        <button
          onClick={() => onOpenCheckout(popularPlan)}
          className="px-6 py-3.5 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-1.5 flex-shrink-0 hover:brightness-110 transform hover:scale-105"
        >
          <span>Upgrade to VIP</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
