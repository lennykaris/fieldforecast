import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PredictionsProvider } from './context/PredictionsContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CheckoutModal } from './components/CheckoutModal';

import { HomePage } from './pages/HomePage';
import { FreeTipsPage } from './pages/FreeTipsPage';
import { VipPage } from './pages/VipPage';
import { DashboardPage } from './pages/DashboardPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

import type { SubscriptionPlan } from './types/prediction';
import { SUBSCRIPTION_PLANS } from './data/predictions';

// Helper component to scroll page to top on route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export const AppContent: React.FC = () => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>(SUBSCRIPTION_PLANS[1]);

  const handleOpenCheckout = (plan?: SubscriptionPlan) => {
    if (plan) setSelectedPlan(plan);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex flex-col justify-between selection:bg-[#5EB8E8] selection:text-slate-950 font-sans">
      <ScrollToTop />

      <div>
        <Navbar onOpenCheckout={() => handleOpenCheckout(SUBSCRIPTION_PLANS[1])} />

        <main>
          <Routes>
            <Route path="/" element={<HomePage onOpenCheckout={handleOpenCheckout} />} />
            <Route path="/tips" element={<FreeTipsPage onOpenCheckout={handleOpenCheckout} />} />
            <Route path="/vip" element={<VipPage onOpenCheckout={handleOpenCheckout} />} />
            <Route path="/dashboard" element={<DashboardPage onOpenCheckout={handleOpenCheckout} />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
      </div>

      <Footer />

      {/* Global Checkout Simulator Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export function App() {
  return (
    <Router>
      <AuthProvider>
        <PredictionsProvider>
          <AppContent />
        </PredictionsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
