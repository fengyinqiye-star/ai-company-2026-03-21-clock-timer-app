import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StopwatchPanel from '@/components/organisms/StopwatchPanel';

describe('StopwatchPanel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders initial stopwatch display', () => {
    render(<StopwatchPanel />);

    expect(screen.getByText('00:00.000')).toBeInTheDocument();
  });

  it('shows Start button in idle state', () => {
    render(<StopwatchPanel />);

    expect(screen.getByText('Start')).toBeInTheDocument();
  });

  it('shows Stop and Lap buttons when running', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    render(<StopwatchPanel />);

    fireEvent.click(screen.getByText('Start'));

    expect(screen.getByText('Stop')).toBeInTheDocument();
    expect(screen.getByText('Lap')).toBeInTheDocument();
  });

  it('shows Resume and Reset buttons when paused', () => {
    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 0, 0));
    render(<StopwatchPanel />);

    fireEvent.click(screen.getByText('Start'));

    jest.setSystemTime(new Date(2026, 0, 1, 0, 0, 1, 0));
    jest.advanceTimersByTime(1000);

    fireEvent.click(screen.getByText('Stop'));

    expect(screen.getByText('Resume')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

  it('has aria-live region for elapsed time', () => {
    render(<StopwatchPanel />);

    const display = screen.getByLabelText(/経過時間/);
    expect(display).toHaveAttribute('aria-live', 'polite');
  });
});
