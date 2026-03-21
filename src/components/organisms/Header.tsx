'use client';

import React from 'react';
import IconButton from '@/components/atoms/IconButton';

interface HeaderProps {
  isDark: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({ isDark, onToggleDarkMode }: HeaderProps) {
  return (
    <header role="banner" className="flex items-center justify-between py-4">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
        Clock
      </h1>
      <IconButton
        icon={isDark ? 'sun' : 'moon'}
        onClick={onToggleDarkMode}
        ariaLabel={isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
      />
    </header>
  );
}
