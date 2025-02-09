import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import SearchPage from '../SearchPage';
import { getCharacters } from '../../api/baseApi';
import mockCharacter from '../../components/CharacterDetails/__mocks__/details';
vi.mock('../../api/baseApi', () => ({
  getCharacters: vi.fn(),
}));

const mockCharacters = Array.from({ length: 20 }, (_, index) => ({
  ...mockCharacter,
  name: `Character ${index + 1}`,
  url: `https://swapi.dev/api/people/${index + 1}/`,
}));

describe('SearchPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input and pagination controls', () => {
    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="/search/:page" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText(/type to search/i)).toBeInTheDocument();
    expect(screen.getByTestId('pagi-prev-btn')).toBeInTheDocument();
    expect(screen.getByTestId('pagi-next-btn')).toBeInTheDocument();
  });

  it('triggers search API call when searching', async () => {
    (getCharacters as vi.Mock).mockResolvedValue({
      results: mockCharacters,
      count: 20,
    });

    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="/search/:page" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText(/type to search/i);
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(searchInput, { target: { value: 'Luke' } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(getCharacters).toHaveBeenCalledWith('people', 'Luke');
    });
  });

  it('handles pagination correctly', async () => {
    (getCharacters as vi.Mock).mockResolvedValue({
      results: mockCharacters,
      count: 20,
    });

    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="/search/:page" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    const nextBtn = screen.getByTestId('pagi-next-btn');
    const prevBtn = screen.getByTestId('pagi-prev-btn');
    fireEvent.click(nextBtn);
    await waitFor(() => {
      expect(getCharacters).toHaveBeenCalled();
    });

    fireEvent.click(prevBtn);
    await waitFor(() => {
      expect(getCharacters).toHaveBeenCalledTimes(2);
    });
  });

  it('disables the Prev button on the first page', () => {
    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="/search/:page" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    const prevBtn = screen.getByTestId('pagi-prev-btn');
    expect(prevBtn).toBeDisabled();
  });

  it('shows loading spinner during API calls', async () => {
    (getCharacters as vi.Mock).mockImplementation(
      () =>
        new Promise((resolve) =>
          resolve({ results: mockCharacters, count: 20 })
        )
    );

    render(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="/search/:page" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('search_page')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
