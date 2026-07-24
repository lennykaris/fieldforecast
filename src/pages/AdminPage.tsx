import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  BarChart3, 
  Crown, 
  Zap, 
  Layers
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-24 pb-28 md:pb-10 space-y-8 bg-white">
      
      {/* Top Header Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-[#0EA5E9] text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Admin CMS Control Panel</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">
            Prediction Management CMS
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Create, edit, toggle, or delete predictions in real-time local state. Changes instantly reflect across all pages.
          </p>
        </div>

        {/* Top Quick Demo Admin Button */}
        <div className="flex items-center space-x-3">
          {user?.role !== 'admin' && (
            <button
              onClick={() => loginWithPreset('admin')}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl border border-slate-200 transition-colors"
            >
              Switch to Admin Profile
            </button>
          )}

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-[#0EA5E9] hover:bg-sky-600 text-white font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center space-x-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Prediction</span>
          </button>
        </div>
      </div>

      {/* METRICS CARDS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Total Predictions</span>
            <Layers className="w-4 h-4 text-[#0EA5E9]" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">{totalCount}</span>
          <p className="text-[10px] text-slate-400">Active fixture tips</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Free Tier Tips</span>
            <Zap className="w-4 h-4 text-[#0EA5E9]" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-[#0EA5E9] font-mono">{freeCount}</span>
          <p className="text-[10px] text-slate-400">Public predictions</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">VIP Tier Picks</span>
            <Crown className="w-4 h-4 text-[#0EA5E9]" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-[#0EA5E9] font-mono">{vipCount}</span>
          <p className="text-[10px] text-slate-400">Paywalled recommendations</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Avg AI Confidence</span>
            <BarChart3 className="w-4 h-4 text-[#0EA5E9]" />
          </div>
          <span className="text-2xl sm:text-3xl font-black text-[#0EA5E9] font-mono">{avgConfidence}%</span>
          <p className="text-[10px] text-slate-400">Platform average rating</p>
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
