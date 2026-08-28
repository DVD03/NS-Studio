import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const colorThemes = {
  amber: {
    name: 'Luxury Amber Gold (Default)',
    primary: '#f59e0b', // amber-500
    primaryHover: '#d97706', // amber-600
    accent: '#fbbf24', // amber-400
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    badgeBorder: 'rgba(245, 158, 11, 0.3)',
  },
  emerald: {
    name: 'Royal Emerald Green',
    primary: '#10b981', // emerald-500
    primaryHover: '#059669', // emerald-600
    accent: '#34d399', // emerald-400
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    badgeBorder: 'rgba(16, 185, 129, 0.3)',
  },
  violet: {
    name: 'Royal Violet Cinema',
    primary: '#8b5cf6', // violet-500
    primaryHover: '#7c3aed', // violet-600
    accent: '#a78bfa', // violet-400
    badgeBg: 'rgba(139, 92, 246, 0.15)',
    badgeBorder: 'rgba(139, 92, 246, 0.3)',
  },
  blue: {
    name: 'Cyber Blue Studio',
    primary: '#0ea5e9', // sky-500
    primaryHover: '#0284c7', // sky-600
    accent: '#38bdf8', // sky-400
    badgeBg: 'rgba(14, 165, 233, 0.15)',
    badgeBorder: 'rgba(14, 165, 233, 0.3)',
  },
  rose: {
    name: 'Rose Gold Bridal',
    primary: '#f43f5e', // rose-500
    primaryHover: '#e11d48', // rose-600
    accent: '#fb7185', // rose-400
    badgeBg: 'rgba(244, 63, 94, 0.15)',
    badgeBorder: 'rgba(244, 63, 94, 0.3)',
  },
};

export const fontStyles = {
  serif: {
    name: 'Luxury Serif (Playfair / Classical)',
    family: 'Playfair Display, Georgia, serif',
  },
  sans: {
    name: 'Modern Sans (Plus Jakarta / Clean)',
    family: 'Plus Jakarta Sans, Inter, sans-serif',
  },
  mono: {
    name: 'Studio Mono (Tech Minimal)',
    family: 'JetBrains Mono, monospace',
  },
};

export function ThemeProvider({ children }) {
  const [currentThemeKey, setCurrentThemeKey] = useState(() => {
    return localStorage.getItem('ns_theme_color') || 'amber';
  });

  const [currentFontKey, setCurrentFontKey] = useState(() => {
    return localStorage.getItem('ns_theme_font') || 'serif';
  });

  useEffect(() => {
    const theme = colorThemes[currentThemeKey] || colorThemes.amber;
    const font = fontStyles[currentFontKey] || fontStyles.serif;

    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-hover', theme.primaryHover);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--font-custom-serif', font.family);

    localStorage.setItem('ns_theme_color', currentThemeKey);
    localStorage.setItem('ns_theme_font', currentFontKey);
  }, [currentThemeKey, currentFontKey]);

  return (
    <ThemeContext.Provider
      value={{
        currentThemeKey,
        currentFontKey,
        setTheme: setCurrentThemeKey,
        setFont: setCurrentFontKey,
        theme: colorThemes[currentThemeKey] || colorThemes.amber,
        font: fontStyles[currentFontKey] || fontStyles.serif,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
