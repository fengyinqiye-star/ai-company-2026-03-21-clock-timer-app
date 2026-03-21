import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimeUnit from '@/components/atoms/TimeUnit';

describe('TimeUnit', () => {
  const defaultProps = {
    value: 5,
    min: 0,
    max: 59,
    label: '分',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the current value with zero-padding', () => {
    render(<TimeUnit {...defaultProps} />);

    expect(screen.getByText('05')).toBeInTheDocument();
  });

  it('renders the label', () => {
    render(<TimeUnit {...defaultProps} />);

    expect(screen.getByText('分')).toBeInTheDocument();
  });

  it('increments value when up button is clicked', () => {
    const onChange = jest.fn();
    render(<TimeUnit {...defaultProps} onChange={onChange} />);

    const incrementButton = screen.getByLabelText('分を増やす');
    fireEvent.click(incrementButton);

    expect(onChange).toHaveBeenCalledWith(6);
  });

  it('decrements value when down button is clicked', () => {
    const onChange = jest.fn();
    render(<TimeUnit {...defaultProps} onChange={onChange} />);

    const decrementButton = screen.getByLabelText('分を減らす');
    fireEvent.click(decrementButton);

    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('wraps to min when incrementing past max', () => {
    const onChange = jest.fn();
    render(<TimeUnit {...defaultProps} value={59} onChange={onChange} />);

    const incrementButton = screen.getByLabelText('分を増やす');
    fireEvent.click(incrementButton);

    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('wraps to max when decrementing past min', () => {
    const onChange = jest.fn();
    render(<TimeUnit {...defaultProps} value={0} onChange={onChange} />);

    const decrementButton = screen.getByLabelText('分を減らす');
    fireEvent.click(decrementButton);

    expect(onChange).toHaveBeenCalledWith(59);
  });

  it('has accessible aria-labels for increment and decrement buttons', () => {
    render(<TimeUnit {...defaultProps} label="時" />);

    expect(screen.getByLabelText('時を増やす')).toBeInTheDocument();
    expect(screen.getByLabelText('時を減らす')).toBeInTheDocument();
  });

  it('has min touch target size on buttons', () => {
    render(<TimeUnit {...defaultProps} />);

    const incrementButton = screen.getByLabelText('分を増やす');
    const decrementButton = screen.getByLabelText('分を減らす');

    expect(incrementButton.className).toContain('min-w-[44px]');
    expect(incrementButton.className).toContain('min-h-[44px]');
    expect(decrementButton.className).toContain('min-w-[44px]');
    expect(decrementButton.className).toContain('min-h-[44px]');
  });
});
