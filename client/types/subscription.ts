// client/types/subscription.ts
export interface SubscriptionPlan {
    id: string;
    name: string;
    interpretations: number;
    price: number; // In ₺ (Turkish Lira)
  }
  
  export const subscriptionPlans: SubscriptionPlan[] = [
    { id: 'single', name: '1 Tabir', interpretations: 1, price: 20 },
    { id: 'pack10', name: '10 Tabir', interpretations: 10, price: 100 },
    { id: 'pack20', name: '20 Tabir', interpretations: 20, price: 200 },
  ];