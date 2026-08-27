import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ArrowRight, HelpCircle, Plus, ShoppingBag, Sparkles } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import CurrencyToggle from '../components/CurrencyToggle';

export default function Services() {
  const { currency, formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [selectedPackage, setSelectedPackage] = useState('Wedding Film & Photo Classic');
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const packages = [
    {
      id: 'pkg-essential',
      name: 'Essential Photography',
      subtitle: 'Ideal for intimate events, portraits, or civil ceremonies.',
      lkrPrice: 165000,
      lkrFormatted: 'LKR 165,000',
      usdPrice: 550,
      usdFormatted: '$550 USD',
      popular: false,
      features: [
        'Up to 6 Hours Coverage',
        'Single Senior Photographer',
        '300+ Color Graded High-Res Stills',
        'Online Private Web Gallery',
        'Full Personal Usage Rights',
        'Standard 14-Day Delivery',
      ],
    },
    {
      id: 'pkg-classic',
      name: 'Wedding Film & Photo Classic',
      subtitle: 'Complete coverage for wedding ceremonies and receptions.',
      lkrPrice: 375000,
      lkrFormatted: 'LKR 375,000',
      usdPrice: 1250,
      usdFormatted: '$1,250 USD',
      popular: true,
      features: [
        'Full Day Coverage (Up to 10 Hours)',
        '2 Senior Photographers + 1 Cinematographer',
        '600+ Edited High-Res Stills',
        '3-5 Min Cinematic Highlight Film (4K)',
        'Full Ceremonial Video Edit (Raw Cut)',
        'Custom USB Box & Online Web Gallery',
        'Premium Leather Printed Photo Album (30 Pages)',
      ],
    },
    {
      id: 'pkg-combo',
      name: 'Ultimate Cinema & Drone Combo',
      subtitle: 'The flagship cinematic experience with aerial film & dual crew.',
      lkrPrice: 630000,
      lkrFormatted: 'LKR 630,000',
      usdPrice: 2100,
      usdFormatted: '$2,100 USD',
      popular: false,
      features: [
        'Unlimited Full Day & Homecoming Coverage',
        '2 Photographers + 2 Cinematographers + Drone Pilot',
        '900+ Edited High-Res Stills',
        '5-7 Min Cinematic Highlight Feature (4K)',
        '4K Licensed Drone Aerial Videography',
        'Pre-Wedding / Engagement Outdoor Shoot Included',
        'Express 7-Day Priority Delivery',
        '2 Premium Hardcover Albums + Canvas Print',
      ],
    },
  ];

  const addOns = [
    {
      id: 'addon-drone',
      name: '4K Drone Aerial Coverage',
      lkrPrice: 60000,
      lkrFormatted: 'LKR 60,000',
      usdPrice: 200,
      usdFormatted: '$200',
      desc: 'Licensed pilot for outdoor venue aerial perspectives.',
    },
    {
      id: 'addon-prewedding',
      name: 'Pre-Wedding / Engagement Shoot',
      lkrPrice: 105000,
      lkrFormatted: 'LKR 105,000',
      usdPrice: 350,
      usdFormatted: '$350',
      desc: '3-hour outdoor session with 50 edited stills.',
    },
    {
      id: 'addon-express',
      name: 'Express 48-Hour Delivery',
      lkrPrice: 75000,
      lkrFormatted: 'LKR 75,000',
      usdPrice: 250,
      usdFormatted: '$250',
      desc: 'Priority editing queue for urgent media requirements.',
    },
    {
      id: 'addon-album',
      name: 'Hardcover Italian Leather Album',
      lkrPrice: 90000,
      lkrFormatted: 'LKR 90,000',
      usdPrice: 300,
      usdFormatted: '$300',
      desc: 'Flush mount 40-page archival paper wedding album.',
    },
  ];

  const toggleAddOn = (addonObj) => {
    setSelectedAddOns((prev) => {
      const exists = prev.some((item) => item.id === addonObj.id);
      if (exists) {
        return prev.filter((item) => item.id !== addonObj.id);
      } else {
        return [...prev, addonObj];
      }
    });
  };

  // Calculate Total Price
  const activePkgObj = packages.find((p) => p.name === selectedPackage) || packages[1];
  const totalLkr = activePkgObj.lkrPrice + selectedAddOns.reduce((sum, item) => sum + item.lkrPrice, 0);
  const totalUsd = activePkgObj.usdPrice + selectedAddOns.reduce((sum, item) => sum + item.usdPrice, 0);

  const formattedTotal = currency === 'USD'
    ? `$${totalUsd.toLocaleString()} USD`
    : `LKR ${totalLkr.toLocaleString()}`;

  const handleProceedToBooking = () => {
    navigate('/contact', {
      state: {
        selectedPackage: activePkgObj.name,
        selectedAddOns: selectedAddOns.map((a) => a.name),
        totalEstimatedPrice: formattedTotal,
      },
    });
  };

  const faqs = [
    {
      q: 'How far in advance should we book your services?',
      a: 'We recommend booking 4 to 8 months in advance for wedding dates during peak seasons (December - April) to ensure date availability.',
    },
    {
      q: 'Do you travel across Sri Lanka and internationally?',
      a: 'Yes! We travel island-wide from Gampaha (Colombo, Kandy, Galle, Nuwara Eliya) and destination venues worldwide.',
    },
    {
      q: 'How long does it take to receive our final photos and videos?',
      a: 'Standard photo delivery is 10-14 days. Cinematic films take 3-4 weeks. Express delivery options are available upon request.',
    },
    {
      q: 'Can we customize a package according to our event requirements?',
      a: 'Absolute flexibility! Select any base package above and toggle your desired add-ons to build your custom coverage.',
    },
  ];

  return (
    <div className="space-y-20 py-16">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold font-mono">
          Investment & Coverage
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-serif">
          Packages & Pricing
        </h1>
        <p className="max-w-2xl mx-auto text-neutral-400 text-base leading-relaxed">
          Select a base package and toggle custom add-on services below to calculate your estimated total coverage.
        </p>

        {/* Currency Switcher Tool */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className="text-xs font-mono text-neutral-400">Display Currency:</span>
          <CurrencyToggle />
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {packages.map((pkg) => {
            const displayMainPrice = formatPrice(pkg.usdFormatted, pkg.lkrFormatted);
            const displaySecondaryPrice = currency === 'LKR' ? pkg.usdFormatted : pkg.lkrFormatted;
            const isSelected = selectedPackage === pkg.name;

            return (
              <div
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg.name)}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 border-2 border-amber-400 shadow-2xl shadow-amber-500/20 scale-102'
                    : 'bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-amber-500 text-neutral-950 font-bold text-xs uppercase tracking-widest flex items-center shadow-md">
                    <span>Most Popular Choice</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-white font-serif">{pkg.name}</h3>
                      {isSelected && (
                        <span className="px-2.5 py-1 rounded-md bg-amber-500/20 border border-amber-500/40 text-amber-400 font-mono text-xs font-bold">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">{pkg.subtitle}</p>
                  </div>

                  <div className="border-y border-neutral-800 py-4 space-y-1">
                    {/* Primary Display Price (LKR by default) */}
                    <div className="text-3xl sm:text-4xl font-extrabold text-amber-400 font-serif">
                      {displayMainPrice}
                    </div>
                    {/* Secondary Converted Reference Price */}
                    <div className="text-xs text-neutral-400 font-mono">
                      (Approx. {displaySecondaryPrice})
                    </div>
                  </div>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300">
                        <Check className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPackage(pkg.name);
                    }}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-colors ${
                      isSelected
                        ? 'bg-amber-500 text-neutral-950 shadow-md'
                        : 'bg-neutral-800 hover:bg-neutral-700 text-white'
                    }`}
                  >
                    <span>{isSelected ? 'Package Selected' : 'Select Package'}</span>
                    {isSelected ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom Add-ons Section - Interactive Selection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2 text-center max-w-xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold font-mono">
            Custom Enhancements
          </span>
          <h2 className="text-3xl font-bold text-white font-serif">Select Custom Add-On Services</h2>
          <p className="text-xs text-neutral-400">Click any add-on service card to add or remove it from your booking inquiry.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addOns.map((addon) => {
            const isAdded = selectedAddOns.some((item) => item.id === addon.id);
            const displayAddonPrice = formatPrice(addon.usdFormatted, addon.lkrFormatted);

            return (
              <div
                key={addon.id}
                onClick={() => toggleAddOn(addon)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 ${
                  isAdded
                    ? 'bg-neutral-900 border-2 border-amber-400 shadow-xl shadow-amber-500/10'
                    : 'bg-neutral-900/60 border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-white font-serif flex items-center gap-2">
                      <span>{addon.name}</span>
                    </h4>
                    <p className="text-xs text-neutral-400">{addon.desc}</p>
                  </div>
                  <div className="text-sm font-bold text-amber-400 font-mono shrink-0">
                    {displayAddonPrice}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-neutral-800/80 pt-3">
                  <span className="text-xs text-neutral-400 font-mono">
                    {isAdded ? 'Included in your estimate' : 'Click to add to booking'}
                  </span>
                  
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleAddOn(addon);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      isAdded
                        ? 'bg-amber-500 text-neutral-950'
                        : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-white'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-amber-400" />
                        <span>Add Service</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Floating / Sticky Total Summary Bar & Proceed Button */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-950 to-neutral-900 border-2 border-amber-500/50 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold font-mono">
                Booking Estimate Summary
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-sm font-semibold text-white">
                Base Package: <span className="text-amber-300 font-bold">{selectedPackage}</span>
              </div>
              <div className="text-xs text-neutral-400">
                Add-Ons ({selectedAddOns.length}):{' '}
                {selectedAddOns.length > 0
                  ? selectedAddOns.map((a) => a.name).join(', ')
                  : 'None selected yet'}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <div className="text-center md:text-right space-y-0.5">
              <span className="text-[10px] text-neutral-400 uppercase font-mono block">Estimated Total</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-serif">
                {formattedTotal}
              </div>
            </div>

            <button
              type="button"
              onClick={handleProceedToBooking}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-7 py-4 rounded-2xl text-sm transition-colors shadow-lg shadow-amber-500/20 active:scale-95"
            >
              <span>Proceed to Booking</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-neutral-900/30 border-t border-neutral-800/60 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold font-mono">
              Common Inquiries
            </span>
            <h2 className="text-3xl font-bold text-white font-serif">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, fIdx) => (
              <div key={fIdx} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-white font-bold text-base font-serif">
                  <HelpCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>{faq.q}</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 pl-7 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
