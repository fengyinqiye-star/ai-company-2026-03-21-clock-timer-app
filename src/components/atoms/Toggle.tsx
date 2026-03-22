'use client';

import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  labelLeft: string;
  labelRight: string;
  ariaLabel: string;
}

export default function Toggle({
  checked,
  onChange,
  labelLeft,
  labelRight,
  ariaLabel,
}: ToggleProps) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        className={`text-sm font-body font-medium ${
          !checked
            ? 'text-surface-900 dark:text-surface-100'
            : 'text-surface-400 dark:text-surface-500'
        }`}
      >
        {labelLeft}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full
          transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400
          min-w-[44px] min-h-[44px] p-0
          ${checked ? 'bg-gold-500' : 'bg-surface-300 dark:bg-surface-600'}
        `}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`
            inline-block h-4 w-4 rounded-full bg-white shadow-sm
            transition-transform duration-200
            ${checked ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
      <span
        className={`text-sm font-body font-medium ${
          checked
            ? 'text-surface-900 dark:text-surface-100'
            : 'text-surface-400 dark:text-surface-500'
        }`}
      >
        {labelRight}
      </span>
    </div>
  );
}
