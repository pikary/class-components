import SearchComponent from '..';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

describe('Search COmponent test', () => {
  it('renders input and button correctly', () => {
    render(
      <MemoryRouter>
        <SearchComponent query="" setQuery={vi.fn()} handleSearch={vi.fn()} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('updates value when user types to input', () => {
    const setQuery = vi.fn();
    render(
      <MemoryRouter>
        <SearchComponent query="" setQuery={setQuery} handleSearch={vi.fn()} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'Luke Skywalker' },
    });

    expect(setQuery).toHaveBeenCalledWith('Luke Skywalker');
  });

  it('handles form submit event', () => {
    const handleSearchMock = vi.fn();
    render(
      <MemoryRouter>
        <SearchComponent
          query="Luke Skywalker"
          setQuery={vi.fn()}
          handleSearch={handleSearchMock}
        />
      </MemoryRouter>
    );
    const form = screen.getByTestId('search-form');
    fireEvent.submit(form);
    expect(handleSearchMock).toBeCalled();
    expect(handleSearchMock).toBeCalledWith('Luke Skywalker');
  });
});
