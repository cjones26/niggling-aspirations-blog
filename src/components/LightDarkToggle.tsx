import React, { useEffect, useContext, useRef, ChangeEvent } from 'react';
import Themes from 'constants/Themes';
import { ThemeContext } from './ThemeContext';

export interface ToggleModeProps {
  isPostOrAbout?: boolean;
}

const ToggleMode = ({ isPostOrAbout = false }: ToggleModeProps) => {
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
    <div className={`items-end theme-toggler ${isPostOrAbout ? '' : 'pr-5 lg:pr-0'}`}>
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
  isPostOrAbout: false,
};

export default ToggleMode;
