export const formatAmountForDisplay = async (
  amount: number,
  currency: string
): Promise<string> => {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  return numberFormat.format(amount / 100);
};

export const formatAmountForStripe = async (
  amount: number,
  currency: string
): Promise<number> => {
  const numberFormat = new Intl.NumberFormat(['en-US'], {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (const part of parts) {
    if (part.type === 'decimal') {
      zeroDecimalCurrency = false;
    }
  }
  return zeroDecimalCurrency ? amount : Math.round(amount * 100);
};

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