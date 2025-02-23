import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../../../store';
import mockCharacter from '../__mocks__/details';
import CharacterDetails from '../index';

vi.doMock('../../../store/apiSlice', async () => {
  const originalModule = await vi.importActual<
    typeof import('../../../store/apiSlice')
  >('../../../store/apiSlice');
  return {
    ...originalModule,
    useGetCharacterByNumberQuery: vi.fn(),
  };
});

const { useGetCharacterByNumberQuery } = await import(
  '../../../store/apiSlice'
);

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('CharacterDetails Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the spinner while loading', async () => {
    (useGetCharacterByNumberQuery as vi.Mock).mockReturnValue({
      data: undefined,
      isLoading: true,
      error: null,
    });

    render(
      <Provider store={setupStore()}>
        <MemoryRouter initialEntries={['/search/1/details/1']}>
          <Routes>
            <Route
              path="/search/1/details/:id"
              element={<CharacterDetails />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('calls handleClose when the close button is clicked', async () => {
    (useGetCharacterByNumberQuery as vi.Mock).mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={setupStore()}>
        <MemoryRouter initialEntries={['/search/1/details/1']}>
          <Routes>
            <Route
              path="/search/1/details/:id"
              element={<CharacterDetails />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    const closeButton = screen.getByTestId('close-btn');
    fireEvent.click(closeButton);

    // ✅ Check if useNavigate was called with ".."
    expect(mockedUseNavigate).toHaveBeenCalledWith('..', { replace: true });
  });

  it('renders character details after successful fetch', async () => {
    (useGetCharacterByNumberQuery as vi.Mock).mockReturnValue({
      data: mockCharacter,
      isLoading: false,
      error: null,
    });

    render(
      <Provider store={setupStore()}>
        <MemoryRouter initialEntries={['/search/1/details/1']}>
          <Routes>
            <Route
              path="/search/1/details/:id"
              element={<CharacterDetails />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    expect(screen.getByText(/Height:/i).closest('p')).toHaveTextContent(
      'Height: 172 cm'
    );
    expect(screen.getByText(/Mass:/i).closest('p')).toHaveTextContent(
      'Mass: 77 kg'
    );
    expect(screen.getByText(/Gender:/i).closest('p')).toHaveTextContent(
      'Gender: male'
    );
    expect(screen.getByText(/Birth Year:/i).closest('p')).toHaveTextContent(
      'Birth Year: 19BBY'
    );
  });
});
