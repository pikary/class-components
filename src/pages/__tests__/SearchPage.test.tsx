import { screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach, Mock } from 'vitest';
import SearchPage from '../SearchPage';

import mockCharacter from '../../components/CharacterDetails/__mocks__/details';
import { renderWithProviders } from '../../store/utils/test.utils';

vi.mock('../../store/apiSlice', async () => {
  const actual = await vi.importActual<typeof import('../../store/apiSlice')>(
    '../../store/apiSlice'
  );
  return {
    ...actual,
    useGetCharactersQuery: vi.fn(() => ({
      data: { results: mockCharacters, count: 20 },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    })),
  };
});

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...actual,
    useNavigate: () => mockedUseNavigate,
  };
});

const mockCharacters = Array.from({ length: 20 }, (_, index) => ({
  ...mockCharacter,
  name: `Character ${index + 1}`,
  url: `https://swapi.dev/api/people/${index + 1}/`,
}));

describe('SearchPage Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders search input, theme selector, and pagination controls', () => {
    renderWithProviders(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="/search/:page" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('search_page')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/type to search/i)).toBeInTheDocument();
    expect(screen.getByTestId('pagi-prev-btn')).toBeInTheDocument();
    expect(screen.getByTestId('pagi-next-btn')).toBeInTheDocument();
  });

  it('triggers search API call when searching', async () => {
    const { useGetCharactersQuery } = await import('../../store/apiSlice');
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: { results: mockCharacters, count: 20 },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithProviders(
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
      expect(useGetCharactersQuery).toHaveBeenCalledWith(
        expect.objectContaining({ query: 'Luke' })
      );
    });
    await waitFor(() => {
      const character = screen.getByTestId('character_Character 1');
      expect(character).toBeInTheDocument();
    });
    expect(mockedUseNavigate).toHaveBeenCalledWith('/search/1');
  });

  it('handles pagination correctly', async () => {
    const { useGetCharactersQuery } = await import('../../store/apiSlice');
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: { results: mockCharacters, count: 20 },
      isLoading: false,
      error: null,
      refetch: vi.fn(),
    });

    renderWithProviders(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="/search/:page" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    const nextBtn = screen.getByTestId('pagi-next-btn');
    const prevBtn = screen.getByTestId('pagi-prev-btn');

    fireEvent.click(nextBtn);
    expect(mockedUseNavigate).toHaveBeenCalledWith('/search/2');

    fireEvent.click(prevBtn);
    expect(mockedUseNavigate).toHaveBeenCalledWith('/search/2');
  });

  it('disables the Prev button on the first page', () => {
    renderWithProviders(
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
    const { useGetCharactersQuery } = await import('../../store/apiSlice');
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
      refetch: vi.fn(),
    });

    renderWithProviders(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="/search/:page" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders error message when API fails', async () => {
    const { useGetCharactersQuery } = await import('../../store/apiSlice');
    (useGetCharactersQuery as Mock).mockReturnValue({
      data: undefined,
      isLoading: false,
      error: 'API Error',
      refetch: vi.fn(),
    });
    renderWithProviders(
      <MemoryRouter initialEntries={['/search/1']}>
        <Routes>
          <Route path="/search/:page" element={<SearchPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByText(/error fetching characters/i)
    ).toBeInTheDocument();
  });
});
