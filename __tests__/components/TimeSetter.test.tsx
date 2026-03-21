import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimeSetter from '@/components/molecules/TimeSetter';

describe('TimeSetter', () => {
  const defaultProps = {
    hours: 0,
    minutes: 5,
    seconds: 30,
    onChangeHours: jest.fn(),
    onChangeMinutes: jest.fn(),
    onChangeSeconds: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders three TimeUnit components with labels', () => {
    render(<TimeSetter {...defaultProps} />);

    expect(screen.getByText('時')).toBeInTheDocument();
    expect(screen.getByText('分')).toBeInTheDocument();
    expect(screen.getByText('秒')).toBeInTheDocument();
  });

  it('displays current values', () => {
    render(<TimeSetter {...defaultProps} />);

    expect(screen.getByText('00')).toBeInTheDocument(); // hours
    expect(screen.getByText('05')).toBeInTheDocument(); // minutes
    expect(screen.getByText('30')).toBeInTheDocument(); // seconds
  });

  it('renders colon separators', () => {
    const { container } = render(<TimeSetter {...defaultProps} />);

    const colons = container.querySelectorAll('span');
    // Filter to colons only
    const colonElements = Array.from(colons).filter(
      (el) => el.textContent === ':'
    );
    expect(colonElements).toHaveLength(2);
  });

  it('calls onChangeHours when hours increment is clicked', () => {
    const onChangeHours = jest.fn();
    render(<TimeSetter {...defaultProps} onChangeHours={onChangeHours} />);

    const incrementButton = screen.getByLabelText('時を増やす');
    fireEvent.click(incrementButton);

    expect(onChangeHours).toHaveBeenCalledWith(1);
  });

  it('calls onChangeMinutes when minutes increment is clicked', () => {
    const onChangeMinutes = jest.fn();
    render(<TimeSetter {...defaultProps} onChangeMinutes={onChangeMinutes} />);

    const incrementButton = screen.getByLabelText('分を増やす');
    fireEvent.click(incrementButton);

    expect(onChangeMinutes).toHaveBeenCalledWith(6);
  });

  it('calls onChangeSeconds when seconds decrement is clicked', () => {
    const onChangeSeconds = jest.fn();
    render(<TimeSetter {...defaultProps} onChangeSeconds={onChangeSeconds} />);

    const decrementButton = screen.getByLabelText('秒を減らす');
    fireEvent.click(decrementButton);

    expect(onChangeSeconds).toHaveBeenCalledWith(29);
  });
});
