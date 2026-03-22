'use client';

import React, { useState, useCallback } from 'react';
import Toggle from '@/components/atoms/Toggle';
import { formatClockTime } from '@/utils/time';
import { STORAGE_KEY_TIME_FORMAT } from '@/lib/constants';

interface DigitalClockProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export default function DigitalClock({ hours, minutes, seconds }: DigitalClockProps) {
  const [is24h, setIs24h] = useState(() => {
    if (typeof window === 'undefined') return true;
    const saved = localStorage.getItem(STORAGE_KEY_TIME_FORMAT);
    return saved !== '12h';
  });

  const handleToggle = useCallback((checked: boolean) => {
    const newIs24h = !checked;
    setIs24h(newIs24h);
    localStorage.setItem(STORAGE_KEY_TIME_FORMAT, newIs24h ? '24h' : '12h');
  }, []);

  const { time, period } = formatClockTime(hours, minutes, seconds, is24h);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="font-display text-6xl sm:text-7xl font-bold text-surface-900 dark:text-gold-400 tracking-tight tabular-nums"
        aria-live="polite"
        aria-label={`現在時刻: ${hours}時${minutes}分${seconds}秒`}
      >
        {time}
        {period && (
          <span className="text-xl sm:text-2xl ml-2 text-surface-400 dark:text-surface-500 font-body font-normal">
            {period}
          </span>
        )}
      </div>
      <Toggle
        checked={!is24h}
        onChange={handleToggle}
        labelLeft="24h"
        labelRight="12h"
        ariaLabel="12時間表示と24時間表示を切り替え"
      />
    </div>
  );
}
