import React, { useState } from 'react';
import { 
  Crown, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Zap,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import type { Prediction } from '../types/prediction';
import { useAuth } from '../context/AuthContext';

interface PredictionCardProps {
  prediction: Prediction;
  onUnlockClick?: () => void;
}

export const PredictionCard: React.FC<PredictionCardProps> = ({ prediction, onUnlockClick }) => {
  const { isVip } = useAuth();
  const [showAnalysis, setShowAnalysis] = useState(false);

  const isLocked = prediction.tier === 'vip' && !isVip;

  // Format Kickoff Date
  const formatKickoff = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`relative rounded-2xl bet-card overflow-hidden transition-all duration-300 ${
      prediction.tier === 'vip' ? 'border-sky-500/40' : ''
    }`}>
      
      {/* Top Banner Stripe */}
      <div className="px-4 py-2.5 bet-header flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider font-display">
            {prediction.league}
          </span>
          {prediction.category && (
            <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
              • {prediction.category}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center space-x-1 font-mono">
            <Clock className="w-3 h-3 text-slate-400" />
            <span>{formatKickoff(prediction.kickoff)}</span>
          </span>

          {prediction.tier === 'vip' ? (
            <span className="flex items-center space-x-1 bg-sky-500/10 text-[#38bdf8] border border-sky-500/30 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full font-display">
              <Crown className="w-3 h-3 fill-[#38bdf8]" />
              <span>VIP Pick</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1 bg-sky-500/10 text-[#38bdf8] border border-sky-500/20 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full font-display">
              <Zap className="w-3 h-3" />
              <span>Free Tip</span>
            </span>
          )}
        </div>
      </div>

      {/* Main Match Card Area */}
      <div className="p-5 relative">
        
        {/* Teams Matchup Header */}
        <div className="grid grid-cols-11 items-center mb-5">
          {/* Home Team */}
          <div className="col-span-5 flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full dark:bg-slate-800 light:bg-slate-100 border dark:border-slate-700 light:border-slate-200 flex items-center justify-center font-extrabold text-slate-900 dark:text-slate-100 text-xs flex-shrink-0 font-display">
              {prediction.homeTeam.substring(0, 3).toUpperCase()}
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight font-display">
                {prediction.homeTeam}
              </h3>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Home</span>
            </div>
          </div>

          {/* VS Divider */}
          <div className="col-span-1 text-center">
            <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
              VS
            </span>
          </div>

          {/* Away Team */}
          <div className="col-span-5 flex items-center justify-end space-x-3 text-right">
            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight font-display">
                {prediction.awayTeam}
              </h3>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Away</span>
            </div>
            <div className="w-9 h-9 rounded-full dark:bg-slate-800 light:bg-slate-100 border dark:border-slate-700 light:border-slate-200 flex items-center justify-center font-extrabold text-slate-900 dark:text-slate-100 text-xs flex-shrink-0 font-display">
              {prediction.awayTeam.substring(0, 3).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Tip & Odds Row */}
        <div className="p-3.5 rounded-xl bet-odds-box flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 font-display">
              Selection Pick
            </span>
            <div className="font-extrabold text-sm sm:text-base text-[#38bdf8] flex items-center space-x-1.5 font-display">
              <span>{prediction.tip}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block font-display">
              Odds
            </span>
            <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono bg-sky-500/10 border border-sky-500/30 px-2.5 py-0.5 rounded-lg">
              @{prediction.odds.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Win Probability Bar */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-bold flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#38bdf8]" />
              <span>Win Probability</span>
            </span>
            <span className="font-mono font-extrabold text-[#38bdf8]">
              {prediction.confidence}%
            </span>
          </div>
          
          <div className="w-full dark:bg-slate-900 light:bg-slate-100 h-2 rounded-full overflow-hidden p-0.5 border dark:border-slate-800 light:border-slate-200">
            <div
              className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8]"
              style={{ width: `${prediction.confidence}%` }}
            />
          </div>
        </div>

        {/* Tactical Rationale Toggle */}
        {prediction.analysis && !isLocked && (
          <div className="mt-4 pt-3 border-t dark:border-slate-800/80 light:border-slate-100">
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="w-full flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-[#38bdf8] transition-colors"
            >
              <span>Match Rationale & Form Breakdown</span>
              {showAnalysis ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAnalysis && (
              <div className="mt-2.5 p-3 dark:bg-slate-900 light:bg-slate-50 rounded-lg border dark:border-slate-800 light:border-slate-200 text-xs text-slate-700 dark:text-slate-300 leading-relaxed animate-in fade-in">
                {prediction.analysis}
              </div>
            )}
          </div>
        )}

      </div>

      {/* LOCKED OVERLAY FOR NON-VIP USERS */}
      {isLocked && (
        <div className="absolute inset-0 top-10 dark:bg-[#070c16]/95 light:bg-white/95 backdrop-blur-md z-20 p-6 flex flex-col items-center justify-center text-center space-y-3 border-t border-sky-500/30">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/40 flex items-center justify-center text-[#38bdf8]">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-center space-x-1 font-display">
              <span>VIP Match Selection</span>
              <Crown className="w-4 h-4 text-[#38bdf8] fill-[#38bdf8]" />
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 max-w-xs mt-1">
              This pick holds an estimated <span className="text-[#38bdf8] font-bold font-mono">{prediction.confidence}% probability</span> & high odds value.
            </p>
          </div>

          <button
            onClick={onUnlockClick}
            className="px-5 py-2.5 bg-gradient-to-r from-[#0ea5e9] to-[#38bdf8] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center space-x-1.5 transform hover:scale-105"
          >
            <span>Unlock VIP Match Pick</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
