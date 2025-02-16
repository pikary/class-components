import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const ThemeSelector = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-selector">
      <label>
        <input
          type="radio"
          value="light"
          checked={theme === 'light'}
          onChange={() => toggleTheme('light')}
        />
        Light Theme
      </label>
      <label>
        <input
          type="radio"
          value="dark"
          checked={theme === 'dark'}
          onChange={() => toggleTheme('dark')}
        />
        Dark Theme
      </label>
    </div>
  );
};

export default ThemeSelector;
