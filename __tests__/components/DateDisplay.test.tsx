import React from 'react';
import { render, screen } from '@testing-library/react';
import DateDisplay from '@/components/molecules/DateDisplay';

describe('DateDisplay', () => {
  it('renders formatted date in Japanese style', () => {
    const date = new Date(2026, 2, 22); // 2026-03-22, Sunday
    render(<DateDisplay date={date} />);

    expect(screen.getByText('2026年03月22日（日）')).toBeInTheDocument();
  });

  it('renders date with padded month and day', () => {
    const date = new Date(2026, 0, 5); // 2026-01-05, Monday
    render(<DateDisplay date={date} />);

    expect(screen.getByText(/01月05日/)).toBeInTheDocument();
  });

  it('renders different weekdays correctly', () => {
    // 2026-03-21 is Saturday
    const saturday = new Date(2026, 2, 21);
    const { rerender } = render(<DateDisplay date={saturday} />);

    expect(screen.getByText(/（土）/)).toBeInTheDocument();

    // 2026-03-23 is Monday
    const monday = new Date(2026, 2, 23);
    rerender(<DateDisplay date={monday} />);

    expect(screen.getByText(/（月）/)).toBeInTheDocument();
  });
});
