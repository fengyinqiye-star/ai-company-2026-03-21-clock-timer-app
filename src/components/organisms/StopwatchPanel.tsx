'use client';

import React from 'react';
import Button from '@/components/atoms/Button';
import LapList from '@/components/molecules/LapList';
import { useStopwatch } from '@/hooks/useStopwatch';
import { formatStopwatchTime } from '@/utils/time';

export default function StopwatchPanel() {
  const { elapsed, isRunning, laps, start, stop, reset, lap } = useStopwatch();

  return (
    <div className="flex flex-col items-center gap-8 py-8 animate-fade-in-up">
      {/* Time display card */}
      <div className="w-full bg-white dark:bg-surface-900 rounded-3xl shadow-card p-10 border border-surface-100 dark:border-surface-800 flex flex-col items-center gap-6">
        <div
          className="font-display text-6xl sm:text-7xl font-bold text-surface-900 dark:text-gold-400 tracking-tight tabular-nums"
          aria-live="polite"
          aria-label={`経過時間: ${formatStopwatchTime(elapsed)}`}
        >
          {formatStopwatchTime(elapsed)}
        </div>

        <div className="flex gap-3">
          {!isRunning && elapsed === 0 && (
            <Button variant="success" onClick={start} ariaLabel="スタート">
              Start
            </Button>
          )}
          {isRunning && (
            <>
              <Button variant="danger" onClick={stop} ariaLabel="ストップ">
                Stop
              </Button>
              <Button variant="ghost" onClick={lap} ariaLabel="ラップ">
                Lap
              </Button>
            </>
          )}
          {!isRunning && elapsed > 0 && (
            <>
              <Button variant="success" onClick={start} ariaLabel="再開">
                Resume
              </Button>
              <Button variant="danger" onClick={reset} ariaLabel="リセット">
                Reset
              </Button>
            </>
          )}
        </div>
      </div>

      {laps.length > 0 && (
        <div className="w-full bg-white dark:bg-surface-900 rounded-3xl shadow-card border border-surface-100 dark:border-surface-800 overflow-hidden">
          <div className="px-6 py-4 border-b border-surface-100 dark:border-surface-800">
            <span className="font-body text-sm font-medium text-surface-400 dark:text-surface-500 uppercase tracking-widest">Laps</span>
          </div>
          <div className="px-4 py-2">
            <LapList laps={laps} />
          </div>
        </div>
      )}
    </div>
  );
}
