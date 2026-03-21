import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DigitalClock from '@/components/molecules/DigitalClock';
import { STORAGE_KEY_TIME_FORMAT } from '@/lib/constants';

describe('DigitalClock', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders time in 24h format by default', () => {
    render(<DigitalClock hours={14} minutes={30} seconds={45} />);

    expect(screen.getByText(/14:30:45/)).toBeInTheDocument();
  });

  it('does not show AM/PM in 24h mode', () => {
    render(<DigitalClock hours={14} minutes={30} seconds={45} />);

    expect(screen.queryByText('AM')).not.toBeInTheDocument();
    expect(screen.queryByText('PM')).not.toBeInTheDocument();
  });

  it('switches to 12h format when toggle is clicked', () => {
    render(<DigitalClock hours={14} minutes={30} seconds={45} />);

    // The toggle switch has role="switch"
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);

    expect(screen.getByText(/02:30:45/)).toBeInTheDocument();
    expect(screen.getByText('PM')).toBeInTheDocument();
  });

  it('shows AM for morning hours in 12h mode', () => {
    render(<DigitalClock hours={9} minutes={15} seconds={0} />);

    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);

    expect(screen.getByText(/09:15:00/)).toBeInTheDocument();
    expect(screen.getByText('AM')).toBeInTheDocument();
  });

  it('displays midnight as 12:00:00 AM in 12h mode', () => {
    render(<DigitalClock hours={0} minutes={0} seconds={0} />);

    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);

    expect(screen.getByText(/12:00:00/)).toBeInTheDocument();
    expect(screen.getByText('AM')).toBeInTheDocument();
  });

  it('has aria-live region for accessibility', () => {
    render(<DigitalClock hours={10} minutes={0} seconds={0} />);

    const display = screen.getByLabelText(/現在時刻/);
    expect(display).toHaveAttribute('aria-live', 'polite');
  });

  it('shows 24h and 12h toggle labels', () => {
    render(<DigitalClock hours={10} minutes={0} seconds={0} />);

    expect(screen.getByText('24h')).toBeInTheDocument();
    expect(screen.getByText('12h')).toBeInTheDocument();
  });

  it('saves time format to localStorage when toggled', () => {
    render(<DigitalClock hours={14} minutes={30} seconds={45} />);

    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);

    expect(localStorage.getItem(STORAGE_KEY_TIME_FORMAT)).toBe('12h');
  });

  it('restores 12h format from localStorage', () => {
    localStorage.setItem(STORAGE_KEY_TIME_FORMAT, '12h');

    render(<DigitalClock hours={14} minutes={30} seconds={45} />);

    expect(screen.getByText(/02:30:45/)).toBeInTheDocument();
    expect(screen.getByText('PM')).toBeInTheDocument();
  });
});
