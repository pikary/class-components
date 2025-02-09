import { render, screen } from '@testing-library/react';
import CharacterTable from '../index';
import { describe, it, expect } from 'vitest';
import mockCharacters from '../__mocks__/result';
import { MemoryRouter } from 'react-router-dom';

describe('CharacterTable Component', () => {
  it('renders "No characters found" when the characters array is empty', () => {
    render(
      <MemoryRouter>
        {' '}
        <CharacterTable characters={[]} count={0} />{' '}
      </MemoryRouter>
    );
    expect(screen.getByText(/no characters found/i)).toBeInTheDocument();
  });

  it('renders the table with character data', () => {
    render(
      <MemoryRouter>
        <CharacterTable
          characters={mockCharacters}
          count={mockCharacters.length}
        />
      </MemoryRouter>
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
      <MemoryRouter>
        <CharacterTable
          characters={mockCharacters}
          count={mockCharacters.length}
        />
      </MemoryRouter>
    );
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(mockCharacters.length + 1); // +1 for the header row
  });
});
