export type TabId = 'clock' | 'stopwatch' | 'timer';

export interface Lap {
  number: number;
  lapTime: number;    // ms (difference from previous lap)
  totalTime: number;  // ms (total elapsed time)
}

export interface ClockState {
  hours: number;      // 0-23
  minutes: number;    // 0-59
  seconds: number;    // 0-59
  date: Date;
}

export interface StopwatchState {
  elapsed: number;          // ms
  isRunning: boolean;
  laps: Lap[];
  start: () => void;
  stop: () => void;
  reset: () => void;
  lap: () => void;
}

export interface CountdownState {
  remaining: number;        // seconds
  totalDuration: number;    // seconds
  isRunning: boolean;
  isCompleted: boolean;
  start: (seconds: number) => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  dismissAlarm: () => void;
}

export interface DarkModeState {
  isDark: boolean;
  toggle: () => void;
}
