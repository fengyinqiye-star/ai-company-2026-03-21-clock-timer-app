'use client';

import React from 'react';
import AnalogClock from '@/components/organisms/AnalogClock';
import DigitalClock from '@/components/molecules/DigitalClock';
import DateDisplay from '@/components/molecules/DateDisplay';

interface ClockPanelProps {
  hours: number;
  minutes: number;
  seconds: number;
  date: Date;
}

export default function ClockPanel({ hours, minutes, seconds, date }: ClockPanelProps) {
  return (
    <div className="flex flex-col items-center gap-8 py-8 animate-fade-in-up">
      {/* Analog clock in a card */}
      <div className="w-full bg-white dark:bg-surface-900 rounded-3xl shadow-card p-6 border border-surface-100 dark:border-surface-800">
        <AnalogClock hours={hours} minutes={minutes} seconds={seconds} />
      </div>

      {/* Digital display */}
      <div className="w-full bg-white dark:bg-surface-900 rounded-3xl shadow-card p-8 border border-surface-100 dark:border-surface-800 flex flex-col items-center gap-4">
        <DigitalClock hours={hours} minutes={minutes} seconds={seconds} />
        <DateDisplay date={date} />
      </div>
    </div>
  );
}
