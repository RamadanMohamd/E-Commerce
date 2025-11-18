import React from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/useTranslation';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  const { currentLanguage } = useTranslation();
  const isRTL = currentLanguage === 'ar';
  return (
    <nav aria-label="Breadcrumb" className={cn('', className)}>
      <ol className="flex items-center gap-2 flex-wrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="text-xs md:text-base text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    'text-xs md:text-base',
                    isLast ? 'text-gray-900 font-medium' : 'text-gray-500'
                  )}
                >
                  {item.label}
                </span>
              )}
              
              {!isLast && (
                <ChevronRight 
                  className={cn(
                    "w-3 h-3 md:w-4 md:h-4 text-gray-400",
                    isRTL && "rotate-180"
                  )} 
                  strokeWidth={2} 
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
