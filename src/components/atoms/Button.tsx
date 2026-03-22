'use client';

import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'primary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick: () => void;
  ariaLabel?: string;
}

const variantStyles: Record<ButtonProps['variant'], string> = {
  primary:
    'bg-gold-500 text-surface-900 hover:bg-gold-400 font-semibold shadow-sm',
  success:
    'bg-emerald-600 dark:bg-emerald-500 text-white hover:bg-emerald-500 dark:hover:bg-emerald-400 shadow-sm',
  danger:
    'bg-rose-600 dark:bg-rose-500 text-white hover:bg-rose-500 dark:hover:bg-rose-400 shadow-sm',
  ghost:
    'border border-surface-300 dark:border-surface-600 text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 hover:border-surface-400 dark:hover:border-surface-500',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-4 py-1.5 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3 text-lg',
};

export default function Button({
  children,
  variant,
  size = 'md',
  disabled = false,
  onClick,
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`
        min-w-[44px] min-h-[44px] rounded-xl font-body font-medium
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-surface-950
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
      `}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
