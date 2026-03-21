import type { TabId } from '@/types';

/** localStorage keys */
export const STORAGE_KEY_THEME = 'theme';
export const STORAGE_KEY_TIME_FORMAT = 'clock-app-time-format';

/** Timer update intervals (ms) */
export const CLOCK_TICK_INTERVAL = 1000;
export const STOPWATCH_TICK_INTERVAL = 10;
export const COUNTDOWN_TICK_INTERVAL = 1000;

/** Alarm frequency */
export const ALARM_FREQUENCY = 800;
export const ALARM_GAIN = 0.3;
export const ALARM_BLINK_INTERVAL = 200;

/** Tab definitions */
export const TABS: { id: TabId; label: string }[] = [
  { id: 'clock', label: 'Clock' },
  { id: 'stopwatch', label: 'Stopwatch' },
  { id: 'timer', label: 'Timer' },
];

/** Timer presets (seconds) */
export const TIMER_PRESETS = [
  { seconds: 60, label: '1\u5206' },
  { seconds: 180, label: '3\u5206' },
  { seconds: 300, label: '5\u5206' },
  { seconds: 600, label: '10\u5206' },
  { seconds: 900, label: '15\u5206' },
  { seconds: 1800, label: '30\u5206' },
] as const;
