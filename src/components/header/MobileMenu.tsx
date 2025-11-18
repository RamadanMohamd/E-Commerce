import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CloseIcon } from '../ui/icons';
import { Button } from '../ui/button';
import { NavItem } from './Navigation';

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  isAuthenticated?: boolean;
  userName?: string;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  items,
  isAuthenticated = false,
  userName = 'Guest',
  onLogin,
  onLogout,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
        data-testid="mobile-menu-backdrop"
      />

      {/* Menu */}
      <div
        className="
          fixed top-0 right-0 bottom-0
          w-80 max-w-full
          bg-white dark:bg-gray-900
          shadow-xl
          z-50
          lg:hidden
          overflow-y-auto
        "
        data-testid="mobile-menu"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Menu</h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-0 border-0"
            aria-label="Close menu"
          >
            <CloseIcon size={24} />
          </Button>
        </div>

        {/* User Section */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          {isAuthenticated ? (
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Welcome back,</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">{userName}</p>
            </div>
          ) : (
            <Button
              onClick={() => {
                onLogin?.();
                onClose();
              }}
              fullWidth
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Login / Register
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={onClose}
                  className="
                    block px-4 py-3
                    text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    rounded-lg
                    transition-colors
                  "
                >
                  <span className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="
                        inline-flex items-center justify-center
                        w-6 h-6
                        text-xs font-semibold
                        text-white bg-red-500
                        rounded-full
                      ">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Actions */}
        {isAuthenticated && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/account"
                  onClick={onClose}
                  className="
                    block px-4 py-2
                    text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    rounded-lg
                    transition-colors
                  "
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  onClick={onClose}
                  className="
                    block px-4 py-2
                    text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    rounded-lg
                    transition-colors
                  "
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  onClick={onClose}
                  className="
                    block px-4 py-2
                    text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 dark:hover:bg-gray-800
                    rounded-lg
                    transition-colors
                  "
                >
                  Wishlist
                </Link>
              </li>
              <li>
                <Button
                  onClick={() => {
                    onLogout?.();
                    onClose();
                  }}
                  variant="ghost"
                  fullWidth
                  className="w-full justify-start text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  Logout
                </Button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};
