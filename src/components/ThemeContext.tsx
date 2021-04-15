import React, { createContext, useEffect } from 'react';
import Theme from 'constants/Themes';

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface Context {
  theme?: Theme;
  setTheme: (newValue?: Theme) => void | never;
}

export const ThemeContext = createContext<Context>({
  theme: undefined,
  setTheme: () => {
    throw new Error('setContext function must be overridden');
  },
});

export default function ThemeContextProvider({ children }: ThemeProviderProps): JSX.Element {
  const [theme, rawSetTheme] = React.useState<Theme | undefined>();
  const setTheme = (newValue?: Theme) => {
    // Update React color-mode state
    rawSetTheme(newValue);
  };

  useEffect(() => {
    const initialTheme = window.document.documentElement.classList.contains(Theme.DARK) ? Theme.DARK : Theme.LIGHT;
    rawSetTheme(initialTheme);
  });

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
