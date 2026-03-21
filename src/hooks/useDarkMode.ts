'use client';

import { useState, useEffect, useCallback } from 'react';
import type { DarkModeState } from '@/types';

export function useDarkMode(): DarkModeState {
  const [isDark, setIsDark] = useState(true);

  // Initialize from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setIsDark(stored === 'dark');
    } else if (typeof window !== 'undefined') {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Sync dark class to document
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggle = useCallback(() => {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  }, []);

  return { isDark, toggle };
}
