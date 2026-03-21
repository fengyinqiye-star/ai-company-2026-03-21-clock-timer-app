import { renderHook, act } from '@testing-library/react';
import { useCountdown } from '@/hooks/useCountdown';

// Mock audio module
jest.mock('@/lib/audio', () => ({
  playAlarm: jest.fn(),
  stopAlarm: jest.fn(),
}));

describe('useCountdown', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts in setting state', () => {
    const { result } = renderHook(() => useCountdown());

    expect(result.current.remaining).toBe(0);
    expect(result.current.totalDuration).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isCompleted).toBe(false);
  });

  it('starts countdown with given seconds', () => {
    const { result } = renderHook(() => useCountdown());

    act(() => {
      result.current.start(60);
    });

    expect(result.current.totalDuration).toBe(60);
    expect(result.current.isRunning).toBe(true);
    expect(result.current.remaining).toBe(60);
  });

  it('pauses and resumes countdown', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    const { result } = renderHook(() => useCountdown());

    act(() => {
      result.current.start(60);
    });

    act(() => {
      jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 10, 0));
      jest.advanceTimersByTime(10000);
    });

    act(() => {
      result.current.pause();
    });

    expect(result.current.isRunning).toBe(false);
    const remainingAfterPause = result.current.remaining;

    // Time passes but remaining should not change
    act(() => {
      jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 20, 0));
      jest.advanceTimersByTime(10000);
    });

    expect(result.current.remaining).toBe(remainingAfterPause);

    // Resume
    act(() => {
      result.current.resume();
    });

    expect(result.current.isRunning).toBe(true);
  });

  it('resets to initial state', () => {
    const { result } = renderHook(() => useCountdown());

    act(() => {
      result.current.start(60);
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.remaining).toBe(0);
    expect(result.current.totalDuration).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.isCompleted).toBe(false);
  });

  it('marks as completed when countdown reaches zero', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    const { result } = renderHook(() => useCountdown());

    act(() => {
      result.current.start(5);
    });

    act(() => {
      jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 6, 0));
      jest.advanceTimersByTime(6000);
    });

    expect(result.current.isCompleted).toBe(true);
    expect(result.current.remaining).toBe(0);
  });

  it('dismissAlarm clears completed state', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    const { result } = renderHook(() => useCountdown());

    act(() => {
      result.current.start(1);
    });

    act(() => {
      jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 2, 0));
      jest.advanceTimersByTime(2000);
    });

    expect(result.current.isCompleted).toBe(true);

    act(() => {
      result.current.dismissAlarm();
    });

    expect(result.current.isCompleted).toBe(false);
  });

  it('cleans up on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { result, unmount } = renderHook(() => useCountdown());

    act(() => {
      result.current.start(60);
    });

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
