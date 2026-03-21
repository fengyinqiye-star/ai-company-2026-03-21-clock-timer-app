'use client';

import React from 'react';
import TimeUnit from '@/components/atoms/TimeUnit';

interface TimeSetterProps {
  hours: number;
  minutes: number;
  seconds: number;
  onChangeHours: (h: number) => void;
  onChangeMinutes: (m: number) => void;
  onChangeSeconds: (s: number) => void;
}

export default function TimeSetter({
  hours,
  minutes,
  seconds,
  onChangeHours,
  onChangeMinutes,
  onChangeSeconds,
}: TimeSetterProps) {
  return (
    <div className="flex items-center gap-2">
      <TimeUnit value={hours} min={0} max={23} label="時" onChange={onChangeHours} />
      <span className="font-mono text-3xl text-slate-500 dark:text-slate-400 mt-[-1rem]">
        :
      </span>
      <TimeUnit value={minutes} min={0} max={59} label="分" onChange={onChangeMinutes} />
      <span className="font-mono text-3xl text-slate-500 dark:text-slate-400 mt-[-1rem]">
        :
      </span>
      <TimeUnit value={seconds} min={0} max={59} label="秒" onChange={onChangeSeconds} />
    </div>
  );
}
