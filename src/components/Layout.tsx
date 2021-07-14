/* eslint-disable react/no-array-index-key */
import React from 'react';
import Helmet from 'react-helmet';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';
import Obfuscate from 'react-obfuscate';
import useSiteMetadata from 'hooks/useSiteMetadata';

export interface LayoutProps {
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
      <main className="main-content">{children}</main>
      <footer className="footer-content">
        <ul className="flex items-center">
          <li className="p-4">
            <Obfuscate className="sm-email" email="charlie.l.jones@gmail.com" aria-label="Email Me">
              <FaEnvelope />
            </Obfuscate>
          </li>
          <li className="p-4">
            <a
              className="sm-github"
              href="https://www.github.com/cjones26"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </li>
          <li className="p-4">
            <a
              className="sm-linkedin"
              href="https://www.linkedin.com/in/charlesljones"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </li>
        </ul>
        <p className="p-4">
          <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
            ©{new Date().getFullYear()} Charles Jones - CC BY 4.0.
          </a>
        </p>
      </footer>
    </div>
  );
}
