import { renderHook, act } from '@testing-library/react';
import { useDarkMode } from '@/hooks/useDarkMode';

describe('useDarkMode', () => {
  let store: Record<string, string>;

  beforeEach(() => {
    store = {};
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(
      (key: string) => store[key] ?? null
    );
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(
      (key: string, value: string) => {
        store[key] = value;
      }
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('defaults to dark mode when stored as dark', () => {
    store['theme'] = 'dark';
    const { result } = renderHook(() => useDarkMode());

    // After useEffect runs
    act(() => {});

    expect(result.current.isDark).toBe(true);
  });

  it('reads light theme from localStorage', () => {
    store['theme'] = 'light';

    const { result } = renderHook(() => useDarkMode());

    act(() => {});

    expect(result.current.isDark).toBe(false);
  });

  it('toggles theme from dark to light', () => {
    store['theme'] = 'dark';
    const { result } = renderHook(() => useDarkMode());

    act(() => {});

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isDark).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });

  it('toggles theme from light to dark', () => {
    store['theme'] = 'light';
    const { result } = renderHook(() => useDarkMode());

    act(() => {});

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isDark).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('adds dark class to html element when dark', () => {
    store['theme'] = 'dark';
    const addSpy = jest.spyOn(document.documentElement.classList, 'add');

    renderHook(() => useDarkMode());

    act(() => {});

    expect(addSpy).toHaveBeenCalledWith('dark');
  });

  it('removes dark class when light', () => {
    store['theme'] = 'light';
    const removeSpy = jest.spyOn(document.documentElement.classList, 'remove');

    renderHook(() => useDarkMode());

    act(() => {});

    expect(removeSpy).toHaveBeenCalledWith('dark');
  });
});
