import { renderHook, act } from '@testing-library/react';
import { useStopwatch } from '@/hooks/useStopwatch';

describe('useStopwatch', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('starts in idle state', () => {
    const { result } = renderHook(() => useStopwatch());

    expect(result.current.elapsed).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.laps).toEqual([]);
  });

  it('starts counting when start is called', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    expect(result.current.isRunning).toBe(true);

    act(() => {
      jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 1, 0));
      jest.advanceTimersByTime(1000);
    });

    expect(result.current.elapsed).toBeGreaterThan(0);
  });

  it('stops counting when stop is called', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 1, 0));
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.stop();
    });

    expect(result.current.isRunning).toBe(false);
    const elapsedAfterStop = result.current.elapsed;

    act(() => {
      jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 5, 0));
      jest.advanceTimersByTime(4000);
    });

    // Elapsed should not change after stop
    expect(result.current.elapsed).toBe(elapsedAfterStop);
  });

  it('resets to initial state', () => {
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.stop();
    });

    act(() => {
      result.current.reset();
    });

    expect(result.current.elapsed).toBe(0);
    expect(result.current.isRunning).toBe(false);
    expect(result.current.laps).toEqual([]);
  });

  it('records lap times', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    const { result } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    act(() => {
      jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 1, 0));
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      result.current.lap();
    });

    expect(result.current.laps).toHaveLength(1);
    expect(result.current.laps[0].number).toBe(1);
    expect(result.current.laps[0].totalTime).toBeGreaterThan(0);
  });

  it('cleans up interval on unmount', () => {
    const clearIntervalSpy = jest.spyOn(global, 'clearInterval');
    const { result, unmount } = renderHook(() => useStopwatch());

    act(() => {
      result.current.start();
    });

    unmount();

    expect(clearIntervalSpy).toHaveBeenCalled();
    clearIntervalSpy.mockRestore();
  });
});
