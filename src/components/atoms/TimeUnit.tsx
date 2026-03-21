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
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        className="
          min-w-[44px] min-h-[44px] flex items-center justify-center
          rounded-lg text-xl font-bold
          text-slate-600 dark:text-slate-300
          hover:bg-slate-200 dark:hover:bg-slate-700
          transition-colors duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500
        "
        onClick={increment}
        aria-label={`${label}を増やす`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 5l6 8H4l6-8z" />
        </svg>
      </button>
      <div className="font-mono text-4xl text-slate-900 dark:text-slate-50 w-16 text-center">
        {String(value).padStart(2, '0')}
      </div>
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
      <button
        type="button"
        className="
          min-w-[44px] min-h-[44px] flex items-center justify-center
          rounded-lg text-xl font-bold
          text-slate-600 dark:text-slate-300
          hover:bg-slate-200 dark:hover:bg-slate-700
          transition-colors duration-150
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500
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
