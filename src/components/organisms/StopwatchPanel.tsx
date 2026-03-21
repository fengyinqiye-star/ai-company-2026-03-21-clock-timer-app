'use client';

import React from 'react';
import Button from '@/components/atoms/Button';
import LapList from '@/components/molecules/LapList';
import { useStopwatch } from '@/hooks/useStopwatch';
import { formatStopwatchTime } from '@/utils/time';

export default function StopwatchPanel() {
  const { elapsed, isRunning, laps, start, stop, reset, lap } = useStopwatch();

  return (
    <div className="flex flex-col items-center gap-6 py-6">
      {/* Elapsed time display */}
      <div
        className="font-mono text-5xl sm:text-6xl text-slate-900 dark:text-slate-50 tracking-wider"
        aria-live="polite"
        aria-label={`経過時間: ${formatStopwatchTime(elapsed)}`}
      >
        {formatStopwatchTime(elapsed)}
      </div>

      {/* Control buttons */}
      <div className="flex gap-4">
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

      {/* Lap list */}
      {laps.length > 0 && (
        <div className="w-full max-w-md">
          <LapList laps={laps} />
        </div>
      )}
    </div>
  );
}
