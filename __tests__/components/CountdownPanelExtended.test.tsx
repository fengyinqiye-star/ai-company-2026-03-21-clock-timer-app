import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import CountdownPanel from '@/components/organisms/CountdownPanel';

jest.mock('@/lib/audio', () => ({
  playAlarm: jest.fn(),
  stopAlarm: jest.fn(),
}));

describe('CountdownPanel - extended', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('selects preset and updates time setter display', () => {
    render(<CountdownPanel />);

    fireEvent.click(screen.getByText('5分'));

    // 5 minutes = 300 seconds -> hours=0, minutes=5, seconds=0
    expect(screen.getByText('05')).toBeInTheDocument();
  });

  it('shows completed phase when countdown finishes', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    render(<CountdownPanel />);

    // Set 1 minute
    const incrementMinuteButton = screen.getByLabelText('分を増やす');
    fireEvent.click(incrementMinuteButton);

    // Start countdown
    fireEvent.click(screen.getByText('Start'));

    // Advance past the countdown duration
    act(() => {
      jest.setSystemTime(new Date(2026, 0, 1, 0, 1, 1, 0));
      jest.advanceTimersByTime(61000);
    });

    // Should show completed state
    expect(screen.getByText('タイムアップ！')).toBeInTheDocument();
    expect(screen.getByText('OK')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('dismisses alarm by clicking OK', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    render(<CountdownPanel />);

    const incrementMinuteButton = screen.getByLabelText('分を増やす');
    fireEvent.click(incrementMinuteButton);
    fireEvent.click(screen.getByText('Start'));

    act(() => {
      jest.setSystemTime(new Date(2026, 0, 1, 0, 1, 1, 0));
      jest.advanceTimersByTime(61000);
    });

    expect(screen.getByText('タイムアップ！')).toBeInTheDocument();

    fireEvent.click(screen.getByText('OK'));

    // After dismiss, should return to setting phase
    expect(screen.queryByText('タイムアップ！')).not.toBeInTheDocument();
  });

  it('resets from completed phase', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    render(<CountdownPanel />);

    const incrementMinuteButton = screen.getByLabelText('分を増やす');
    fireEvent.click(incrementMinuteButton);
    fireEvent.click(screen.getByText('Start'));

    act(() => {
      jest.setSystemTime(new Date(2026, 0, 1, 0, 1, 1, 0));
      jest.advanceTimersByTime(61000);
    });

    fireEvent.click(screen.getByText('Reset'));

    // Should return to setting phase
    expect(screen.getByText('時')).toBeInTheDocument();
    expect(screen.getByText('分')).toBeInTheDocument();
    expect(screen.getByText('秒')).toBeInTheDocument();
  });

  it('shows Pause and Resume during countdown', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    render(<CountdownPanel />);

    const incrementMinuteButton = screen.getByLabelText('分を増やす');
    fireEvent.click(incrementMinuteButton);
    fireEvent.click(screen.getByText('Start'));

    // Should show Pause
    expect(screen.getByText('Pause')).toBeInTheDocument();

    // Pause the countdown
    fireEvent.click(screen.getByText('Pause'));

    // Should show Resume
    expect(screen.getByText('Resume')).toBeInTheDocument();

    // Resume
    fireEvent.click(screen.getByText('Resume'));
    expect(screen.getByText('Pause')).toBeInTheDocument();
  });

  it('shows remaining time with aria-live during countdown', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    render(<CountdownPanel />);

    const incrementMinuteButton = screen.getByLabelText('分を増やす');
    fireEvent.click(incrementMinuteButton);
    fireEvent.click(screen.getByText('Start'));

    const display = screen.getByLabelText(/残り時間/);
    expect(display).toHaveAttribute('aria-live', 'polite');
  });

  it('renders CircleProgress during countdown', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    const { container } = render(<CountdownPanel />);

    const incrementMinuteButton = screen.getByLabelText('分を増やす');
    fireEvent.click(incrementMinuteButton);
    fireEvent.click(screen.getByText('Start'));

    // CircleProgress renders an SVG with circles
    const circles = container.querySelectorAll('svg circle');
    expect(circles.length).toBeGreaterThanOrEqual(2);
  });

  it('resets from running phase', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    render(<CountdownPanel />);

    const incrementMinuteButton = screen.getByLabelText('分を増やす');
    fireEvent.click(incrementMinuteButton);
    fireEvent.click(screen.getByText('Start'));

    fireEvent.click(screen.getByText('Reset'));

    // Should return to setting phase
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('時')).toBeInTheDocument();
  });
});
