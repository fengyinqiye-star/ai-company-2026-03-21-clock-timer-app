'use client';

import React from 'react';

interface AnalogClockProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function AnalogClock({ hours, minutes, seconds }: AnalogClockProps) {
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  // Generate hour markers (12)
  const hourMarkers = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30;
    const rad = (angle * Math.PI) / 180;
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

  // Generate minute markers (48, excluding positions that have hour markers)
  const minuteMarkers = Array.from({ length: 60 }, (_, i) => {
    if (i % 5 === 0) return null; // Skip hour marker positions
    const angle = i * 6;
    const rad = (angle * Math.PI) / 180;
    const innerR = 85;
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
      />
    );
  });

  return (
    <div className="w-full max-w-[240px] sm:max-w-[280px] lg:max-w-[320px] mx-auto">
      <svg
        viewBox="0 0 200 200"
        className="w-full text-slate-700 dark:text-slate-300"
        aria-hidden="true"
      >
        {/* Dial circle */}
        <circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* Hour markers */}
        {hourMarkers}

        {/* Minute markers */}
        {minuteMarkers}

        {/* Hour hand */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="45"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          transform={`rotate(${hourAngle}, 100, 100)`}
        />

        {/* Minute hand */}
        <line
          x1="100"
          y1="100"
          x2="100"
          y2="25"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle}, 100, 100)`}
        />

        {/* Second hand */}
        <line
          x1="100"
          y1="110"
          x2="100"
          y2="20"
          className="text-rose-600 dark:text-rose-500"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${secondAngle}, 100, 100)`}
        />

        {/* Center dot */}
        <circle
          cx="100"
          cy="100"
          r="3"
          className="fill-rose-600 dark:fill-rose-500"
        />
      </svg>
    </div>
  );
}
