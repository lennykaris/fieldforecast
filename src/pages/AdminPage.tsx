import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  BarChart3, 
  Crown, 
  Zap, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  RotateCcw
} from 'lucide-react';
import { usePredictions } from '../context/PredictionsContext';
import { AdminTable } from '../components/AdminTable';
import { AddPredictionModal } from '../components/AddPredictionModal';
import { useAuth } from '../context/AuthContext';

export const AdminPage: React.FC = () => {
  const { predictions } = usePredictions();
  const { user, loginWithPreset } = useAuth();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Metrics
  const totalCount = predictions.length;
  const freeCount = predictions.filter(p => p.tier === 'free').length;
  const vipCount = predictions.filter(p => p.tier === 'vip').length;
  
  const avgConfidence = Math.round(
    predictions.reduce((acc, p) => acc + p.confidence, 0) / (totalCount || 1)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Header Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#5EB8E8]/10 border border-[#5EB8E8]/30 text-[#5EB8E8] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Admin CMS Control Panel</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Prediction Management CMS
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, edit, toggle, or delete predictions in real-time local state. Changes instantly reflect across all pages.
          </p>
        </div>

        {/* Top Quick Demo Admin Button */}
        <div className="flex items-center space-x-3">
          {user?.role !== 'admin' && (
            <button
              onClick={() => loginWithPreset('admin')}
              className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-colors"
            >
              Switch to Admin Profile
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-[#5EB8E8] hover:bg-sky-300 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-[#5EB8E8]/20 transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Prediction</span>
          </button>
        </div>
      </div>

      {/* METRICS CARDS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Total Predictions</span>
            <Layers className="w-4 h-4 text-[#5EB8E8]" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-white font-mono">{totalCount}</span>
          <p className="text-[10px] text-slate-500">Active fixture tips</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Free Tier Tips</span>
            <Zap className="w-4 h-4 text-[#5EB8E8]" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-[#5EB8E8] font-mono">{freeCount}</span>
          <p className="text-[10px] text-slate-500">Public predictions</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">VIP Tier Picks</span>
            <Crown className="w-4 h-4 text-amber-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono">{vipCount}</span>
          <p className="text-[10px] text-slate-500">Paywalled recommendations</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase">Avg AI Confidence</span>
            <BarChart3 className="w-4 h-4 text-emerald-400" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">{avgConfidence}%</span>
          <p className="text-[10px] text-slate-500">Platform average rating</p>
        </div>
      </div>

      {/* ADMIN CMS TABLE */}
      <AdminTable onOpenAddModal={() => setIsAddModalOpen(true)} />

      {/* ADD PREDICTION MODAL */}
      <AddPredictionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

    </div>
  );
};
