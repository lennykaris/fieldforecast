import React, { useState } from 'react';
import { 
  Crown, 
  Lock, 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Trophy, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  Zap,
  ArrowRight
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

  // Confidence meter color helper
  const getConfidenceColor = (score: number) => {
    if (score >= 90) return { text: 'text-emerald-400', bg: 'bg-emerald-400', border: 'border-emerald-500/30' };
    if (score >= 80) return { text: 'text-[#5EB8E8]', bg: 'bg-[#5EB8E8]', border: 'border-[#5EB8E8]/30' };
    return { text: 'text-amber-400', bg: 'bg-amber-400', border: 'border-amber-500/30' };
  };

  const confidenceStyle = getConfidenceColor(prediction.confidence);

  return (
    <div className={`relative rounded-2xl glass-card glass-card-hover overflow-hidden transition-all duration-300 ${
      prediction.tier === 'vip' ? 'border-amber-500/30 shadow-lg shadow-amber-500/5' : 'border-slate-800'
    }`}>
      
      {/* Top Banner Stripe */}
      <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
            {prediction.league}
          </span>
          {prediction.category && (
            <span className="text-[10px] font-medium text-slate-400">
              • {prediction.category}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-[11px] font-medium text-slate-400 flex items-center space-x-1">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>{formatKickoff(prediction.kickoff)}</span>
          </span>

          {prediction.tier === 'vip' ? (
            <span className="flex items-center space-x-1 bg-amber-400/10 text-amber-400 border border-amber-400/40 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
              <Crown className="w-3 h-3 fill-amber-400" />
              <span>VIP Pick</span>
            </span>
          ) : (
            <span className="flex items-center space-x-1 bg-[#5EB8E8]/10 text-[#5EB8E8] border border-[#5EB8E8]/30 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
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
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200 text-sm shadow-inner flex-shrink-0">
              {prediction.homeTeam.substring(0, 3).toUpperCase()}
            </div>
            <div>
              <h3 className="font-bold text-sm text-white group-hover:text-[#5EB8E8] transition-colors leading-tight">
                {prediction.homeTeam}
              </h3>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Home</span>
            </div>
          </div>

          {/* VS Divider */}
          <div className="col-span-1 text-center">
            <span className="text-xs font-mono font-bold text-slate-500 bg-slate-800/80 px-1.5 py-0.5 rounded">
              VS
            </span>
          </div>

          {/* Away Team */}
          <div className="col-span-5 flex items-center justify-end space-x-3 text-right">
            <div>
              <h3 className="font-bold text-sm text-white leading-tight">
                {prediction.awayTeam}
              </h3>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Away</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-slate-200 text-sm shadow-inner flex-shrink-0">
              {prediction.awayTeam.substring(0, 3).toUpperCase()}
            </div>
          </div>
        </div>

        {/* Tip & Odds Row */}
        <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800/90 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Recommended Tip
            </span>
            <div className="font-bold text-sm sm:text-base text-[#5EB8E8] flex items-center space-x-1.5">
              <span>{prediction.tip}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Odds
            </span>
            <span className="text-base font-extrabold text-white font-mono bg-slate-800 border border-slate-700 px-2.5 py-0.5 rounded-lg shadow-sm">
              @{prediction.odds.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Confidence Meter */}
        <div className="mt-4 space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium flex items-center space-x-1">
              <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
              <span>AI Confidence Rating</span>
            </span>
            <span className={`font-mono font-extrabold ${confidenceStyle.text}`}>
              {prediction.confidence}%
            </span>
          </div>
          
          <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className={`h-full rounded-full transition-all duration-700 ${confidenceStyle.bg}`}
              style={{ width: `${prediction.confidence}%` }}
            />
          </div>
        </div>

        {/* Tactical Analysis Toggle */}
        {prediction.analysis && !isLocked && (
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="w-full flex items-center justify-between text-xs font-semibold text-slate-400 hover:text-[#5EB8E8] transition-colors"
            >
              <span className="flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#5EB8E8]" />
                <span>Expert Tactical Breakdown</span>
              </span>
              {showAnalysis ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAnalysis && (
              <div className="mt-2.5 p-3 bg-slate-900/90 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed animate-in fade-in">
                {prediction.analysis}
              </div>
            )}
          </div>
        )}

      </div>

      {/* LOCKED OVERLAY FOR NON-VIP USERS */}
      {isLocked && (
        <div className="absolute inset-0 top-10 bg-[#0b1120]/80 backdrop-blur-md z-20 p-6 flex flex-col items-center justify-center text-center space-y-3 border-t border-amber-500/20">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-lg shadow-amber-400/10">
            <Lock className="w-6 h-6" />
          </div>

          <div>
            <h4 className="text-sm font-bold text-white flex items-center justify-center space-x-1">
              <span>VIP High-Confidence Match</span>
              <Crown className="w-4 h-4 text-amber-400 fill-amber-400" />
            </h4>
            <p className="text-xs text-slate-400 max-w-xs mt-1">
              This prediction holds an estimated <span className="text-amber-400 font-bold">{prediction.confidence}% probability</span> & exclusive bookmaker value.
            </p>
          </div>

          <button
            onClick={onUnlockClick}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-400 via-amber-300 to-[#5EB8E8] text-slate-950 text-xs font-extrabold rounded-xl shadow-lg shadow-amber-400/20 hover:brightness-110 transition-all flex items-center space-x-1.5 uppercase tracking-wider transform hover:scale-105"
          >
            <span>Unlock Instant VIP Access</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

    </div>
  );
};
