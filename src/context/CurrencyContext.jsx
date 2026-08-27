import { createContext, useContext, useState } from 'react';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  // Default currency is LKR as requested
  const [currency, setCurrency] = useState('LKR');

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'LKR' ? 'USD' : 'LKR'));
  };

  // Helper function to format price based on selected currency
  const formatPrice = (usdAmount, lkrAmount) => {
    if (currency === 'USD') {
      return usdAmount;
    }
    return lkrAmount;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, toggleCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
