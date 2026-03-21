import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/organisms/Header';

describe('ThemeToggle (via Header)', () => {
  it('renders theme toggle button', () => {
    render(<Header isDark={true} onToggleDarkMode={jest.fn()} />);

    const button = screen.getByLabelText('\u30E9\u30A4\u30C8\u30E2\u30FC\u30C9\u306B\u5207\u308A\u66FF\u3048');
    expect(button).toBeInTheDocument();
  });

  it('shows sun icon when in dark mode (to switch to light)', () => {
    const { container } = render(
      <Header isDark={true} onToggleDarkMode={jest.fn()} />
    );

    // Sun icon has a circle element (the sun body)
    const svgCircle = container.querySelector('svg circle');
    expect(svgCircle).toBeInTheDocument();
  });

  it('shows moon icon when in light mode (to switch to dark)', () => {
    const { container } = render(
      <Header isDark={false} onToggleDarkMode={jest.fn()} />
    );

    // Moon icon has a path element
    const svgPath = container.querySelector('svg path');
    expect(svgPath).toBeInTheDocument();
  });

  it('calls onToggleDarkMode when clicked', () => {
    const toggleFn = jest.fn();
    render(<Header isDark={true} onToggleDarkMode={toggleFn} />);

    const button = screen.getByLabelText('\u30E9\u30A4\u30C8\u30E2\u30FC\u30C9\u306B\u5207\u308A\u66FF\u3048');
    fireEvent.click(button);

    expect(toggleFn).toHaveBeenCalledTimes(1);
  });

  it('has correct aria-label for light mode', () => {
    render(<Header isDark={false} onToggleDarkMode={jest.fn()} />);

    const button = screen.getByLabelText('\u30C0\u30FC\u30AF\u30E2\u30FC\u30C9\u306B\u5207\u308A\u66FF\u3048');
    expect(button).toBeInTheDocument();
  });
});
