import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from '../NotFound';

describe('NotFound Component', () => {
  it('renders the Page Not Found message', () => {
    render(<NotFound />);
    expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
  });
});
