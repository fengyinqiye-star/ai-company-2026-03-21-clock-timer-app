import React from 'react';
import { render } from '@testing-library/react';
import CircleProgress from '@/components/organisms/CircleProgress';

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

describe('CircleProgress', () => {
  it('renders two circles (track and progress)', () => {
    const { container } = render(<CircleProgress progress={0.5} />);

    const circles = container.querySelectorAll('circle');
    expect(circles).toHaveLength(2);
  });

  it('renders SVG element', () => {
    const { container } = render(<CircleProgress progress={1} />);

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg?.getAttribute('viewBox')).toBe('0 0 120 120');
  });

  it('shows full progress arc when progress is 1', () => {
    const { container } = render(<CircleProgress progress={1} />);

    const progressCircle = container.querySelectorAll('circle')[1];
    const offset = Number(progressCircle.getAttribute('stroke-dashoffset'));
    // Full progress = offset should be 0
    expect(offset).toBeCloseTo(0);
  });

  it('shows empty progress arc when progress is 0', () => {
    const { container } = render(<CircleProgress progress={0} />);

    const progressCircle = container.querySelectorAll('circle')[1];
    const offset = Number(progressCircle.getAttribute('stroke-dashoffset'));
    // Empty progress = offset should equal circumference
    expect(offset).toBeCloseTo(CIRCUMFERENCE);
  });

  it('shows half progress arc when progress is 0.5', () => {
    const { container } = render(<CircleProgress progress={0.5} />);

    const progressCircle = container.querySelectorAll('circle')[1];
    const offset = Number(progressCircle.getAttribute('stroke-dashoffset'));
    expect(offset).toBeCloseTo(CIRCUMFERENCE * 0.5);
  });

  it('clamps progress to 0 when negative', () => {
    const { container } = render(<CircleProgress progress={-0.5} />);

    const progressCircle = container.querySelectorAll('circle')[1];
    const offset = Number(progressCircle.getAttribute('stroke-dashoffset'));
    // Clamped to 0, so offset = full circumference
    expect(offset).toBeCloseTo(CIRCUMFERENCE);
  });

  it('clamps progress to 1 when greater than 1', () => {
    const { container } = render(<CircleProgress progress={1.5} />);

    const progressCircle = container.querySelectorAll('circle')[1];
    const offset = Number(progressCircle.getAttribute('stroke-dashoffset'));
    // Clamped to 1, so offset = 0
    expect(offset).toBeCloseTo(0);
  });

  it('sets stroke-dasharray to circumference', () => {
    const { container } = render(<CircleProgress progress={0.5} />);

    const progressCircle = container.querySelectorAll('circle')[1];
    const dashArray = Number(progressCircle.getAttribute('stroke-dasharray'));
    expect(dashArray).toBeCloseTo(CIRCUMFERENCE);
  });
});
