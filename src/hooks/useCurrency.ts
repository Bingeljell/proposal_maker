import { useMemo } from 'react';
import { useProposal } from './useProposal';
import { Currency, currencies, defaultCurrency } from '../data/currencies';

export interface UseCurrencyReturn {
  currency: Currency;
  currencyConfig: typeof currencies[Currency];
  formatAmount: (amount: number, options?: Intl.NumberFormatOptions) => string;
  formatAmountShort: (amount: number) => string;
  getCurrencySymbol: () => string;
  setCurrency: (currency: Currency) => void;
}

export const useCurrency = (): UseCurrencyReturn => {
  const { proposal, updateSection } = useProposal();

  // Get current currency from proposal meta, default to INR for backward compatibility
  const currency = proposal.meta.currency || defaultCurrency;

  const currencyConfig = currencies[currency];

  const formatAmount = useMemo(() => {
    return (amount: number, options?: Intl.NumberFormatOptions): string => {
      const formatter = new Intl.NumberFormat(currencyConfig.locale, {
        style: 'currency',
        currency: currencyConfig.code,
        maximumFractionDigits: 0,
        ...options,
      });
      return formatter.format(amount);
    };
  }, [currencyConfig]);

  const formatAmountShort = useMemo(() => {
    return (amount: number): string => {
      const formatter = new Intl.NumberFormat(currencyConfig.locale, {
        style: 'currency',
        currency: currencyConfig.code,
        maximumFractionDigits: 0,
        notation: 'compact',
      });
      return formatter.format(amount);
    };
  }, [currencyConfig]);

  const getCurrencySymbol = useMemo(() => {
    return (): string => currencyConfig.symbol;
  }, [currencyConfig]);

  const setCurrency = (newCurrency: Currency) => {
    updateSection('meta', { ...proposal.meta, currency: newCurrency });
  };

  return {
    currency,
    currencyConfig,
    formatAmount,
    formatAmountShort,
    getCurrencySymbol,
    setCurrency,
  };
};
