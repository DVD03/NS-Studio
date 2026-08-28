import { createContext, useContext, useState, useEffect } from 'react';
import { getApiUrl } from '../config/api';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeSettings, setThemeSettings] = useState({
    primaryColor: '#f59e0b',
    secondaryColor: '#10b981',
    fontFamilySans: 'Inter',
    fontFamilySerif: 'Playfair Display'
  });
  const [loading, setLoading] = useState(true);

  // Fetch initial theme from API
  useEffect(() => {
    fetch(getApiUrl('/api/settings'))
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data) {
          setThemeSettings({
            primaryColor: json.data.primaryColor || '#f59e0b',
            secondaryColor: json.data.secondaryColor || '#10b981',
            fontFamilySans: json.data.fontFamilySans || 'Inter',
            fontFamilySerif: json.data.fontFamilySerif || 'Playfair Display'
          });
        }
      })
      .catch(err => console.warn('Failed to load global theme settings', err))
      .finally(() => setLoading(false));
  }, []);

  // Apply to Document Root
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-color-primary', themeSettings.primaryColor);
    root.style.setProperty('--theme-color-secondary', themeSettings.secondaryColor);
    root.style.setProperty('--theme-font-sans', themeSettings.fontFamilySans);
    root.style.setProperty('--theme-font-serif', themeSettings.fontFamilySerif);
  }, [themeSettings]);

  // Update theme function
  const updateTheme = async (newSettings) => {
    setThemeSettings(prev => ({ ...prev, ...newSettings }));
    try {
      await fetch(getApiUrl('/api/settings'), {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings),
      });
    } catch (err) {
      console.error('Failed to save theme to DB', err);
    }
  };

  return (
    <ThemeContext.Provider value={{ themeSettings, updateTheme, loading }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
