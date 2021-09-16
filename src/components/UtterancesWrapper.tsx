import React, { createRef, useContext, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';

export interface UtterancesWrapperProps {
  url: string;
  identifier: string;
  title: string;
}

const UtterancesWrapper = () => {
  const { theme } = useContext(ThemeContext);
  const commentBox = createRef<HTMLDivElement>();

  useEffect(() => {
    if (theme && commentBox) {
      const themeString = theme === 'dark' ? 'dark-blue' : 'github-light';

      if (!commentBox.current?.children.length) {
        const utterancesScriptElement = document.createElement('script');
        utterancesScriptElement.setAttribute('src', 'https://utteranc.es/client.js');
        utterancesScriptElement.setAttribute('crossorigin', 'anonymous');
        utterancesScriptElement.setAttribute('async', 'true');
        utterancesScriptElement.setAttribute('repo', 'cjones26/niggling-aspirations-blog-comments');
        utterancesScriptElement.setAttribute('issue-term', 'title');
        utterancesScriptElement.setAttribute('theme', themeString);
        commentBox.current?.appendChild(utterancesScriptElement);
      } else {
        const iframe = document.querySelector<HTMLIFrameElement>('.utterances-frame');

        if (!iframe) {
          return;
        }

        iframe?.contentWindow?.postMessage({ type: 'set-theme', theme: themeString }, 'https://utteranc.es/');
      }
    }
  }, [theme]);

  return <div className="utterances-comment-box" ref={commentBox} />;
};

export default UtterancesWrapper;
