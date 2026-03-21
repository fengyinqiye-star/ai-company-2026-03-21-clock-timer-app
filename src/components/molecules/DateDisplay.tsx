'use client';

import React from 'react';
import { formatDate } from '@/utils/time';

interface DateDisplayProps {
  date: Date;
}

export default function DateDisplay({ date }: DateDisplayProps) {
  return (
    <div className="text-lg text-slate-500 dark:text-slate-400">
      {formatDate(date)}
    </div>
  );
}
