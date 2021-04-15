/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import lightTheme from 'prism-react-renderer/themes/vsLight';
import darkTheme from 'prism-react-renderer/themes/palenight';
import Themes from 'constants/Themes';
import { ThemeContext } from './ThemeContext';

interface CodeBlockProps {
  children: {
    props: {
      children: string;
      className: string;
    };
  };
  className: string;
}

export const getTheme = (): Themes => {
  if (typeof window !== `undefined`) {
    return window.document.documentElement.classList.contains(Themes.DARK) ? Themes.DARK : Themes.LIGHT;
  }

  return Themes.LIGHT;
};

export default ({ children }: CodeBlockProps) => {
  const language: Language | string = children.props.className?.replace(/language-/, '') || '';
  const { theme } = useContext(ThemeContext);
  const themes = {
    [Themes.DARK]: darkTheme,
    [Themes.LIGHT]: lightTheme,
  };

  return (
    <Highlight
      Prism={defaultProps.Prism}
      theme={themes[theme ?? Themes.LIGHT]}
      code={children.props.children.trim()}
      language={language as Language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre key={theme} className={className} style={{ ...style }}>
          {tokens.map((line, index) => {
            const lineProps = getLineProps({ line, key: index });
            return (
              <div key={`item-${index}`} className={lineProps.className} style={lineProps.style}>
                {line.map((token, key) => {
                  const tokenProps = getTokenProps({ token, key });
                  return (
                    <span key={`line-${key}`} style={tokenProps.style} className={tokenProps.className}>
                      {tokenProps.children}
                    </span>
                  );
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};
