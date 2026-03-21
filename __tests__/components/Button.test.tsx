import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '@/components/atoms/Button';

describe('Button', () => {
  it('renders children text', () => {
    render(
      <Button variant="primary" onClick={jest.fn()}>
        Click me
      </Button>
    );

    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <Button variant="primary" onClick={onClick}>
        Click
      </Button>
    );

    fireEvent.click(screen.getByText('Click'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <Button variant="primary" disabled onClick={jest.fn()}>
        Disabled
      </Button>
    );

    expect(screen.getByText('Disabled')).toBeDisabled();
  });

  it('applies success variant styles', () => {
    render(
      <Button variant="success" onClick={jest.fn()}>
        Start
      </Button>
    );

    const button = screen.getByText('Start');
    expect(button.className).toContain('bg-green-500');
  });

  it('applies danger variant styles', () => {
    render(
      <Button variant="danger" onClick={jest.fn()}>
        Stop
      </Button>
    );

    const button = screen.getByText('Stop');
    expect(button.className).toContain('bg-red-500');
  });

  it('applies ghost variant styles', () => {
    render(
      <Button variant="ghost" onClick={jest.fn()}>
        Ghost
      </Button>
    );

    const button = screen.getByText('Ghost');
    expect(button.className).toContain('bg-transparent');
  });

  it('has correct aria-label when provided', () => {
    render(
      <Button variant="primary" onClick={jest.fn()} ariaLabel="Start timer">
        Start
      </Button>
    );

    expect(screen.getByLabelText('Start timer')).toBeInTheDocument();
  });

  it('applies small size styles', () => {
    render(
      <Button variant="primary" size="sm" onClick={jest.fn()}>
        Small
      </Button>
    );

    const button = screen.getByText('Small');
    expect(button.className).toContain('text-sm');
  });

  it('applies large size styles', () => {
    render(
      <Button variant="primary" size="lg" onClick={jest.fn()}>
        Large
      </Button>
    );

    const button = screen.getByText('Large');
    expect(button.className).toContain('text-lg');
  });

  it('has min touch target size', () => {
    render(
      <Button variant="primary" onClick={jest.fn()}>
        Touch
      </Button>
    );

    const button = screen.getByText('Touch');
    expect(button.className).toContain('min-w-[44px]');
    expect(button.className).toContain('min-h-[44px]');
  });

  it('has type="button" to prevent form submission', () => {
    render(
      <Button variant="primary" onClick={jest.fn()}>
        Submit
      </Button>
    );

    const button = screen.getByText('Submit');
    expect(button).toHaveAttribute('type', 'button');
  });
});
