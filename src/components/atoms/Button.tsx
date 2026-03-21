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
    'bg-sky-600 dark:bg-sky-400 text-white dark:text-slate-900 hover:bg-sky-700 dark:hover:bg-sky-300',
  success: 'bg-green-500 text-white hover:bg-green-600',
  danger: 'bg-red-500 text-white hover:bg-red-600',
  ghost:
    'bg-transparent border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700',
};

const sizeStyles: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-base',
  lg: 'px-7 py-3 text-lg',
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
        min-w-[44px] min-h-[44px] rounded-lg font-medium
        transition-colors duration-150
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2
        dark:focus-visible:ring-offset-slate-900
        disabled:opacity-50 disabled:cursor-not-allowed
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
