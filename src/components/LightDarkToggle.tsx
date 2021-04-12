import React, { useEffect, useRef, ChangeEvent } from 'react';
import Themes from 'constants/Themes';

const ToggleMode = () => {
  const hasRenderedRef = useRef(false);
  const [theme, setTheme] = React.useState<Themes>();
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
    const initialTheme = window.document.documentElement.classList.contains(Themes.DARK) ? Themes.DARK : Themes.LIGHT;
    setTheme(initialTheme);
  }, []);

  // Don't render anything if we don't have a theme set in our context yet
  if (!hasRenderedRef.current) {
    return null;
  }

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
