import React, { useEffect, useContext, useRef, ChangeEvent } from 'react';
import Themes from 'constants/Themes';
import { ThemeContext } from './ThemeContext';

export interface ToggleModeProps {
  isPost?: boolean;
}

const ToggleMode = ({ isPost = false }: ToggleModeProps) => {
  const hasRenderedRef = useRef(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    const newTheme: Themes = event.target.checked ? Themes.LIGHT : Themes.DARK;

    // Update React theme state
    setTheme(newTheme);

    // Update localStorage
    localStorage.setItem('theme', String(newTheme));

    // Update our classList
    window.document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    hasRenderedRef.current = true;
  });

  // Don't render anything if we don't have a theme set in our context yet
  if (!hasRenderedRef.current) {
    return null;
  }

  return (
    <div className={`theme-toggler ${isPost ? 'theme-toggler-post' : 'theme-toggler-index'}`}>
      <label htmlFor="toggle" className="title invisible h-0 absolute">
        Toggle dark mode
      </label>
      <input
        id="toggle"
        className="toggle ml-5"
        type="checkbox"
        checked={theme !== Themes.DARK}
        onChange={handleToggle}
      />
    </div>
  );
};

ToggleMode.defaultProps = {
  isPost: false,
};

export default ToggleMode;
