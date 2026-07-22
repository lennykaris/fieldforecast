import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Search, Filter, Crown, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { usePredictions } from '../context/PredictionsContext';
import { PredictionCard } from '../components/PredictionCard';
import { LEAGUE_OPTIONS } from '../data/predictions';
import type { SubscriptionPlan } from '../types/prediction';
import { SUBSCRIPTION_PLANS } from '../data/predictions';

interface FreeTipsPageProps {
  onOpenCheckout: (plan: SubscriptionPlan) => void;
}

export const FreeTipsPage: React.FC<FreeTipsPageProps> = ({ onOpenCheckout }) => {
  const { predictions } = usePredictions();

  const [selectedLeague, setSelectedLeague] = useState('All Leagues');
  const [searchQuery, setSearchQuery] = useState('');
  const [minConfidence, setMinConfidence] = useState<number>(0);

  // Filter predictions where tier === 'free'
  const freePredictions = predictions.filter(p => p.tier === 'free');

  const filteredPredictions = freePredictions.filter(p => {
    const matchesLeague = selectedLeague === 'All Leagues' || p.league === selectedLeague;
    const matchesSearch =
      p.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tip.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesConfidence = p.confidence >= minConfidence;
    return matchesLeague && matchesSearch && matchesConfidence;
  });

  const popularPlan = SUBSCRIPTION_PLANS.find(p => p.popular) || SUBSCRIPTION_PLANS[1];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#5EB8E8]/10 border border-[#5EB8E8]/30 text-[#5EB8E8] text-xs font-bold uppercase tracking-wider">
          <Zap className="w-4 h-4" />
          <span>Daily Free Football Predictions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Free Match Intelligence & Tips
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Comprehensive match tips across Premier League, La Liga, Serie A, Champions League, and Bundesliga. Filter by league or confidence rating below.
        </p>
      </div>

      {/* Filters Bar */}
      <div className="glass-card border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search team, fixture, or tip type..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5EB8E8]"
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
                    ? 'bg-[#5EB8E8] text-slate-950 shadow-md shadow-[#5EB8E8]/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800'
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
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Showing {filteredPredictions.length} Free Tips
          </span>
          <span className="text-xs text-slate-500">Updated Daily @ 09:00 AM GMT</span>
        </div>

        {filteredPredictions.length === 0 ? (
          <div className="p-12 text-center glass-card border border-slate-800 rounded-3xl space-y-3">
            <p className="text-sm font-semibold text-slate-400">No free predictions matching your criteria.</p>
            <button
              onClick={() => { setSelectedLeague('All Leagues'); setSearchQuery(''); }}
              className="text-xs font-bold text-[#5EB8E8] underline"
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
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-[#151e32] to-slate-900 border border-amber-500/30 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center space-x-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Crown className="w-4 h-4 fill-amber-400" />
            <span>Looking for higher odds & value accumulators?</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            Unlock 10+ Exclusive VIP Picks Daily
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            VIP members gain access to 90%+ confidence ratings, high-odds Asian handicaps, and direct Telegram instant alert notifications.
          </p>
        </div>

        <button
          onClick={() => onOpenCheckout(popularPlan)}
          className="px-6 py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-[#5EB8E8] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-amber-400/20 hover:brightness-110 transition-all flex items-center space-x-1.5 flex-shrink-0"
        >
          <span>Upgrade to VIP ($29.99/mo)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
