import React from 'react';
import { render } from '@testing-library/react';
import AnalogClock from '@/components/organisms/AnalogClock';

describe('AnalogClock', () => {
  it('renders SVG element', () => {
    const { container } = render(
      <AnalogClock hours={12} minutes={0} seconds={0} />
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('is marked as aria-hidden', () => {
    const { container } = render(
      <AnalogClock hours={12} minutes={0} seconds={0} />
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders clock face with dial circle', () => {
    const { container } = render(
      <AnalogClock hours={12} minutes={0} seconds={0} />
    );

    const circles = container.querySelectorAll('circle');
    // Dial circle + center dot = at least 2
    expect(circles.length).toBeGreaterThanOrEqual(2);
  });

  it('renders hour markers', () => {
    const { container } = render(
      <AnalogClock hours={12} minutes={0} seconds={0} />
    );

    // 12 hour markers + minute markers (48) + 3 hand lines = many lines
    const lines = container.querySelectorAll('line');
    expect(lines.length).toBeGreaterThanOrEqual(12);
  });

  it('calculates correct hour hand angle', () => {
    // 3:00 -> (3%12)*30 + 0*0.5 = 90 degrees
    const { container } = render(
      <AnalogClock hours={3} minutes={0} seconds={0} />
    );

    const hourHand = container.querySelectorAll('line[stroke-width="4"]');
    expect(hourHand.length).toBe(1);
    expect(hourHand[0].getAttribute('transform')).toContain('rotate(90');
  });

  it('calculates correct minute hand angle', () => {
    // 0:15:00 -> 15*6 + 0*0.1 = 90 degrees
    const { container } = render(
      <AnalogClock hours={0} minutes={15} seconds={0} />
    );

    const minuteHand = container.querySelectorAll('line[stroke-width="3"]');
    expect(minuteHand.length).toBe(1);
    expect(minuteHand[0].getAttribute('transform')).toContain('rotate(90');
  });

  it('calculates correct second hand angle', () => {
    // seconds=15 -> 15*6 = 90 degrees
    const { container } = render(
      <AnalogClock hours={0} minutes={0} seconds={15} />
    );

    const secondHand = container.querySelectorAll('line[stroke-width="1.5"]');
    expect(secondHand.length).toBe(1);
    expect(secondHand[0].getAttribute('transform')).toContain('rotate(90');
  });
});
