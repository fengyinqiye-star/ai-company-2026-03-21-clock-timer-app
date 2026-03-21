'use client';

import React from 'react';
import type { TabId } from '@/types';

interface TabBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string }[] = [
  { id: 'clock', label: 'Clock' },
  { id: 'stopwatch', label: 'Stopwatch' },
  { id: 'timer', label: 'Timer' },
];

export default function TabBar({ activeTab, onTabChange }: TabBarProps) {
  return (
    <div
      role="tablist"
      aria-label="Main navigation"
      className="flex bg-slate-200 dark:bg-slate-700 rounded-lg p-1 gap-1"
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
              flex-1 min-h-[44px] px-4 py-2 rounded-md text-sm font-medium
              transition-colors duration-150
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500
              ${
                isActive
                  ? 'bg-sky-600 dark:bg-sky-400 text-white dark:text-slate-900 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
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
