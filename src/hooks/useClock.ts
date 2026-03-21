'use client';

import { useState, useEffect, useRef } from 'react';
import type { ClockState } from '@/types';

function getClockState(): ClockState {
  const now = new Date();
  return {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    date: now,
  };
}

/**
 * Custom hook that provides the current time, updating every second.
 * Uses setTimeout chain with drift compensation to stay in sync
 * with the system clock second boundary.
 */
export function useClock(): ClockState {
  const [clock, setClock] = useState<ClockState>(getClockState);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const tick = () => {
      setClock(getClockState());
      const now = Date.now();
      const delay = 1000 - (now % 1000);
      timerRef.current = setTimeout(tick, delay);
    };
    tick();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return clock;
}
