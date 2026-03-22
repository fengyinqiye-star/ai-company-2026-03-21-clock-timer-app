'use client';

import React from 'react';
import { formatDate } from '@/utils/time';

interface DateDisplayProps {
  date: Date;
}

export default function DateDisplay({ date }: DateDisplayProps) {
  return (
    <div className="font-body text-base text-surface-400 dark:text-surface-500 tracking-wide">
      {formatDate(date)}
    </div>
  );
}
