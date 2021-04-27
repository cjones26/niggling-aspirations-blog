/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import Helmet from 'react-helmet';
import useSiteMetadata from 'hooks/useSiteMetadata';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  const { title, description } = useSiteMetadata();

  return (
    <div>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        {/* <meta property="og:image" content={metaImageUrl} /> */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <div className="main-content">{children}</div>
      <p className="text-center text-xsmall dark:text-white my-2">
        <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="noreferrer">
          ©{new Date().getFullYear()} Charles Jones - CC BY 4.0.
        </a>
      </p>
    </div>
  );
}
