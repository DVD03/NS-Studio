import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Calendar } from 'lucide-react';

export default function CameraScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      if (window.scrollY > 120) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isFilled = scrollProgress >= 90;
  const strokeDashoffset = 100 - scrollProgress;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2 sm:gap-2.5 animate-fade-in group">
      
      {/* Sharp, Clean, High-Contrast Tag Link Button */}
      <Link
        to="/contact"
        className={`px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-300 flex items-center gap-1.5 sm:gap-2 font-mono shadow-2xl ${
          isFilled
            ? 'bg-brand-primary hover:bg-brand-primary text-neutral-950 border-2 border-brand-primary/80 scale-105 shadow-lg shadow-brand-primary/30'
            : 'bg-neutral-950/90 hover:bg-neutral-900 border border-neutral-700 hover:border-brand-primary text-brand-primary hover:text-brand-primary/80'
        }`}
      >
        <Calendar className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFilled ? 'text-neutral-950' : 'text-brand-primary'}`} />
        <span className="tracking-wide uppercase">{isFilled ? 'Book Now' : 'Book Session'}</span>
      </Link>

      {/* Sharp, High-Contrast Camera Indicator Ring */}
      <div
        className={`relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center transition-all duration-300 bg-neutral-950 shadow-2xl border ${
          isFilled
            ? 'border-2 border-brand-primary shadow-brand-primary/20 scale-105'
            : 'border-neutral-800 hover:border-neutral-700'
        }`}
      >
        {/* Circular SVG Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 z-10 p-0.5" viewBox="0 0 36 36">
          {/* Background Ring Track */}
          <path
            className="text-neutral-800"
            strokeWidth="3.5"
            stroke="currentColor"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {/* Dynamic Progress Fill Line */}
          <path
            className="transition-all duration-150 ease-out"
            strokeDasharray="100, 100"
            strokeDashoffset={strokeDashoffset}
            strokeWidth="3.5"
            strokeLinecap="round"
            stroke={isFilled ? "#f59e0b" : "url(#cameraCleanGradient)"}
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <defs>
            <linearGradient id="cameraCleanGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Camera Icon & Sharp Readable Percentage */}
        <div className="relative z-20 flex flex-col items-center justify-center space-y-0.5">
          <Camera
            className={`w-5 h-5 transition-colors duration-200 ${
              isFilled ? 'text-brand-primary' : 'text-neutral-200'
            }`}
          />
          <span
            className={`text-[10px] font-mono font-bold leading-none ${
              isFilled ? 'text-brand-primary' : 'text-neutral-400'
            }`}
          >
            {isFilled ? '100%' : `${Math.round(scrollProgress)}%`}
          </span>
        </div>

      </div>

    </div>
  );
}
