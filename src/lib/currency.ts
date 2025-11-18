export const getCurrencySymbol = (currency: string): string => {
  const symbols: Record<string, string> = {
    USD: '$',
    EGP: 'E£',
    SAR: 'ر.س', // Saudi Riyal (Arabic abbreviation)
  };
  return symbols[currency] || currency;
};

export const formatPrice = (price: number, currency: string): string => {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${price.toFixed(2)}`;
};
