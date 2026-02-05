export function formatPrice(amount: number, currency: string = 'MGA'): string {
  try {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: currency,
      currencyDisplay: 'symbol',
    }).format(amount);
  } catch (error) {
    return `${amount.toLocaleString()} ${currency}`;
  }
}