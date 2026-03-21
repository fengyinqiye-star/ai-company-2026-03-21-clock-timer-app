import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PresetButtons from '@/components/molecules/PresetButtons';

describe('PresetButtons', () => {
  it('renders all preset buttons', () => {
    render(<PresetButtons onSelect={jest.fn()} />);

    expect(screen.getByText('1分')).toBeInTheDocument();
    expect(screen.getByText('3分')).toBeInTheDocument();
    expect(screen.getByText('5分')).toBeInTheDocument();
    expect(screen.getByText('10分')).toBeInTheDocument();
    expect(screen.getByText('15分')).toBeInTheDocument();
    expect(screen.getByText('30分')).toBeInTheDocument();
  });

  it('calls onSelect with correct seconds when 1分 is clicked', () => {
    const onSelect = jest.fn();
    render(<PresetButtons onSelect={onSelect} />);

    fireEvent.click(screen.getByText('1分'));

    expect(onSelect).toHaveBeenCalledWith(60);
  });

  it('calls onSelect with correct seconds when 5分 is clicked', () => {
    const onSelect = jest.fn();
    render(<PresetButtons onSelect={onSelect} />);

    fireEvent.click(screen.getByText('5分'));

    expect(onSelect).toHaveBeenCalledWith(300);
  });

  it('calls onSelect with correct seconds when 30分 is clicked', () => {
    const onSelect = jest.fn();
    render(<PresetButtons onSelect={onSelect} />);

    fireEvent.click(screen.getByText('30分'));

    expect(onSelect).toHaveBeenCalledWith(1800);
  });

  it('has accessible aria-labels on preset buttons', () => {
    render(<PresetButtons onSelect={jest.fn()} />);

    expect(screen.getByLabelText('1分にセット')).toBeInTheDocument();
    expect(screen.getByLabelText('5分にセット')).toBeInTheDocument();
    expect(screen.getByLabelText('30分にセット')).toBeInTheDocument();
  });
});
