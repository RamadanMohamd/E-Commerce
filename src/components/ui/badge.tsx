import React from 'react';

export interface BadgeProps {
  count: number;
  max?: number;
  showZero?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'error' | 'success';
}

export const Badge: React.FC<BadgeProps> = ({
  count,
  max = 99,
  showZero = false,
  className = '',
  size = 'md',
  variant = 'primary',
}) => {
  if (count === 0 && !showZero) {
    return null;
  }

  const displayCount = count > max ? `${max}+` : count.toString();

  const sizeClasses = {
    sm: 'min-w-[16px] h-4 text-xs px-1',
    md: 'min-w-[20px] h-5 text-xs px-1.5',
    lg: 'min-w-[24px] h-6 text-sm px-2',
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white',
    secondary: 'bg-gray-600 text-white',
    error: 'bg-red-600 text-white',
    success: 'bg-green-600 text-white',
  };

  return (
    <span
      className={`
        inline-flex items-center justify-center
        rounded-full font-semibold
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      data-testid="badge"
    >
      {displayCount}
    </span>
  );
};
