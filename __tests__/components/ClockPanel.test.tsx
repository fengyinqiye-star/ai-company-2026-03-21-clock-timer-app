import React from 'react';
import { render, screen } from '@testing-library/react';
import ClockPanel from '@/components/organisms/ClockPanel';

describe('ClockPanel', () => {
  it('renders analog clock, digital clock, and date display', () => {
    const date = new Date(2026, 2, 22, 14, 30, 45);
    const { container } = render(
      <ClockPanel hours={14} minutes={30} seconds={45} date={date} />
    );

    // Analog clock (SVG)
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    // Digital clock time
    expect(screen.getByText(/14:30:45/)).toBeInTheDocument();

    // Date display
    expect(screen.getByText(/2026年03月22日/)).toBeInTheDocument();
  });

  it('passes correct props to analog clock (check hand rotation)', () => {
    const date = new Date(2026, 2, 22, 3, 0, 0);
    const { container } = render(
      <ClockPanel hours={3} minutes={0} seconds={0} date={date} />
    );

    // Hour hand at 3:00 should be rotate(90)
    const hourHand = container.querySelector('line[stroke-width="4"]');
    expect(hourHand?.getAttribute('transform')).toContain('rotate(90');
  });
});
