'use client';

import React, { useState, useCallback } from 'react';
import Button from '@/components/atoms/Button';
import TimeSetter from '@/components/molecules/TimeSetter';
import PresetButtons from '@/components/molecules/PresetButtons';
import CircleProgress from '@/components/organisms/CircleProgress';
import { useCountdown } from '@/hooks/useCountdown';
import { formatCountdownTime } from '@/utils/time';

export default function CountdownPanel() {
  const {
    remaining,
    totalDuration,
    isRunning,
    isCompleted,
    start,
    pause,
    resume,
    reset,
    dismissAlarm,
  } = useCountdown();

  const [settingHours,   setSettingHours]   = useState(0);
  const [settingMinutes, setSettingMinutes] = useState(0);
  const [settingSeconds, setSettingSeconds] = useState(0);

  const phase: 'setting' | 'running' | 'completed' =
    isCompleted ? 'completed' : totalDuration > 0 ? 'running' : 'setting';

  const totalSettingSeconds = settingHours * 3600 + settingMinutes * 60 + settingSeconds;

  const handleStart = useCallback(() => {
    start(totalSettingSeconds);
  }, [start, totalSettingSeconds]);

  const handlePresetSelect = useCallback((totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    setSettingHours(h);
    setSettingMinutes(m);
    setSettingSeconds(s);
  }, []);

  const handleReset = useCallback(() => {
    reset();
    setSettingHours(0);
    setSettingMinutes(0);
    setSettingSeconds(0);
  }, [reset]);

  if (phase === 'completed') {
    return (
      <div className="flex flex-col items-center gap-8 py-8 animate-fade-in-up">
        <div className="w-full bg-white dark:bg-surface-900 rounded-3xl shadow-card p-10 border border-surface-100 dark:border-surface-800 flex flex-col items-center gap-6 animate-flash">
          <div className="text-2xl font-body font-bold text-gold-500 tracking-wide">
            タイムアップ！
          </div>
          <div className="font-display text-7xl font-bold text-surface-900 dark:text-gold-400 tracking-tight">
            00:00
          </div>
          <div className="flex gap-3">
            <Button variant="primary" onClick={dismissAlarm} ariaLabel="OK">OK</Button>
            <Button variant="danger"  onClick={handleReset}  ariaLabel="リセット">Reset</Button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'running') {
    const progress = totalDuration > 0 ? remaining / totalDuration : 0;
    return (
      <div className="flex flex-col items-center gap-8 py-8 animate-fade-in-up">
        <div className="w-full bg-white dark:bg-surface-900 rounded-3xl shadow-card p-10 border border-surface-100 dark:border-surface-800 flex flex-col items-center gap-6">
          <CircleProgress progress={progress} />
          <div
            className="font-display text-6xl sm:text-7xl font-bold text-surface-900 dark:text-gold-400 tracking-tight tabular-nums"
            aria-live="polite"
            aria-label={`残り時間: ${formatCountdownTime(remaining)}`}
          >
            {formatCountdownTime(remaining)}
          </div>
          <div className="flex gap-3">
            {isRunning ? (
              <Button variant="danger" onClick={pause} ariaLabel="一時停止">Pause</Button>
            ) : (
              <Button variant="success" onClick={resume} ariaLabel="再開">Resume</Button>
            )}
            <Button variant="ghost" onClick={handleReset} ariaLabel="リセット">Reset</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-8 py-8 animate-fade-in-up">
      <div className="w-full bg-white dark:bg-surface-900 rounded-3xl shadow-card p-8 border border-surface-100 dark:border-surface-800 flex flex-col items-center gap-8">
        <TimeSetter
          hours={settingHours}
          minutes={settingMinutes}
          seconds={settingSeconds}
          onChangeHours={setSettingHours}
          onChangeMinutes={setSettingMinutes}
          onChangeSeconds={setSettingSeconds}
        />
        <PresetButtons onSelect={handlePresetSelect} />
        <Button
          variant="primary"
          disabled={totalSettingSeconds === 0}
          onClick={handleStart}
          ariaLabel="カウントダウン開始"
        >
          Start
        </Button>
      </div>
    </div>
  );
}
