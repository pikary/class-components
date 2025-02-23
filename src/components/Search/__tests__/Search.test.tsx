import SearchComponent from '..';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

vi.mock('../../../hooks/useQuery', () => ({
  default: vi.fn(() => ({
    query: 'initial query',
    setQuery: vi.fn(),
    handleQuerySave: vi.fn(),
  })),
}));

describe('Search COmponent test', () => {
  it('renders input and button correctly', () => {
    render(
      <MemoryRouter>
        <SearchComponent initialQuery="" handleSearch={vi.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('handles form submit event', () => {
    const handleSearchMock = vi.fn();

    render(
      <MemoryRouter>
        <SearchComponent initialQuery="Luke" handleSearch={handleSearchMock} />
      </MemoryRouter>
    );

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Luke Skywalker' } });

    const form = screen.getByTestId('search-form');
    fireEvent.submit(form);

    expect(handleSearchMock).toBeCalledTimes(1);
    expect(handleSearchMock).toBeCalledWith('Luke Skywalker');
  });
});
