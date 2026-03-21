'use client';

import React from 'react';
import type { Lap } from '@/types';
import { formatStopwatchTime } from '@/utils/time';

interface LapListProps {
  laps: Lap[];
}

export default function LapList({ laps }: LapListProps) {
  // Determine fastest and slowest lap when 3+ laps exist
  let fastestIdx = -1;
  let slowestIdx = -1;

  if (laps.length >= 3) {
    let minTime = Infinity;
    let maxTime = -Infinity;

    laps.forEach((lap, i) => {
      if (lap.lapTime < minTime) {
        minTime = lap.lapTime;
        fastestIdx = i;
      }
      if (lap.lapTime > maxTime) {
        maxTime = lap.lapTime;
        slowestIdx = i;
      }
    });
  }

  return (
    <div className="w-full max-h-[240px] overflow-y-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-700">
            <th className="py-2 text-left font-medium">#</th>
            <th className="py-2 text-right font-medium">Lap</th>
            <th className="py-2 text-right font-medium">Total</th>
          </tr>
        </thead>
        <tbody>
          {laps.map((lap, i) => {
            let rowClass = 'text-slate-900 dark:text-slate-50';
            if (i === fastestIdx) {
              rowClass = 'text-green-500';
            } else if (i === slowestIdx) {
              rowClass = 'text-red-500';
            }

            return (
              <tr
                key={lap.number}
                className={`${rowClass} border-b border-slate-100 dark:border-slate-800`}
              >
                <td className="py-2 text-left">{lap.number}</td>
                <td className="py-2 text-right font-mono">
                  {formatStopwatchTime(lap.lapTime)}
                </td>
                <td className="py-2 text-right font-mono">
                  {formatStopwatchTime(lap.totalTime)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
