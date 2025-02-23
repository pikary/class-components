import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../../context/ThemeContext';
import ThemeSelector from '../ThemeSelector';

describe('ThemeSelector Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(Storage.prototype, 'setItem');
    document.body.className = '';
  });
  it('renders radio buttons and selects the correct theme', () => {
    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );
    expect(screen.getByTestId('light_radio')).toBeChecked();
    expect(screen.getByTestId('dark_radio')).not.toBeChecked();
  });

  it('toggles the theme when radio buttons are clicked', () => {
    render(
      <ThemeProvider>
        <ThemeSelector />
      </ThemeProvider>
    );

    const darkThemeRadio = screen.getByTestId('dark_radio');
    fireEvent.click(darkThemeRadio);
    expect(darkThemeRadio).toBeChecked();
    expect(document.body.className).toBe('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');

    const lightThemeRadio = screen.getByTestId('light_radio');
    fireEvent.click(lightThemeRadio);
    expect(lightThemeRadio).toBeChecked();
    expect(document.body.className).toBe('light');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light');
  });
});
