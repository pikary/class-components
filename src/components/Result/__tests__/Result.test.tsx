import { render, screen, fireEvent } from '@testing-library/react';
import CharacterTable from '../index';
import { describe, it, expect, vi } from 'vitest';
import mockCharacters from '../__mocks__/result';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setupStore } from '../../../store'; // ✅ Import test store
import { toggleItem } from '../../../store/reducers/selectedCharacters'; // ✅ Import Redux action

// ✅ Mock useNavigate
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
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <CharacterTable characters={[]} count={0} />
        </MemoryRouter>
      </Provider>
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

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockCharacters.length + 1); // +1 for header row
  });

  it('navigates to character details when a row is clicked', () => {
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <CharacterTable characters={mockCharacters} count={2} />
        </MemoryRouter>
      </Provider>
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
    render(
      <Provider store={setupStore()}>
        <MemoryRouter>
          <CharacterTable characters={mockCharacters} count={2} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Total: 2')).toBeInTheDocument();
  });

  it('dispatches toggleItem when a checkbox is clicked', () => {
    const store = setupStore();
    store.dispatch = vi.fn(store.dispatch); // ✅ Spy on dispatch

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CharacterTable characters={mockCharacters} count={2} />
        </MemoryRouter>
      </Provider>
    );

    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBeGreaterThan(0);

    // ✅ Click the first checkbox
    fireEvent.click(checkboxes[0]);
    expect(store.dispatch).toHaveBeenCalledWith(toggleItem(mockCharacters[0]));

    // ✅ Click the second checkbox
    fireEvent.click(checkboxes[1]);
    expect(store.dispatch).toHaveBeenCalledWith(toggleItem(mockCharacters[1]));
  });
});
