import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountdownPanel from '@/components/organisms/CountdownPanel';

// Mock audio module
jest.mock('@/lib/audio', () => ({
  playAlarm: jest.fn(),
  stopAlarm: jest.fn(),
}));

describe('CountdownPanel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders time setter in setting phase', () => {
    render(<CountdownPanel />);

    // Should show time unit labels
    expect(screen.getByText('\u6642')).toBeInTheDocument();
    expect(screen.getByText('\u5206')).toBeInTheDocument();
    expect(screen.getByText('\u79D2')).toBeInTheDocument();
  });

  it('shows Start button', () => {
    render(<CountdownPanel />);

    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('Start button is disabled when total time is zero', () => {
    render(<CountdownPanel />);

    const startButton = screen.getByLabelText('\u30AB\u30A6\u30F3\u30C8\u30C0\u30A6\u30F3\u958B\u59CB');
    expect(startButton).toBeDisabled();
  });

  it('renders preset buttons', () => {
    render(<CountdownPanel />);

    expect(screen.getByText('1\u5206')).toBeInTheDocument();
    expect(screen.getByText('5\u5206')).toBeInTheDocument();
    expect(screen.getByText('10\u5206')).toBeInTheDocument();
  });

  it('shows Pause and Reset during countdown', () => {
    render(<CountdownPanel />);

    // Increment minutes to set a non-zero time
    const incrementMinuteButton = screen.getByLabelText('\u5206\u3092\u5897\u3084\u3059');
    fireEvent.click(incrementMinuteButton);

    fireEvent.click(screen.getByText('Start'));

    expect(screen.getByText('Pause')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });
});
