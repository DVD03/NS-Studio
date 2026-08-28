import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Camera, Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';
import CurrencyToggle from './CurrencyToggle';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Services', path: '/services' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/95 backdrop-blur-md border-b border-neutral-800/80 transition-all duration-300">
      {/* Sleek top gold accent line */}
      <div className="h-[2px] w-full bg-gradient-to-r from-amber-600 via-brand-primary to-amber-600" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Brand Logo - Compact & Responsive */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group shrink-0 min-w-0">
            {!logoFailed ? (
              <img
                src="/logo.png"
                alt="NS Studio Logo"
                onError={() => setLogoFailed(true)}
                className="h-8 sm:h-10 w-auto max-w-[100px] sm:max-w-[140px] object-contain transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-primary text-neutral-950 flex items-center justify-center font-bold shadow-md shrink-0">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
              </div>
            )}
            <div className="flex flex-col justify-center min-w-0">
              <span className="text-base sm:text-lg font-black tracking-wider text-white uppercase leading-none font-serif truncate">
                NS STUDIO
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.15em] sm:tracking-[0.2em] text-brand-primary font-bold uppercase hidden sm:block mt-1 font-mono truncate">
                PHOTOGRAPHY & FILMS • GAMPAHA
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Clean Single-Line Luxury Typography */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-3.5 py-2 text-xs font-semibold uppercase tracking-wider transition-colors font-mono ${
                    isActive
                      ? 'text-brand-primary font-bold'
                      : 'text-neutral-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.name}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-brand-primary rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Section: Currency Switcher, Admin Portal & CTA Button */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <CurrencyToggle />

            {/* Subtle Admin Link */}
            <Link
              to="/admin"
              className="p-2 rounded-xl text-neutral-500 hover:text-brand-primary hover:bg-neutral-900 transition-colors"
              title="Admin Control Portal"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>

            {/* Book Session CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary text-neutral-950 font-extrabold px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors active:scale-95 shadow-sm font-mono"
            >
              <span>Book Session</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </Link>
          </div>

          {/* Mobile Right Section */}
          <div className="lg:hidden flex items-center gap-2 shrink-0">
            <div className="scale-95 sm:scale-100">
              <CurrencyToggle />
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 shrink-0"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950 border-t border-neutral-800 px-4 py-5 space-y-2.5 animate-fade-in">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors uppercase tracking-wider font-mono ${
                  isActive
                    ? 'text-brand-primary bg-brand-primary/10 border border-brand-primary/20 font-bold'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary text-neutral-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider font-mono"
            >
              <span>Book Session</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-xs text-neutral-500 hover:text-brand-primary font-mono"
            >
              Admin Portal Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
