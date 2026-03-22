'use client';

import React from 'react';

interface CircleProgressProps {
  progress: number; // 0.0 ~ 1.0
}

const RADIUS = 52;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CircleProgress({ progress }: CircleProgressProps) {
  const offset = CIRCUMFERENCE * (1 - Math.max(0, Math.min(1, progress)));

  return (
    <div className="relative w-36 h-36 sm:w-44 sm:h-44">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        {/* Track */}
        <circle
          cx="60" cy="60" r={RADIUS}
          fill="none"
          className="stroke-surface-200 dark:stroke-surface-700"
          strokeWidth="5"
        />
        {/* Progress */}
        <circle
          cx="60" cy="60" r={RADIUS}
          fill="none"
          className="stroke-gold-400"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </svg>
    </div>
  );
}
