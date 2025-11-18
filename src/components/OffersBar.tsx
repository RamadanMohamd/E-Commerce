import React, { useEffect, useState } from 'react';
import { useTheme } from '@/theme/ThemeContext';
import { useTranslation } from '@/hooks/useTranslation';

const OffersBar: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [time, setTime] = useState<string>(() => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      }));
    }, 60_000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="flex items-center justify-center w-screen"
      style={{ backgroundColor: '#141414', height: 42 }}
    >
      <div className="container mx-auto w-[90%] flex items-center justify-center gap-4">
        {/* Offer Text */}
        <p
          className="text-center"
          style={{
            fontFamily: 'Clash Grotesk, Inter, sans-serif',
            fontWeight: 500,
            fontSize: 14,
            lineHeight: '120%',
            color: '#FFFFFF',
          }}
        >
          {t('offersBar.message')}
        </p>
        
        {/* Time pill */}
        <div
          className="flex items-center justify-center flex-shrink-0"
          style={{
            backgroundColor: theme.colors.secondary,
            borderRadius: 23,
            paddingLeft: 8,
            paddingRight: 8,
            height: 18,
            fontFamily: 'Clash Grotesk, Inter, sans-serif',
            fontWeight: 500,
            fontSize: 12,
            lineHeight: '100%',
            color: '#FFFFFF',
          }}
          aria-label={t('offersBar.timeLabel')}
        >
          {time}
        </div>
      </div>
    </div>
  );
};

export default OffersBar;
