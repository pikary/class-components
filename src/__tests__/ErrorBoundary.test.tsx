import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

describe('ErrorBoundary Component', () => {
  const ComponentError = () => {
    throw new Error('Test Error');
  };

  it('catches errors and displays the fallback UI', () => {
    render(
      <ErrorBoundary>
        <ComponentError />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong!/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Error/i)).toBeInTheDocument();
  });
});
