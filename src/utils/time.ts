/**
 * Pad a number with leading zeros
 */
export function padZero(n: number, digits: number = 2): string {
  return String(Math.floor(n)).padStart(digits, '0');
}

/**
 * Format stopwatch elapsed time
 * @param ms - elapsed milliseconds
 * @returns "MM:SS.mmm" or "HH:MM:SS.mmm" (when >= 1 hour)
 */
export function formatStopwatchTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const milliseconds = ms % 1000;
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  if (hours > 0) {
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 3)}`;
  }
  return `${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds, 3)}`;
}

/**
 * Format countdown remaining time
 * @param seconds - remaining seconds (can be fractional)
 * @returns "MM:SS" or "HH:MM:SS" (when >= 1 hour)
 */
export function formatCountdownTime(seconds: number): string {
  const totalSeconds = Math.ceil(seconds);
  const s = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const m = totalMinutes % 60;
  const h = Math.floor(totalMinutes / 60);

  if (h > 0) {
    return `${padZero(h)}:${padZero(m)}:${padZero(s)}`;
  }
  return `${padZero(m)}:${padZero(s)}`;
}

/**
 * Format digital clock time
 * @returns object with formatted time string and optional period (AM/PM)
 */
export function formatClockTime(
  hours: number,
  minutes: number,
  seconds: number,
  is24h: boolean
): { time: string; period?: 'AM' | 'PM' } {
  if (is24h) {
    return {
      time: `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`,
    };
  }

  const period: 'AM' | 'PM' = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  return {
    time: `${padZero(h12)}:${padZero(minutes)}:${padZero(seconds)}`,
    period,
  };
}

/**
 * Format date in Japanese style
 * @returns "YYYY年MM月DD日（曜日）"
 */
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = padZero(date.getMonth() + 1);
  const day = padZero(date.getDate());
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const weekday = weekdays[date.getDay()];

  return `${year}年${month}月${day}日（${weekday}）`;
}
