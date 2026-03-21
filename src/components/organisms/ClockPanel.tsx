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
    <div className="flex flex-col items-center gap-6 py-6">
      <AnalogClock hours={hours} minutes={minutes} seconds={seconds} />
      <DigitalClock hours={hours} minutes={minutes} seconds={seconds} />
      <DateDisplay date={date} />
    </div>
  );
}
