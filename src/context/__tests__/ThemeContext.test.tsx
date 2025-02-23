import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider, ThemeContext } from '../ThemeContext';
import { useContext } from 'react';
const TestComponent = () => {
  const { toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <button onClick={() => toggleTheme('dark')}>Set Dark Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(Storage.prototype, 'setItem');
    document.body.className = '';
  });

  it('applies default light theme class to body', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(document.body.className).toBe('light');
  });

  it('changes body class when toggleTheme is called', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const button = screen.getByText(/Set Dark Theme/i);
    fireEvent.click(button);

    expect(document.body.className).toBe('dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark');
  });

  it('retrieves theme from localStorage on mount and applies class', () => {
    localStorage.setItem('theme', 'dark');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(document.body.className).toBe('dark');
  });
});
