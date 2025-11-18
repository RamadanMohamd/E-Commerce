import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme, ThemeName } from './theme.types';
import { themes } from './themes';

interface ThemeContextType {
  theme: Theme;
  themeName: ThemeName;
  toggleTheme: () => void;
  setTheme: (themeName: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeName;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'light' 
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('theme') as ThemeName;
    return savedTheme || defaultTheme;
  });

  const theme = themes[themeName];

  useEffect(() => {
    // Save theme to localStorage
    localStorage.setItem('theme', themeName);
    
    // Update document class for Tailwind dark mode
    if (themeName === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeName]);

  const toggleTheme = () => {
    setThemeName(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: ThemeName) => {
    setThemeName(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, themeName, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
