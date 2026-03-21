import React from 'react';
import { render, screen } from '@testing-library/react';
import LapList from '@/components/molecules/LapList';
import type { Lap } from '@/types';

describe('LapList', () => {
  it('renders empty table when no laps', () => {
    render(<LapList laps={[]} />);

    expect(screen.getByText('#')).toBeInTheDocument();
    expect(screen.getByText('Lap')).toBeInTheDocument();
    expect(screen.getByText('Total')).toBeInTheDocument();
  });

  it('renders a single lap', () => {
    const laps: Lap[] = [
      { number: 1, lapTime: 5000, totalTime: 5000 },
    ];

    render(<LapList laps={laps} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    // 5000ms = 00:05.000
    expect(screen.getAllByText('00:05.000')).toHaveLength(2);
  });

  it('renders two laps without highlighting', () => {
    const laps: Lap[] = [
      { number: 2, lapTime: 3000, totalTime: 8000 },
      { number: 1, lapTime: 5000, totalTime: 5000 },
    ];

    render(<LapList laps={laps} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    // No green/red highlighting with fewer than 3 laps
    const rows = screen.getAllByRole('row');
    // header row + 2 data rows = 3
    expect(rows).toHaveLength(3);
    rows.slice(1).forEach((row) => {
      expect(row.className).not.toContain('text-green-500');
      expect(row.className).not.toContain('text-red-500');
    });
  });

  it('highlights fastest (green) and slowest (red) laps with 3+ laps', () => {
    const laps: Lap[] = [
      { number: 3, lapTime: 2000, totalTime: 12000 },  // fastest
      { number: 2, lapTime: 3000, totalTime: 10000 },
      { number: 1, lapTime: 7000, totalTime: 7000 },   // slowest
    ];

    render(<LapList laps={laps} />);

    const rows = screen.getAllByRole('row');
    // header + 3 data rows
    expect(rows).toHaveLength(4);

    // First data row (index 0 in laps = lap 3, fastest) should be green
    expect(rows[1].className).toContain('text-green-500');

    // Third data row (index 2 in laps = lap 1, slowest) should be red
    expect(rows[3].className).toContain('text-red-500');

    // Middle row should have default color
    expect(rows[2].className).not.toContain('text-green-500');
    expect(rows[2].className).not.toContain('text-red-500');
  });

  it('displays formatted stopwatch times for lap and total', () => {
    const laps: Lap[] = [
      { number: 1, lapTime: 65230, totalTime: 65230 },
    ];

    render(<LapList laps={laps} />);

    // 65230ms = 01:05.230
    expect(screen.getAllByText('01:05.230')).toHaveLength(2);
  });

  it('renders laps in the given order (newest first)', () => {
    const laps: Lap[] = [
      { number: 3, lapTime: 2000, totalTime: 10000 },
      { number: 2, lapTime: 3000, totalTime: 8000 },
      { number: 1, lapTime: 5000, totalTime: 5000 },
    ];

    render(<LapList laps={laps} />);

    const cells = screen.getAllByRole('cell');
    // First data cell should be lap number 3
    expect(cells[0].textContent).toBe('3');
    // Fourth data cell (second row first cell) should be lap number 2
    expect(cells[3].textContent).toBe('2');
  });

  it('has scrollable container with max-height', () => {
    const laps: Lap[] = [
      { number: 1, lapTime: 1000, totalTime: 1000 },
    ];

    const { container } = render(<LapList laps={laps} />);

    const scrollContainer = container.firstElementChild;
    expect(scrollContainer?.className).toContain('overflow-y-auto');
    expect(scrollContainer?.className).toContain('max-h-');
  });
});
