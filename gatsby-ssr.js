/* eslint-disable react/jsx-filename-extension, react/no-danger */

const React = require('react');

exports.onRenderBody = ({ setHeadComponents, setBodyAttributes }) => {
  setBodyAttributes({
    className: 'bg-white dark:bg-midnight-express',
  });

  setHeadComponents([
    <script
      key="darkmode"
      dangerouslySetInnerHTML={{
        __html: `(function() {  
            function setTheme(theme) {
              window.theme = theme;

              if (theme === 'dark') {
                document.documentElement.classList.toggle('dark');
              }
            };

            window.__setPreferredTheme = function(theme) {
              setTheme(theme);
              try {
                localStorage.setItem('color-theme', theme);
              } catch (e) {}
            };

            let preferredTheme;

            try {
              preferredTheme = localStorage.getItem('color-theme');
            } catch (e) {}

            let darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
          })();`,
      }}
    />,
  ]);
};
