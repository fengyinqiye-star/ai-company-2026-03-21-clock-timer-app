import {
  padZero,
  formatStopwatchTime,
  formatCountdownTime,
  formatClockTime,
  formatDate,
} from '@/utils/time';

describe('padZero', () => {
  it('pads single digit with leading zero', () => {
    expect(padZero(5)).toBe('05');
  });

  it('does not pad two-digit number', () => {
    expect(padZero(12)).toBe('12');
  });

  it('pads with specified number of digits', () => {
    expect(padZero(5, 3)).toBe('005');
  });

  it('handles zero', () => {
    expect(padZero(0)).toBe('00');
  });

  it('floors fractional numbers', () => {
    expect(padZero(3.7)).toBe('03');
  });
});

describe('formatStopwatchTime', () => {
  it('formats zero milliseconds', () => {
    expect(formatStopwatchTime(0)).toBe('00:00.000');
  });

  it('formats seconds and milliseconds', () => {
    expect(formatStopwatchTime(5230)).toBe('00:05.230');
  });

  it('formats minutes and seconds', () => {
    expect(formatStopwatchTime(125000)).toBe('02:05.000');
  });

  it('includes hours when >= 1 hour', () => {
    // 1 hour, 2 minutes, 3 seconds, 450ms
    const ms = 3600000 + 120000 + 3000 + 450;
    expect(formatStopwatchTime(ms)).toBe('01:02:03.450');
  });

  it('handles exact hour', () => {
    expect(formatStopwatchTime(3600000)).toBe('01:00:00.000');
  });
});

describe('formatCountdownTime', () => {
  it('formats zero seconds', () => {
    expect(formatCountdownTime(0)).toBe('00:00');
  });

  it('formats seconds only', () => {
    expect(formatCountdownTime(45)).toBe('00:45');
  });

  it('formats minutes and seconds', () => {
    expect(formatCountdownTime(125)).toBe('02:05');
  });

  it('includes hours when >= 1 hour', () => {
    expect(formatCountdownTime(3723)).toBe('01:02:03');
  });

  it('rounds up fractional seconds', () => {
    expect(formatCountdownTime(59.3)).toBe('01:00');
  });
});

describe('formatClockTime', () => {
  it('formats 24h time', () => {
    const result = formatClockTime(14, 5, 9, true);
    expect(result.time).toBe('14:05:09');
    expect(result.period).toBeUndefined();
  });

  it('formats 12h PM time', () => {
    const result = formatClockTime(14, 30, 0, false);
    expect(result.time).toBe('02:30:00');
    expect(result.period).toBe('PM');
  });

  it('formats 12h AM time', () => {
    const result = formatClockTime(9, 15, 30, false);
    expect(result.time).toBe('09:15:30');
    expect(result.period).toBe('AM');
  });

  it('formats midnight as 12 in 12h mode', () => {
    const result = formatClockTime(0, 0, 0, false);
    expect(result.time).toBe('12:00:00');
    expect(result.period).toBe('AM');
  });

  it('formats noon as 12 PM', () => {
    const result = formatClockTime(12, 0, 0, false);
    expect(result.time).toBe('12:00:00');
    expect(result.period).toBe('PM');
  });
});

describe('formatDate', () => {
  it('formats date in Japanese style', () => {
    // 2026-03-22 is a Sunday
    const date = new Date(2026, 2, 22); // months are 0-indexed
    const result = formatDate(date);
    expect(result).toBe('2026\u5E7403\u670822\u65E5\uFF08\u65E5\uFF09');
  });

  it('pads single-digit month and day', () => {
    const date = new Date(2026, 0, 5); // January 5
    const result = formatDate(date);
    expect(result).toContain('01\u670805\u65E5');
  });
});
