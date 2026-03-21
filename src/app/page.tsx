'use client';

import React, { useState } from 'react';
import type { TabId } from '@/types';
import { useClock } from '@/hooks/useClock';
import { useDarkMode } from '@/hooks/useDarkMode';
import Header from '@/components/organisms/Header';
import TabBar from '@/components/molecules/TabBar';
import ClockPanel from '@/components/organisms/ClockPanel';
import StopwatchPanel from '@/components/organisms/StopwatchPanel';
import CountdownPanel from '@/components/organisms/CountdownPanel';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('clock');
  const { hours, minutes, seconds, date } = useClock();
  const { isDark, toggle } = useDarkMode();

  return (
    <main>
      <Header isDark={isDark} onToggleDarkMode={toggle} />
      <TabBar activeTab={activeTab} onTabChange={setActiveTab} />

      <div role="tabpanel" className={activeTab === 'clock' ? '' : 'hidden'}>
        <ClockPanel hours={hours} minutes={minutes} seconds={seconds} date={date} />
      </div>
      <div role="tabpanel" className={activeTab === 'stopwatch' ? '' : 'hidden'}>
        <StopwatchPanel />
      </div>
      <div role="tabpanel" className={activeTab === 'timer' ? '' : 'hidden'}>
        <CountdownPanel />
      </div>
    </main>
  );
}
