import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Toggle from '@/components/atoms/Toggle';

describe('Toggle', () => {
  const defaultProps = {
    checked: false,
    onChange: jest.fn(),
    labelLeft: '24h',
    labelRight: '12h',
    ariaLabel: '時間表示切り替え',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders left and right labels', () => {
    render(<Toggle {...defaultProps} />);

    expect(screen.getByText('24h')).toBeInTheDocument();
    expect(screen.getByText('12h')).toBeInTheDocument();
  });

  it('renders with role="switch"', () => {
    render(<Toggle {...defaultProps} />);

    const toggle = screen.getByRole('switch');
    expect(toggle).toBeInTheDocument();
  });

  it('sets aria-checked to false when unchecked', () => {
    render(<Toggle {...defaultProps} checked={false} />);

    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'false');
  });

  it('sets aria-checked to true when checked', () => {
    render(<Toggle {...defaultProps} checked={true} />);

    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-checked', 'true');
  });

  it('calls onChange with true when clicking unchecked toggle', () => {
    const onChange = jest.fn();
    render(<Toggle {...defaultProps} checked={false} onChange={onChange} />);

    fireEvent.click(screen.getByRole('switch'));

    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('calls onChange with false when clicking checked toggle', () => {
    const onChange = jest.fn();
    render(<Toggle {...defaultProps} checked={true} onChange={onChange} />);

    fireEvent.click(screen.getByRole('switch'));

    expect(onChange).toHaveBeenCalledWith(false);
  });

  it('has correct aria-label', () => {
    render(<Toggle {...defaultProps} />);

    const toggle = screen.getByRole('switch');
    expect(toggle).toHaveAttribute('aria-label', '時間表示切り替え');
  });

  it('highlights active label with bold style', () => {
    const { rerender } = render(<Toggle {...defaultProps} checked={false} />);

    // When unchecked, left label should be highlighted
    const leftLabel = screen.getByText('24h');
    expect(leftLabel.className).toContain('font-medium');

    const rightLabel = screen.getByText('12h');
    expect(rightLabel.className).not.toContain('font-medium');

    // When checked, right label should be highlighted
    rerender(<Toggle {...defaultProps} checked={true} />);

    const leftLabel2 = screen.getByText('24h');
    expect(leftLabel2.className).not.toContain('font-medium');

    const rightLabel2 = screen.getByText('12h');
    expect(rightLabel2.className).toContain('font-medium');
  });
});
