/* eslint-disable react/no-array-index-key */
import React, { useLayoutEffect, useState } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/vsLight';
import darkTheme from 'prism-react-renderer/themes/palenight';

interface CodeBlockProps {
  children: {
    props: {
      children: string;
      className: string;
    };
  };
  className: string;
}

export default ({ children }: CodeBlockProps) => {
  // Pull the className
  const language: Language | string = children.props.className?.replace(/language-/, '') || '';
  const [isDarkMode, setIsDarkMode] = useState(false);

  useLayoutEffect(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  }, []);

  return (
    <Highlight
      Prism={defaultProps.Prism}
      theme={isDarkMode ? darkTheme : theme}
      code={children.props.children.trim()}
      language={language as Language}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style }}>
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
