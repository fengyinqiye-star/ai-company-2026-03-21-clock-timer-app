'use client';

import React from 'react';
import type { TabId } from '@/types';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string }[] = [
  { id: 'clock',     label: 'Clock' },
  { id: 'stopwatch', label: 'Stopwatch' },
  { id: 'timer',     label: 'Timer' },
];

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div
      role="tablist"
      aria-label="Main navigation"
      className="flex bg-surface-100 dark:bg-surface-800 rounded-2xl p-1.5 gap-1 my-6"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={`
              flex-1 min-h-[44px] px-4 py-2 rounded-xl text-sm font-body font-medium
              transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400
              ${
                isActive
                  ? 'bg-surface-900 dark:bg-gold-500 text-white dark:text-surface-900 shadow-card'
                  : 'text-surface-500 dark:text-surface-400 hover:text-surface-800 dark:hover:text-surface-200 hover:bg-surface-200 dark:hover:bg-surface-700'
              }
            `}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
