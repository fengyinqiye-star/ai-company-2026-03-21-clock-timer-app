'use client';

import React from 'react';
import Button from '@/components/atoms/Button';

interface PresetButtonsProps {
  onSelect: (totalSeconds: number) => void;
}

const presets = [
  { seconds: 60, label: '1分' },
  { seconds: 180, label: '3分' },
  { seconds: 300, label: '5分' },
  { seconds: 600, label: '10分' },
  { seconds: 900, label: '15分' },
  { seconds: 1800, label: '30分' },
];

export default function PresetButtons({ onSelect }: PresetButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {presets.map((preset) => (
        <Button
          key={preset.seconds}
          variant="ghost"
          size="sm"
          onClick={() => onSelect(preset.seconds)}
          ariaLabel={`${preset.label}にセット`}
        >
          {preset.label}
        </Button>
      ))}
    </div>
  );
}
