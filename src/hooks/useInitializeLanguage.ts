import { useEffect } from 'react';
import { useSettingsStore } from '@/store/settingsStore';
import i18n from '@/i18n/config';

/**
 * Hook to initialize and sync language settings on app mount
 * This ensures i18n and document settings are in sync with Zustand store
 */
export const useInitializeLanguage = () => {
  const { language } = useSettingsStore();

  useEffect(() => {
    // Ensure i18n language matches the store
    if (i18n.language !== language.code) {
      i18n.changeLanguage(language.code);
    }
    
    // Ensure document direction matches the language
    const isRTL = language.code === 'ar';
    if (document.documentElement.dir !== (isRTL ? 'rtl' : 'ltr')) {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    }
    
    // Ensure document lang attribute matches
    if (document.documentElement.lang !== language.code) {
      document.documentElement.lang = language.code;
    }
  }, [language]);
};
