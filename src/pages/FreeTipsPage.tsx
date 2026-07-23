import React, { useState } from 'react';
import { Zap, Search, Filter, Crown, ArrowRight } from 'lucide-react';
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

  // Filter predictions where tier === 'free'
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 bg-white">
      
      {/* Header Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0EA5E9] text-xs font-bold uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          <span>Daily Free Football Predictions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900">
          Free Match Intelligence & Tips
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Match tips across Premier League, La Liga, Serie A, Champions League, and Bundesliga. Filter by league or search below.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search team, fixture, or tip type..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0EA5E9]"
            />
          </div>

          {/* League Tabs Pill Selector */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {LEAGUE_OPTIONS.map(league => (
              <button
                key={league}
                onClick={() => setSelectedLeague(league)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedLeague === league
                    ? 'bg-[#0EA5E9] text-white shadow-md'
                    : 'bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {league}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Predictions Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Showing {filteredPredictions.length} Free Tips
          </span>
          <span className="text-xs text-slate-400">Updated Daily @ 09:00 AM GMT</span>
        </div>

        {filteredPredictions.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-3xl space-y-3 shadow-xs">
            <p className="text-sm font-semibold text-slate-500">No free predictions matching your criteria.</p>
            <button
              onClick={() => { setSelectedLeague('All Leagues'); setSearchQuery(''); }}
              className="text-xs font-bold text-[#0EA5E9] underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPredictions.map(prediction => (
              <PredictionCard key={prediction.id} prediction={prediction} />
            ))}
          </div>
        )}
      </div>

      {/* Upgrade Banner */}
      <div className="rounded-3xl bg-sky-50 border border-sky-200 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center space-x-1.5 text-[#0EA5E9] text-xs font-bold uppercase tracking-wider">
            <Crown className="w-4 h-4 fill-[#0EA5E9]" />
            <span>Looking for higher odds & value accumulators?</span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900">
            Unlock 10+ Exclusive VIP Picks Daily
          </h3>
          <p className="text-xs text-slate-600 max-w-xl">
            VIP members gain access to 90%+ confidence ratings, high-odds Asian handicaps, and direct Telegram notifications.
          </p>
        </div>

        <button
          onClick={() => onOpenCheckout(popularPlan)}
          className="px-6 py-3.5 bg-[#0EA5E9] hover:bg-sky-600 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-1.5 flex-shrink-0"
        >
          <span>Upgrade to VIP ($29.99/mo)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
