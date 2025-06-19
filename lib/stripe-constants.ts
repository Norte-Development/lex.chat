export const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID || 'price_1ABC123';
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || '';

export const SUBSCRIPTION_PLANS = {
  professional: {
    name: 'Plan Profesional',
    description: 'Acceso completo para profesionales',
    price: 8,
    currency: 'usd',
    interval: 'month',
    features: [
      'Consultas ilimitadas',
      'Todas las jurisdicciones',
      'Fuentes oficiales actualizadas',
      'Jurisprudencia completa',
      'Historial ilimitado',
      'Soporte prioritario 24/7',
      'Respuestas instantáneas',
      'Actualizaciones en tiempo real',
    ],
  },
} as const; 