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

  const [settingHours, setSettingHours] = useState(0);
  const [settingMinutes, setSettingMinutes] = useState(0);
  const [settingSeconds, setSettingSeconds] = useState(0);

  // Derive phase from countdown state
  const phase: 'setting' | 'running' | 'completed' =
    isCompleted ? 'completed' : totalDuration > 0 ? 'running' : 'setting';

  const totalSettingSeconds =
    settingHours * 3600 + settingMinutes * 60 + settingSeconds;

  const handleStart = useCallback(() => {
    start(totalSettingSeconds);
  }, [start, totalSettingSeconds]);

  const handlePresetSelect = useCallback(
    (totalSeconds: number) => {
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      setSettingHours(h);
      setSettingMinutes(m);
      setSettingSeconds(s);
    },
    []
  );

  const handleReset = useCallback(() => {
    reset();
    setSettingHours(0);
    setSettingMinutes(0);
    setSettingSeconds(0);
  }, [reset]);

  if (phase === 'completed') {
    return (
      <div className="flex flex-col items-center gap-6 py-6 animate-flash">
        <div className="text-3xl font-bold text-amber-500 animate-pulse">
          タイムアップ！
        </div>
        <div className="font-mono text-5xl text-slate-900 dark:text-slate-50">
          00:00
        </div>
        <div className="flex gap-4">
          <Button variant="primary" onClick={dismissAlarm} ariaLabel="OK">
            OK
          </Button>
          <Button variant="danger" onClick={handleReset} ariaLabel="リセット">
            Reset
          </Button>
        </div>
      </div>
    );
  }

  if (phase === 'running') {
    const progress = totalDuration > 0 ? remaining / totalDuration : 0;

    return (
      <div className="flex flex-col items-center gap-6 py-6">
        <CircleProgress progress={progress} />
        <div
          className="font-mono text-5xl sm:text-6xl text-slate-900 dark:text-slate-50 tracking-wider"
          aria-live="polite"
          aria-label={`残り時間: ${formatCountdownTime(remaining)}`}
        >
          {formatCountdownTime(remaining)}
        </div>
        <div className="flex gap-4">
          {isRunning ? (
            <Button variant="danger" onClick={pause} ariaLabel="一時停止">
              Pause
            </Button>
          ) : (
            <Button variant="success" onClick={resume} ariaLabel="再開">
              Resume
            </Button>
          )}
          <Button variant="danger" onClick={handleReset} ariaLabel="リセット">
            Reset
          </Button>
        </div>
      </div>
    );
  }

  // Setting phase
  return (
    <div className="flex flex-col items-center gap-6 py-6">
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
        variant="success"
        disabled={totalSettingSeconds === 0}
        onClick={handleStart}
        ariaLabel="カウントダウン開始"
      >
        Start
      </Button>
    </div>
  );
}
