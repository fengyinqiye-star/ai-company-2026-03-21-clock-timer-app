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
    <div className="flex items-center gap-2">
      <span
        className={`text-sm ${
          !checked
            ? 'text-slate-900 dark:text-slate-50 font-medium'
            : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        {labelLeft}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        className="
          relative inline-flex h-6 w-11 items-center rounded-full
          bg-slate-300 dark:bg-slate-600
          transition-colors duration-200
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500
          min-w-[44px] min-h-[44px] p-0
        "
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
        className={`text-sm ${
          checked
            ? 'text-slate-900 dark:text-slate-50 font-medium'
            : 'text-slate-500 dark:text-slate-400'
        }`}
      >
        {labelRight}
      </span>
    </div>
  );
}
