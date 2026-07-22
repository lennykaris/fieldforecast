export interface Prediction {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  kickoff: string; // ISO string
  tip: string;
  odds: number;
  confidence: number; // 0 - 100
  tier: 'free' | 'vip';
  category?: string;
  homeLogo?: string;
  awayLogo?: string;
  analysis?: string;
  status?: 'pending' | 'won' | 'lost';
  result?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  plan: 'free' | 'monthly_vip' | 'annual_vip';
  subscribedAt?: string;
  vipExpiresAt?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  rawPrice: number;
  description: string;
  features: string[];
  popular?: boolean;
  savings?: string;
}
