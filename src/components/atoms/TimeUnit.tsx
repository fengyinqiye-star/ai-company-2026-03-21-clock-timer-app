'use client';

import React from 'react';

interface TimeUnitProps {
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (value: number) => void;
}

export default function TimeUnit({
  value,
  min,
  max,
  label,
  onChange,
}: TimeUnitProps) {
  const increment = () => {
    onChange(value >= max ? min : value + 1);
  };

  const decrement = () => {
    onChange(value <= min ? max : value - 1);
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      <button
        type="button"
        className="
          min-w-[44px] min-h-[44px] flex items-center justify-center
          rounded-xl text-xl font-bold
          text-surface-500 dark:text-surface-400
          hover:bg-surface-100 dark:hover:bg-surface-800
          hover:text-gold-500 dark:hover:text-gold-400
          transition-all duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400
        "
        onClick={increment}
        aria-label={`${label}を増やす`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 5l6 8H4l6-8z" />
        </svg>
      </button>
      <div className="font-display text-5xl text-surface-900 dark:text-gold-400 w-20 text-center tracking-tight">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-xs font-body text-surface-400 dark:text-surface-500 uppercase tracking-widest">{label}</span>
      <button
        type="button"
        className="
          min-w-[44px] min-h-[44px] flex items-center justify-center
          rounded-xl text-xl font-bold
          text-surface-500 dark:text-surface-400
          hover:bg-surface-100 dark:hover:bg-surface-800
          hover:text-gold-500 dark:hover:text-gold-400
          transition-all duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400
        "
        onClick={decrement}
        aria-label={`${label}を減らす`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 15l6-8H4l6 8z" />
        </svg>
      </button>
    </div>
  );
}
