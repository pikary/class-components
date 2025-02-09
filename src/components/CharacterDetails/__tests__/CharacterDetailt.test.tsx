import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterDetails from '../index';
import { getCharacterByNumber } from '../../../api/baseApi';
import mockCharacter from '../__mocks__/details';

vi.mock('../../../api/baseApi', () => ({
  getCharacterByNumber: vi.fn(),
}));
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
    (getCharacterByNumber as vi.Mock).mockImplementation(
      () => new Promise(() => {})
    );

    render(
      <MemoryRouter initialEntries={['/search/1/details/1']}>
        <Routes>
          <Route path="/search/1/details/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
  it('calls handleClose when the close button is clicked', async () => {
    (getCharacterByNumber as vi.Mock).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/search/1/details/1']}>
        <Routes>
          <Route path="/search/1/details/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    });

    const closeButton = screen.getByTestId('close-btn');
    fireEvent.click(closeButton);

    // ✅ Check if useNavigate was called with '..'
    expect(mockedUseNavigate).toHaveBeenCalledWith('..', { replace: true });
  });

  it('renders character details after successful fetch', async () => {
    (getCharacterByNumber as vi.Mock).mockResolvedValue(mockCharacter);

    render(
      <MemoryRouter initialEntries={['/search/1/details/1']}>
        <Routes>
          <Route path="/search/1/details/:id" element={<CharacterDetails />} />
        </Routes>
      </MemoryRouter>
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
