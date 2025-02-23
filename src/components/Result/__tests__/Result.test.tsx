import { render, screen, fireEvent } from '@testing-library/react';
import CharacterTable from '../index';
import { describe, it, expect, vi } from 'vitest';
import mockCharacters from '../__mocks__/result';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../../../store';
import { renderWithProviders } from '../../../store/utils/test.utils';

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

describe('CharacterTable Component', () => {
  it('renders "No characters found" when the characters array is empty', () => {
    renderWithProviders(
      <MemoryRouter>
        <CharacterTable characters={[]} count={2} />
      </MemoryRouter>,
      {
        preloadedState: {
          selectedCharacters: { selectedCharacters: [] },
        },
      }
    );
    expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
  });

  it('renders the table with character data', () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <CharacterTable
            characters={mockCharacters}
            count={mockCharacters.length}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/name/i)).toBeInTheDocument();
    expect(screen.getByText(/height \(cm\)/i)).toBeInTheDocument();
    expect(screen.getByText(/mass \(kg\)/i)).toBeInTheDocument();
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument(); // Luke's height
    expect(screen.getByText('136')).toBeInTheDocument(); // Vader's mass
  });

  it('renders the correct number of table rows', () => {
    renderWithProviders(
      <MemoryRouter>
        <CharacterTable characters={mockCharacters} count={2} />
      </MemoryRouter>
    );

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockCharacters.length + 1); // +1 for header row
  });

  it('navigates to character details when a row is clicked', () => {
    renderWithProviders(
      <MemoryRouter>
        <CharacterTable characters={mockCharacters} count={2} />
      </MemoryRouter>
    );

    const lukeRow = screen.getByText('Luke Skywalker').closest('tr');
    const vaderRow = screen.getByText('Darth Vader').closest('tr');

    if (lukeRow && vaderRow) {
      fireEvent.click(lukeRow);
      expect(mockedUseNavigate).toHaveBeenCalledWith('details/1');

      fireEvent.click(vaderRow);
      expect(mockedUseNavigate).toHaveBeenCalledWith('details/4');
    }
  });

  it('renders the total count correctly', () => {
    renderWithProviders(
      <MemoryRouter>
        <CharacterTable characters={mockCharacters} count={2} />
      </MemoryRouter>
    );

    expect(screen.getByText('Total: 2')).toBeInTheDocument();
  });
});
