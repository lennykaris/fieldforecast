import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  CreditCard, 
  Lock, 
  Crown, 
  ShieldCheck, 
  CheckCircle2, 
  Loader2, 
  Sparkles,
  Zap
} from 'lucide-react';
import type { SubscriptionPlan } from '../types/prediction';
import { useAuth } from '../context/AuthContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: SubscriptionPlan;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedPlan,
}) => {
  const { subscribeToPlan } = useAuth();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [nameOnCard, setNameOnCard] = useState('Alex Rivera');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      subscribeToPlan(selectedPlan.id);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        navigate('/dashboard');
      }, 1800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-slate-800/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h3 className="text-base font-bold text-white">
              Activate VIP Subscription
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-extrabold text-white">
              VIP Membership Activated!
            </h4>
            <p className="text-xs text-slate-300 max-w-xs mx-auto">
              You now have full unlocked access to all high-confidence predictions, value accumulators, and tactical breakdowns.
            </p>
            <p className="text-[11px] text-[#5EB8E8] font-mono animate-pulse">
              Redirecting to your Subscriber Dashboard...
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            
            {/* Plan Summary Box */}
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Selected Plan
                </span>
                <h4 className="font-bold text-slate-100 text-sm">{selectedPlan.name}</h4>
                <p className="text-[11px] text-[#5EB8E8]">{selectedPlan.description.substring(0, 50)}...</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-white font-mono">
                  {selectedPlan.price}
                </span>
                <span className="text-xs text-slate-400 block">{selectedPlan.period}</span>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-[#5EB8E8]/10 border-[#5EB8E8] text-[#5EB8E8]'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    paymentMethod === 'apple'
                      ? 'bg-[#5EB8E8]/10 border-[#5EB8E8] text-[#5EB8E8]'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Apple Pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1.5 transition-all ${
                    paymentMethod === 'paypal'
                      ? 'bg-[#5EB8E8]/10 border-[#5EB8E8] text-[#5EB8E8]'
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <span>PayPal</span>
                </button>
              </div>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleSubmitPayment} className="space-y-4">
              {paymentMethod === 'card' && (
                <>
                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-400">Cardholder Name</label>
                    <input
                      type="text"
                      required
                      value={nameOnCard}
                      onChange={e => setNameOnCard(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#5EB8E8]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-medium text-slate-400">Card Number (Demo Mock)</label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        value={cardNumber}
                        onChange={e => setCardNumber(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#5EB8E8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-slate-400">Expires</label>
                      <input
                        type="text"
                        required
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#5EB8E8]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-medium text-slate-400">CVC</label>
                      <input
                        type="password"
                        required
                        maxLength={4}
                        value={cvc}
                        onChange={e => setCvc(e.target.value)}
                        placeholder="123"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono focus:outline-none focus:border-[#5EB8E8]"
                      />
                    </div>
                  </div>
                </>
              )}

              {paymentMethod !== 'card' && (
                <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl text-center space-y-2">
                  <p className="text-xs text-slate-300 font-medium">
                    1-Click Express Authorization active for {paymentMethod.toUpperCase()}.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Clicking complete will instantly approve subscription in demo mode.
                  </p>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-300 to-[#5EB8E8] text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-xl shadow-amber-400/20 hover:brightness-110 transition-all flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Processing Secure Transaction...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay {selectedPlan.price} & Unlock VIP</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center space-x-2 text-[10px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Encrypted Mock Simulation • Cancel Anytime</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
