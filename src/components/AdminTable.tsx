import React, { useState } from 'react';
import { 
  Crown, 
  Zap, 
  Trash2, 
  Edit3, 
  Plus, 
  Search, 
  Filter, 
  Check, 
  X, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import type { Prediction } from '../types/prediction';
import { usePredictions } from '../context/PredictionsContext';
import { LEAGUE_OPTIONS } from '../data/predictions';

interface AdminTableProps {
  onOpenAddModal: () => void;
}

export const AdminTable: React.FC<AdminTableProps> = ({ onOpenAddModal }) => {
  const { predictions, updatePrediction, deletePrediction, toggleTier, resetPredictions } = usePredictions();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLeague, setSelectedLeague] = useState('All Leagues');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Edit form temporary state
  const [editTip, setEditTip] = useState('');
  const [editOdds, setEditOdds] = useState<number>(1.80);
  const [editConfidence, setEditConfidence] = useState<number>(85);

  const filteredPredictions = predictions.filter(p => {
    const matchesLeague = selectedLeague === 'All Leagues' || p.league === selectedLeague;
    const matchesSearch =
      p.homeTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.awayTeam.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tip.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLeague && matchesSearch;
  });

  const handleStartEdit = (p: Prediction) => {
    setEditingId(p.id);
    setEditTip(p.tip);
    setEditOdds(p.odds);
    setEditConfidence(p.confidence);
  };

  const handleSaveEdit = (id: string) => {
    updatePrediction(id, {
      tip: editTip,
      odds: editOdds,
      confidence: editConfidence,
    });
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      
      {/* CMS Controls & Filters Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Search & Filter Inputs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 flex-grow max-w-2xl">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search teams or tips..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5EB8E8]"
            />
          </div>

          <div className="relative w-full sm:w-48">
            <Filter className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <select
              value={selectedLeague}
              onChange={e => setSelectedLeague(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white appearance-none focus:outline-none focus:border-[#5EB8E8]"
            >
              {LEAGUE_OPTIONS.map(league => (
                <option key={league} value={league}>
                  {league}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 justify-end">
          <button
            onClick={resetPredictions}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors flex items-center space-x-1.5"
            title="Reset predictions to original default mock data"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="px-4 py-2 bg-[#5EB8E8] hover:bg-sky-300 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-[#5EB8E8]/20 transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Prediction</span>
          </button>
        </div>

      </div>

      {/* Predictions Table Container */}
      <div className="glass-card border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            
            {/* Table Head */}
            <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase tracking-wider text-[10px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Match / Fixture</th>
                <th className="py-3.5 px-4">League</th>
                <th className="py-3.5 px-4">Recommended Tip</th>
                <th className="py-3.5 px-4 text-center">Odds</th>
                <th className="py-3.5 px-4 text-center">Confidence</th>
                <th className="py-3.5 px-4 text-center">Tier Toggle</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-slate-800/80">
              {filteredPredictions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-slate-500">
                    No predictions found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredPredictions.map(p => {
                  const isEditing = editingId === p.id;
                  return (
                    <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                      
                      {/* Match Fixture */}
                      <td className="py-3.5 px-4 font-semibold text-white">
                        <div className="flex items-center space-x-2">
                          <span>{p.homeTeam}</span>
                          <span className="text-slate-500 text-[10px]">vs</span>
                          <span>{p.awayTeam}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                          {new Date(p.kickoff).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>

                      {/* League */}
                      <td className="py-3.5 px-4">
                        <span className="bg-slate-800 text-slate-300 font-semibold px-2 py-0.5 rounded border border-slate-700 text-[10px]">
                          {p.league}
                        </span>
                      </td>

                      {/* Tip */}
                      <td className="py-3.5 px-4 font-bold text-[#5EB8E8]">
                        {isEditing ? (
                          <input
                            type="text"
                            value={editTip}
                            onChange={e => setEditTip(e.target.value)}
                            className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white w-full focus:outline-none"
                          />
                        ) : (
                          p.tip
                        )}
                      </td>

                      {/* Odds */}
                      <td className="py-3.5 px-4 text-center font-mono font-extrabold">
                        {isEditing ? (
                          <input
                            type="number"
                            step="0.05"
                            value={editOdds}
                            onChange={e => setEditOdds(parseFloat(e.target.value) || 1.0)}
                            className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white w-16 text-center focus:outline-none"
                          />
                        ) : (
                          <span className="bg-slate-900 border border-slate-700 px-2 py-0.5 rounded text-white">
                            @{p.odds.toFixed(2)}
                          </span>
                        )}
                      </td>

                      {/* Confidence */}
                      <td className="py-3.5 px-4 text-center font-mono font-bold">
                        {isEditing ? (
                          <input
                            type="number"
                            min="50"
                            max="99"
                            value={editConfidence}
                            onChange={e => setEditConfidence(parseInt(e.target.value) || 70)}
                            className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-xs text-white w-16 text-center focus:outline-none"
                          />
                        ) : (
                          <span className={`${p.confidence >= 85 ? 'text-emerald-400' : 'text-[#5EB8E8]'}`}>
                            {p.confidence}%
                          </span>
                        )}
                      </td>

                      {/* Tier Toggle Switch */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={() => toggleTier(p.id)}
                          className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center space-x-1 mx-auto transition-all ${
                            p.tier === 'vip'
                              ? 'bg-amber-400/20 text-amber-400 border border-amber-400/40 hover:bg-amber-400/30'
                              : 'bg-[#5EB8E8]/20 text-[#5EB8E8] border border-[#5EB8E8]/40 hover:bg-[#5EB8E8]/30'
                          }`}
                        >
                          {p.tier === 'vip' ? (
                            <>
                              <Crown className="w-3 h-3 fill-amber-400" />
                              <span>VIP Tier</span>
                            </>
                          ) : (
                            <>
                              <Zap className="w-3 h-3" />
                              <span>Free Tier</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        {isEditing ? (
                          <div className="flex items-center justify-end space-x-1">
                            <button
                              onClick={() => handleSaveEdit(p.id)}
                              className="p-1.5 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 rounded"
                              title="Save changes"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1.5 bg-slate-800 text-slate-400 hover:bg-slate-700 rounded"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => handleStartEdit(p)}
                              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                              title="Edit prediction"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deletePrediction(p.id)}
                              className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded transition-colors"
                              title="Delete prediction"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
