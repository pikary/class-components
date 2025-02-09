import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import SearchPage from '../SearchPage';
import { getCharacters } from '../../api/baseApi';
import { MemoryRouter } from 'react-router-dom';
// Mock API function
vi.mock('../../api/baseApi', () => ({
  getCharacters: vi.fn(),
}));

describe('SearchPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input and button', () => {
    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('displays loading spinner when searching', async () => {
    (getCharacters as vi.Mock).mockResolvedValue({ results: [] });

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'Luke' },
    });

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  it('renders character results after a search', async () => {
    (getCharacters as vi.Mock).mockResolvedValue({
      results: [
        {
          url: 'https://swapi.dev/api/people/1/',
          name: 'Luke Skywalker',
          height: '172',
          mass: '77',
          gender: 'male',
          birth_year: '19BBY',
          films: ['Film 1', 'Film 2'],
        },
      ],
    });

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByTestId('search-input'), {
      target: { value: 'Luke' },
    });

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });
  });
});
