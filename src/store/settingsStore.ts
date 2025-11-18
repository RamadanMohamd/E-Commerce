import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import i18n from '../i18n/config';

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface SettingsState {
  language: Language;
  currency: string;
  setLanguage: (language: Language) => void;
  setCurrency: (currency: string) => void;
}

export const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "ar", name: "العربيه", flag: "🇸🇦" },
];

export const currencies = ["USD", "EGP"];

export const useSettingsStore = create<SettingsState>()(
  persist(
    immer((set, get) => ({
      language: languages[0], // Default to English
      currency: "USD", // Default to USD
      
      setLanguage: (language: Language) => {
        set((state) => {
          state.language = language;
        });
        // Sync with i18n
        i18n.changeLanguage(language.code);
        // Update document direction for RTL languages
        document.documentElement.dir = language.code === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language.code;
      },
      
      setCurrency: (currency: string) => {
        set((state) => {
          state.currency = currency;
        });
      },
    })),
    {
      name: 'settings-storage', // localStorage key
      onRehydrateStorage: () => (state) => {
        // Sync i18n and document direction after rehydration from localStorage
        if (state) {
          i18n.changeLanguage(state.language.code);
          document.documentElement.dir = state.language.code === 'ar' ? 'rtl' : 'ltr';
          document.documentElement.lang = state.language.code;
        }
      },
    }
  )
);
