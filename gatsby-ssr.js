/* eslint-disable react/jsx-filename-extension, react/no-danger */

const React = require('react');

exports.onRenderBody = ({ setHeadComponents, setBodyAttributes }) => {
  setBodyAttributes({
    className: 'bg-white dark:bg-midnight-express',
  });

  setHeadComponents([
    <script
      key="theme"
      dangerouslySetInnerHTML={{
        __html: `(function() {  
            function setTheme(theme) {
              window.theme = theme;

              if (theme === 'dark') {
                document.documentElement.classList.toggle('dark');
              }
            };

            let preferredTheme;

            try {
              preferredTheme = localStorage.getItem('theme');
            } catch (e) {}

            let darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
          })();`,
      }}
    />,
  ]);
};
