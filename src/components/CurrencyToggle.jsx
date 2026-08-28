import { useCurrency } from '../context/CurrencyContext';

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="inline-flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-xl text-xs font-mono font-bold">
      <button
        onClick={() => setCurrency('LKR')}
        className={`px-2.5 py-1 rounded-lg transition-colors ${
          currency === 'LKR'
            ? 'bg-brand-primary text-neutral-950 shadow-sm'
            : 'text-neutral-400 hover:text-white'
        }`}
        title="Show prices in LKR (Sri Lankan Rupees)"
      >
        LKR
      </button>
      <button
        onClick={() => setCurrency('USD')}
        className={`px-2.5 py-1 rounded-lg transition-colors ${
          currency === 'USD'
            ? 'bg-brand-primary text-neutral-950 shadow-sm'
            : 'text-neutral-400 hover:text-white'
        }`}
        title="Convert prices to USD (US Dollars)"
      >
        USD ($)
      </button>
    </div>
  );
}
