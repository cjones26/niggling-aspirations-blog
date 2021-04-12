import React, { useState } from 'react';
import Themes from 'constants/Themes';

declare global {
  interface Window {
    theme: string;
  }
}

const getTheme = () => {
  if (typeof window !== `undefined`) {
    return window.theme === Themes.DARK ? Themes.DARK : Themes.LIGHT;
  }

  return Themes.LIGHT;
};

const ToggleMode = () => {
  const [theme, setTheme] = useState(getTheme());
  const handleToggle = () => {
    const isDark = getTheme() === Themes.DARK;

    document.documentElement.classList.toggle('dark');
    setTheme(isDark ? Themes.LIGHT : Themes.DARK);
  };

  return (
    <div className="theme-toggler">
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

export default ToggleMode;
