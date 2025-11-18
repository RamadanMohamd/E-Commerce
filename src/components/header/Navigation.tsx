import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export interface NavItem {
  label: string;
  path: string;
  badge?: number;
}

export interface NavigationProps {
  items: NavItem[];
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ items, className = '' }) => {
  const location = useLocation();

  return (
    <nav className={`flex items-center gap-6 ${className}`} data-testid="navigation">
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`
              relative
              text-sm font-medium
              transition-colors
              ${isActive 
                ? 'text-blue-600 dark:text-blue-400' 
                : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }
            `}
          >
            {item.label}
            {item.badge && item.badge > 0 && (
              <span className="
                absolute -top-2 -right-3
                inline-flex items-center justify-center
                w-5 h-5
                text-xs font-semibold
                text-white bg-red-500
                rounded-full
              ">
                {item.badge}
              </span>
            )}
            {isActive && (
              <span className="
                absolute -bottom-1 left-0 right-0
                h-0.5
                bg-blue-600 dark:bg-blue-400
                rounded-full
              " />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
