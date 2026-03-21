'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { COUNTDOWN_TICK_INTERVAL } from '@/lib/constants';
import { playAlarm, stopAlarm } from '@/lib/audio';
import type { CountdownState } from '@/types';

export function useCountdown(): CountdownState {
  const [remaining, setRemaining] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const endTimeRef = useRef<number>(0);
  const pausedRemainingRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTicking = useCallback(() => {
    intervalRef.current = setInterval(() => {
      const left = Math.max(0, (endTimeRef.current - Date.now()) / 1000);
      setRemaining(left);
      if (left <= 0) {
        clearTimer();
        setIsRunning(false);
        setIsCompleted(true);
        playAlarm();
      }
    }, COUNTDOWN_TICK_INTERVAL);
  }, [clearTimer]);

  const start = useCallback(
    (seconds: number) => {
      setTotalDuration(seconds);
      setRemaining(seconds);
      endTimeRef.current = Date.now() + seconds * 1000;
      startTicking();
      setIsRunning(true);
      setIsCompleted(false);
    },
    [startTicking]
  );

  const pause = useCallback(() => {
    clearTimer();
    pausedRemainingRef.current = remaining;
    setIsRunning(false);
  }, [remaining, clearTimer]);

  const resume = useCallback(() => {
    endTimeRef.current = Date.now() + pausedRemainingRef.current * 1000;
    startTicking();
    setIsRunning(true);
  }, [startTicking]);

  const reset = useCallback(() => {
    clearTimer();
    stopAlarm();
    setRemaining(0);
    setTotalDuration(0);
    setIsRunning(false);
    setIsCompleted(false);
  }, [clearTimer]);

  const dismissAlarm = useCallback(() => {
    stopAlarm();
    setIsCompleted(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearTimer();
      stopAlarm();
    };
  }, [clearTimer]);

  return {
    remaining,
    totalDuration,
    isRunning,
    isCompleted,
    start,
    pause,
    resume,
    reset,
    dismissAlarm,
  };
}
