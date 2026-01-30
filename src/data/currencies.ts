export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AUD' | 'CAD' | 'SGD' | 'AED';

export interface CurrencyConfig {
  symbol: string;
  locale: string;
  name: string;
  code: Currency;
}

export const currencies: Record<Currency, CurrencyConfig> = {
  INR: {
    symbol: '₹',
    locale: 'en-IN',
    name: 'Indian Rupee',
    code: 'INR',
  },
  USD: {
    symbol: '$',
    locale: 'en-US',
    name: 'US Dollar',
    code: 'USD',
  },
  EUR: {
    symbol: '€',
    locale: 'en-DE',
    name: 'Euro',
    code: 'EUR',
  },
  GBP: {
    symbol: '£',
    locale: 'en-GB',
    name: 'British Pound',
    code: 'GBP',
  },
  AUD: {
    symbol: 'A$',
    locale: 'en-AU',
    name: 'Australian Dollar',
    code: 'AUD',
  },
  CAD: {
    symbol: 'C$',
    locale: 'en-CA',
    name: 'Canadian Dollar',
    code: 'CAD',
  },
  SGD: {
    symbol: 'S$',
    locale: 'en-SG',
    name: 'Singapore Dollar',
    code: 'SGD',
  },
  AED: {
    symbol: 'د.إ',
    locale: 'en-AE',
    name: 'UAE Dirham',
    code: 'AED',
  },
};

export const currencyList: CurrencyConfig[] = Object.values(currencies);

export const defaultCurrency: Currency = 'INR';
