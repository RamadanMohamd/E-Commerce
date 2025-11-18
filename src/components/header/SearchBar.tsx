import React, { useState, useRef, useEffect } from 'react';
import { SearchIcon } from '../ui/icons';
import { useTheme } from '../../theme/ThemeContext';

export interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search products...',
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative flex items-center ${className}`}
      data-testid="search-bar"
    >
      <div className={`
        relative w-full flex items-center
        bg-gray-100 dark:bg-gray-800
        rounded-lg
        transition-all duration-200
        ${isFocused ? 'ring-2 ring-blue-500' : ''}
      `}>
        <SearchIcon 
          size={20} 
          className="absolute left-3 text-gray-400 pointer-events-none" 
        />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="
            w-full
            pl-10 pr-4 py-2
            bg-transparent
            text-gray-900 dark:text-gray-100
            placeholder-gray-500
            outline-none
          "
          aria-label="Search products"
        />
      </div>
    </form>
  );
};
