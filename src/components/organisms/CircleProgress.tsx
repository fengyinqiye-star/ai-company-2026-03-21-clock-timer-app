'use client';

import React from 'react';

interface CircleProgressProps {
  progress: number; // 0.0 ~ 1.0
}

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CircleProgress({ progress }: CircleProgressProps) {
  const offset = CIRCUMFERENCE * (1 - Math.max(0, Math.min(1, progress)));

  return (
    <div className="relative w-32 h-32 sm:w-40 sm:h-40">
      <svg viewBox="0 0 120 120" className="w-full h-full">
        {/* Background track */}
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          className="text-slate-300 dark:text-slate-600"
          strokeWidth="6"
        />
        {/* Progress arc */}
        <circle
          cx="60"
          cy="60"
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          className="text-sky-600 dark:text-sky-400"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90, 60, 60)"
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
    </div>
  );
}
