import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserIcon, ChevronDownIcon } from '../ui/icons';
import { Button } from '../ui/button';

export interface UserMenuProps {
  isAuthenticated?: boolean;
  userName?: string;
  onLogin?: () => void;
  onLogout?: () => void;
  className?: string;
}

export const UserMenu: React.FC<UserMenuProps> = ({
  isAuthenticated = false,
  userName = 'Guest',
  onLogin,
  onLogout,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={menuRef} data-testid="user-menu">
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="sm"
        className="flex items-center gap-2 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <UserIcon size={24} />
        {isAuthenticated && (
          <>
            <span className="hidden md:inline text-sm font-medium">{userName}</span>
            <ChevronDownIcon 
              size={16} 
              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </Button>

      {isOpen && (
        <div className="
          absolute right-0 mt-2
          w-48
          bg-white dark:bg-gray-800
          rounded-lg shadow-lg
          border border-gray-200 dark:border-gray-700
          py-2
          z-50
        ">
          {isAuthenticated ? (
            <>
              <Link
                to="/account"
                className="
                  block px-4 py-2
                  text-sm text-gray-700 dark:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  transition-colors
                "
                onClick={() => setIsOpen(false)}
              >
                My Account
              </Link>
              <Link
                to="/orders"
                className="
                  block px-4 py-2
                  text-sm text-gray-700 dark:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  transition-colors
                "
                onClick={() => setIsOpen(false)}
              >
                Orders
              </Link>
              <Link
                to="/wishlist"
                className="
                  block px-4 py-2
                  text-sm text-gray-700 dark:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  transition-colors
                "
                onClick={() => setIsOpen(false)}
              >
                Wishlist
              </Link>
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              <Button
                onClick={() => {
                  onLogout?.();
                  setIsOpen(false);
                }}
                variant="ghost"
                fullWidth
                className="w-full justify-start text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  onLogin?.();
                  setIsOpen(false);
                }}
                variant="ghost"
                fullWidth
                className="w-full justify-start text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Login
              </Button>
              <Link
                to="/register"
                className="
                  block px-4 py-2
                  text-sm text-gray-700 dark:text-gray-300
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  transition-colors
                "
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};
