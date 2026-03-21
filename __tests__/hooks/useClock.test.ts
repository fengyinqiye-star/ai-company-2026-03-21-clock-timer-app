import { renderHook, act } from '@testing-library/react';
import { useClock } from '@/hooks/useClock';

describe('useClock', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('returns current hours, minutes, seconds, and date', () => {
    const mockDate = new Date(2026, 2, 22, 14, 30, 45);
    jest.setSystemTime(mockDate);

    const { result } = renderHook(() => useClock());

    expect(result.current.hours).toBe(14);
    expect(result.current.minutes).toBe(30);
    expect(result.current.seconds).toBe(45);
    expect(result.current.date).toBeInstanceOf(Date);
  });

  it('updates when timer fires', () => {
    jest.setSystemTime(new Date(2026, 2, 22, 14, 30, 0, 0));

    const { result } = renderHook(() => useClock());

    const initialSeconds = result.current.seconds;

    // Advance system clock and run pending timers one step at a time
    act(() => {
      jest.setSystemTime(new Date(2026, 2, 22, 14, 30, 1, 0));
      jest.runOnlyPendingTimers();
    });

    // The hook should have updated to the new system time
    expect(result.current.seconds).not.toBe(initialSeconds);
  });

  it('cleans up timer on unmount', () => {
    const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    const { unmount } = renderHook(() => useClock());

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('returns date object for date display', () => {
    const mockDate = new Date(2026, 2, 22, 10, 0, 0);
    jest.setSystemTime(mockDate);

    const { result } = renderHook(() => useClock());

    expect(result.current.date.getFullYear()).toBe(2026);
    expect(result.current.date.getMonth()).toBe(2);
    expect(result.current.date.getDate()).toBe(22);
  });

  it('provides hour values in 24h format', () => {
    jest.setSystemTime(new Date(2026, 2, 22, 23, 59, 59));

    const { result } = renderHook(() => useClock());

    expect(result.current.hours).toBe(23);
    expect(result.current.minutes).toBe(59);
    expect(result.current.seconds).toBe(59);
  });
});
