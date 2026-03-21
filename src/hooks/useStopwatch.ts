'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { STOPWATCH_TICK_INTERVAL } from '@/lib/constants';
import type { Lap, StopwatchState } from '@/types';

export function useStopwatch(): StopwatchState {
  const [elapsed, setElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);

  const startTimeRef = useRef<number>(0);
  const accumulatedRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    startTimeRef.current = Date.now();
    accumulatedRef.current = elapsed;
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current + accumulatedRef.current);
    }, STOPWATCH_TICK_INTERVAL);
    setIsRunning(true);
  }, [elapsed]);

  const stop = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    accumulatedRef.current = elapsed;
    setIsRunning(false);
  }, [elapsed]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    startTimeRef.current = 0;
    accumulatedRef.current = 0;
    setElapsed(0);
    setIsRunning(false);
    setLaps([]);
  }, []);

  const lap = useCallback(() => {
    const lastTotal = laps.length > 0 ? laps[0].totalTime : 0;
    setLaps((prev) => [
      {
        number: prev.length + 1,
        lapTime: elapsed - lastTotal,
        totalTime: elapsed,
      },
      ...prev,
    ]);
  }, [elapsed, laps]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return { elapsed, isRunning, laps, start, stop, reset, lap };
}
