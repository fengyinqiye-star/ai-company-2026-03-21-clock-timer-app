import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TabBar from '@/components/molecules/TabBar';

describe('TabBar', () => {
  const defaultProps = {
    activeTab: 'clock' as const,
    onTabChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all three tabs', () => {
    render(<TabBar {...defaultProps} />);

    expect(screen.getByText('Clock')).toBeInTheDocument();
    expect(screen.getByText('Stopwatch')).toBeInTheDocument();
    expect(screen.getByText('Timer')).toBeInTheDocument();
  });

  it('sets aria-selected on active tab', () => {
    render(<TabBar {...defaultProps} activeTab="stopwatch" />);

    const stopwatchTab = screen.getByText('Stopwatch');
    expect(stopwatchTab).toHaveAttribute('aria-selected', 'true');

    const clockTab = screen.getByText('Clock');
    expect(clockTab).toHaveAttribute('aria-selected', 'false');
  });

  it('has role="tablist"', () => {
    render(<TabBar {...defaultProps} />);

    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('tabs have role="tab"', () => {
    render(<TabBar {...defaultProps} />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
  });

  it('calls onTabChange when tab is clicked', () => {
    const onTabChange = jest.fn();
    render(<TabBar {...defaultProps} onTabChange={onTabChange} />);

    fireEvent.click(screen.getByText('Timer'));

    expect(onTabChange).toHaveBeenCalledWith('timer');
  });

  it('sets tabIndex=0 on active tab and -1 on others', () => {
    render(<TabBar {...defaultProps} activeTab="clock" />);

    const clockTab = screen.getByText('Clock');
    expect(clockTab).toHaveAttribute('tabindex', '0');

    const stopwatchTab = screen.getByText('Stopwatch');
    expect(stopwatchTab).toHaveAttribute('tabindex', '-1');

    const timerTab = screen.getByText('Timer');
    expect(timerTab).toHaveAttribute('tabindex', '-1');
  });

  it('has min touch target size', () => {
    render(<TabBar {...defaultProps} />);

    const tabs = screen.getAllByRole('tab');
    tabs.forEach((tab) => {
      expect(tab.className).toContain('min-h-[44px]');
    });
  });
});
