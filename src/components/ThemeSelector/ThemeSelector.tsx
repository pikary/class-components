import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './styles.scss';
const ThemeSelector = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="theme-selector">
      <label>
        <input
          data-testid="light_radio"
          type="radio"
          value="light"
          checked={theme === 'light'}
          onChange={() => toggleTheme('light')}
        />
        Light Theme
      </label>
      <label>
        <input
          data-testid="dark_radio"
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
