import { render, screen } from '@testing-library/react';
import Spinner from '../index';
import { describe, it, expect } from 'vitest';

describe('Spinner Component', () => {
  it('renders without crashing', () => {
    render(<Spinner />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
  });

  it('applies custom className if provided', () => {
    const customClass = 'custom-spinner';
    render(<Spinner className={customClass} />);
    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toHaveClass('lds-ring');
    expect(spinnerElement).toHaveClass(customClass);
  });
});
