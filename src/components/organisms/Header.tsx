'use client';

import React from 'react';
import IconButton from '@/components/atoms/IconButton';

interface HeaderProps {
  isDark: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ isDark, onToggleDarkMode }: HeaderProps) {
  return (
    <header role="banner" className="flex items-center justify-between pt-8 pb-2">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-surface-900 dark:text-surface-50">
          <span className="text-gold-400">C</span>lock
        </h1>
        <div className="mt-0.5 h-0.5 w-8 bg-gold-400 rounded-full" />
      </div>
      <IconButton
        icon={isDark ? 'sun' : 'moon'}
        onClick={onToggleDarkMode}
        ariaLabel={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
      />
    </header>
  );
}
