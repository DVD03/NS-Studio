import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 pointer-events-none">
      {/* Top Animated Scroll Fill Progress Bar */}
      <div
        className="h-1 bg-gradient-to-r from-brand-primary via-pink-500 via-violet-500 to-cyan-500 transition-all duration-150 ease-out shadow-[0_0_12px_rgba(245,158,11,0.8)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
