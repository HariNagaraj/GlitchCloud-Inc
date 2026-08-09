import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = [
  { id: 'gc-epic', name: 'GC Epic', color: '#BB86FC', dim: 'rgba(187, 134, 252, 0.1)', glow: 'rgba(187, 134, 252, 0.3)' },
  { id: 'crimson', name: 'Crimson Peak', color: '#EF4444', dim: 'rgba(239, 68, 68, 0.1)', glow: 'rgba(239, 68, 68, 0.3)' },
  { id: 'emerald', name: 'Emerald Isle', color: '#10B981', dim: 'rgba(16, 185, 129, 0.1)', glow: 'rgba(16, 185, 129, 0.3)' },
  { id: 'ocean', name: 'Ocean Depth', color: '#3B82F6', dim: 'rgba(59, 130, 246, 0.1)', glow: 'rgba(59, 130, 246, 0.3)' },
  { id: 'amber', name: 'Amber Glow', color: '#F59E0B', dim: 'rgba(245, 158, 11, 0.1)', glow: 'rgba(245, 158, 11, 0.3)' },
  { id: 'midnight', name: 'Midnight Neon', color: '#8B5CF6', dim: 'rgba(139, 92, 246, 0.1)', glow: 'rgba(139, 92, 246, 0.3)' },
];

export const ThemeProvider = ({ children }) => {
  const [currentThemeId, setCurrentThemeId] = useState(() => {
    return localStorage.getItem('glitchcloud_theme') || 'gc-epic';
  });

  const theme = THEMES.find(t => t.id === currentThemeId) || THEMES[0];

  useEffect(() => {
    localStorage.setItem('glitchcloud_theme', currentThemeId);
    
    // Apply CSS variables to root
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.color);
    root.style.setProperty('--color-primary-dim', theme.dim);
    root.style.setProperty('--color-primary-glow', theme.glow);
  }, [currentThemeId, theme]);

  return (
    <ThemeContext.Provider value={{ currentTheme: theme, setCurrentTheme: setCurrentThemeId, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
