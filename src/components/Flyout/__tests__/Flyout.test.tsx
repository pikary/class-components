import { describe, it, expect, vi } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import { saveAs } from 'file-saver';
import { renderWithProviders } from '../../../store/utils/test.utils';
import Flyout from '../index';

vi.mock('file-saver', () => ({
  saveAs: vi.fn(),
}));

const preloadedState = {
  selectedCharacters: {
    selectedCharacters: [
      {
        name: 'Luke Skywalker',
        height: '172',
        mass: '77',
        gender: 'male',
        birth_year: '19BBY',
        eye_color: 'blue',
        url: 'https://swapi.dev/api/people/1/',
      },
    ],
  },
};

describe('Flyout Component', () => {
  it('renders correctly when there are selected characters', () => {
    renderWithProviders(<Flyout />, { preloadedState });
    expect(screen.getByText(/1 items are selected/i)).toBeInTheDocument();
    expect(screen.getByText(/unselect all/i)).toBeInTheDocument();
    expect(screen.getByText(/download/i)).toBeInTheDocument();
  });

  it('does not render when there are no selected characters', () => {
    renderWithProviders(<Flyout />, {
      preloadedState: { selectedCharacters: { selectedCharacters: [] } },
    });
    expect(screen.queryByText(/items are selected/i)).not.toBeInTheDocument();
  });

  it('calls saveAs when Download button is clicked', () => {
    renderWithProviders(<Flyout />, { preloadedState });
    const button = screen.getByText(/download/i);
    fireEvent.click(button);
    expect(saveAs).toHaveBeenCalled();
  });
});
