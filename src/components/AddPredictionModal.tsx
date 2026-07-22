import React, { useState } from 'react';
import { X, Plus, Crown, Zap, Sparkles } from 'lucide-react';
import { usePredictions } from '../context/PredictionsContext';
import { LEAGUE_OPTIONS } from '../data/predictions';

interface AddPredictionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddPredictionModal: React.FC<AddPredictionModalProps> = ({ isOpen, onClose }) => {
  const { addPrediction } = usePredictions();

  const [league, setLeague] = useState('Premier League');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [kickoff, setKickoff] = useState('2026-07-25T18:00');
  const [tip, setTip] = useState('');
  const [category, setCategory] = useState('Match Result');
  const [odds, setOdds] = useState<number>(1.85);
  const [confidence, setConfidence] = useState<number>(85);
  const [tier, setTier] = useState<'free' | 'vip'>('free');
  const [analysis, setAnalysis] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeTeam || !awayTeam || !tip) return;

    addPrediction({
      league,
      homeTeam,
      awayTeam,
      kickoff: new Date(kickoff).toISOString(),
      tip,
      category,
      odds: Number(odds),
      confidence: Number(confidence),
      tier,
      analysis: analysis || 'Expert breakdown provided by Fieldforecasts team.',
      status: 'pending',
    });

    // Reset form
    setHomeTeam('');
    setAwayTeam('');
    setTip('');
    setAnalysis('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-800/60 border-b border-slate-800 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2">
            <Plus className="w-5 h-5 text-[#5EB8E8]" />
            <h3 className="text-base font-bold text-white">Create New Match Prediction</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          
          {/* League & Category Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">League</label>
              <select
                value={league}
                onChange={e => setLeague(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5EB8E8]"
              >
                {LEAGUE_OPTIONS.filter(l => l !== 'All Leagues').map(l => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Market Category</label>
              <input
                type="text"
                required
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="e.g. BTTS, 1X2, Over/Under"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5EB8E8]"
              />
            </div>
          </div>

          {/* Teams Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Home Team</label>
              <input
                type="text"
                required
                value={homeTeam}
                onChange={e => setHomeTeam(e.target.value)}
                placeholder="e.g. Liverpool"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5EB8E8]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Away Team</label>
              <input
                type="text"
                required
                value={awayTeam}
                onChange={e => setAwayTeam(e.target.value)}
                placeholder="e.g. Arsenal"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5EB8E8]"
              />
            </div>
          </div>

          {/* Kickoff Date & Time */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Kickoff Date & Time</label>
            <input
              type="datetime-local"
              required
              value={kickoff}
              onChange={e => setKickoff(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5EB8E8]"
            />
          </div>

          {/* Tip & Tier */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Recommended Tip</label>
              <input
                type="text"
                required
                value={tip}
                onChange={e => setTip(e.target.value)}
                placeholder="e.g. Liverpool Win & Over 2.5 Goals"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5EB8E8]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Access Tier</label>
              <select
                value={tier}
                onChange={e => setTier(e.target.value as 'free' | 'vip')}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5EB8E8]"
              >
                <option value="free">Free Tip</option>
                <option value="vip">VIP Pick</option>
              </select>
            </div>
          </div>

          {/* Odds & Confidence */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Decimal Odds</label>
              <input
                type="number"
                step="0.05"
                min="1.01"
                required
                value={odds}
                onChange={e => setOdds(parseFloat(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#5EB8E8]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Confidence Score (50-99%)</label>
              <input
                type="number"
                min="50"
                max="99"
                required
                value={confidence}
                onChange={e => setConfidence(parseInt(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-[#5EB8E8]"
              />
            </div>
          </div>

          {/* Expert Analysis */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Tactical Breakdown & Rationale</label>
            <textarea
              rows={3}
              value={analysis}
              onChange={e => setAnalysis(e.target.value)}
              placeholder="Provide tactical insights, expected goals (xG), recent head-to-head form..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#5EB8E8]"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full py-3 bg-[#5EB8E8] hover:bg-sky-300 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#5EB8E8]/20 transition-all flex items-center justify-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Prediction to Live State</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
