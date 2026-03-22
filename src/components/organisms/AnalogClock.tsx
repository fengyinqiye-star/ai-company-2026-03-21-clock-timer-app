'use client';

import React from 'react';

interface AnalogClockProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function AnalogClock({ hours, minutes, seconds }: AnalogClockProps) {
  const hourAngle   = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  const hourMarkers = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30;
    const rad   = (angle * Math.PI) / 180;
    const innerR = 80;
    const outerR = 90;
    return (
      <line
        key={`h-${i}`}
        x1={100 + innerR * Math.sin(rad)}
        y1={100 - innerR * Math.cos(rad)}
        x2={100 + outerR * Math.sin(rad)}
        y2={100 - outerR * Math.cos(rad)}
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    );
  });

  const minuteMarkers = Array.from({ length: 60 }, (_, i) => {
    if (i % 5 === 0) return null;
    const angle = i * 6;
    const rad   = (angle * Math.PI) / 180;
    const innerR = 86;
    const outerR = 90;
    return (
      <line
        key={`m-${i}`}
        x1={100 + innerR * Math.sin(rad)}
        y1={100 - innerR * Math.cos(rad)}
        x2={100 + outerR * Math.sin(rad)}
        y2={100 - outerR * Math.cos(rad)}
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    );
  });

  return (
    <div className="w-full max-w-[220px] sm:max-w-[260px] mx-auto p-2">
      <svg
        viewBox="0 0 200 200"
        className="w-full drop-shadow-[0_0_16px_rgba(251,191,36,0.15)]"
        aria-hidden="true"
      >
        {/* Outer ring */}
        <circle cx="100" cy="100" r="97" fill="none" className="stroke-surface-200 dark:stroke-surface-700" strokeWidth="1" />
        {/* Dial background */}
        <circle cx="100" cy="100" r="95" className="fill-surface-50 dark:fill-surface-800" />
        {/* Inner ring */}
        <circle cx="100" cy="100" r="95" fill="none" className="stroke-surface-200 dark:stroke-surface-700" strokeWidth="1.5" />

        {/* Markers */}
        <g className="text-surface-400 dark:text-surface-500">{hourMarkers}</g>
        <g className="text-surface-300 dark:text-surface-600">{minuteMarkers}</g>

        {/* Hour hand */}
        <line
          x1="100" y1="100" x2="100" y2="50"
          className="stroke-surface-800 dark:stroke-surface-200"
          strokeWidth="4" strokeLinecap="round"
          transform={`rotate(${hourAngle}, 100, 100)`}
        />

        {/* Minute hand */}
        <line
          x1="100" y1="100" x2="100" y2="28"
          className="stroke-surface-700 dark:stroke-surface-300"
          strokeWidth="2.5" strokeLinecap="round"
          transform={`rotate(${minuteAngle}, 100, 100)`}
        />

        {/* Second hand */}
        <line
          x1="100" y1="112" x2="100" y2="22"
          className="stroke-gold-400"
          strokeWidth="1.5" strokeLinecap="round"
          transform={`rotate(${secondAngle}, 100, 100)`}
        />

        {/* Center cap */}
        <circle cx="100" cy="100" r="4" className="fill-surface-100 dark:fill-surface-900 stroke-gold-400" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="2" className="fill-gold-400" />
      </svg>
    </div>
  );
}
