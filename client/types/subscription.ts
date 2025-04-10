// client/types/subscription.ts
export interface SubscriptionPlan {
    id: string;
    nameKey: string; // i18n anahtarı
    interpretations: number;
    price: number;
  }
  
  export const subscriptionPlans: SubscriptionPlan[] = [
    { id: 'single', nameKey: 'subscription.single', interpretations: 1, price: 39.99 },
    { id: 'pack10', nameKey: 'subscription.pack10', interpretations: 10, price: 199.99 },
    { id: 'pack20', nameKey: 'subscription.pack20', interpretations: 20, price: 299.99 },
  ];
  