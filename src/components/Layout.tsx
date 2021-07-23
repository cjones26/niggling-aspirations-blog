/* eslint-disable react/no-array-index-key */
import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import { FaEnvelope, FaGithub, FaLinkedin, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import Obfuscate from 'react-obfuscate';
import useSiteMetadata from 'hooks/useSiteMetadata';
import LayoutSources from 'constants/LayoutSources';
import LightDarkToggle from './LightDarkToggle';

export interface LayoutProps {
  children: React.ReactNode;
  layoutSource: LayoutSources;
  postTitle?: string;
  postDate?: string;
}

export default function Layout({ children, layoutSource, postTitle, postDate }: LayoutProps): JSX.Element {
  const { title, description } = useSiteMetadata();
  const generateAbout = (className?: string): JSX.Element => (
    <Link to="/about">
      <img src="/profile-image-small.jpg" alt="Charles Jones" className={className} width="48" />
    </Link>
  );
  const generateHeader = (): JSX.Element => {
    const defaultLayout = (
      <div>
        <div className="hidden lg:flex lg:fixed lg:top-1 lg:left-8 lg:my-0">{generateAbout('rounded-full')}</div>
        <div className="flex justify-between">
          <h1>{title}</h1>
          <div className="flex flex-shrink-0">
            <LightDarkToggle />
            {generateAbout('rounded-full my-0 self-start lg:hidden')}
          </div>
        </div>
        <h3 className="m-0">{description}</h3>
      </div>
    );

    switch (layoutSource) {
      case LayoutSources.INDEX:
        return defaultLayout;
      case LayoutSources.POST:
        return (
          <>
            <div className="flex justify-between mb-3">
              <Link className="all-articles" type="button" to="/">
                All Articles
              </Link>
              <Link className="text-4xl lg:hidden flex" type="button" to="/">
                <FaRegArrowAltCircleLeft />
              </Link>
              <div className="flex flex-shrink-0 lg:pr-0 lg:fixed lg:top-8 lg:right-8 lg:my-0;">
                <LightDarkToggle isPostOrAbout />
              </div>
            </div>
            <h1 className="text-center">{postTitle}</h1>
            <div className="flex justify-center">{generateAbout('rounded-full my-0')}</div>
            <p className="mb-0 text-center">{postDate}</p>
          </>
        );
      case LayoutSources.ABOUT:
        return (
          <div>
            <div className="flex justify-between mb-3">
              <Link className="all-articles" type="button" to="/">
                All Articles
              </Link>
              <Link className="text-4xl lg:hidden flex" type="button" to="/">
                <FaRegArrowAltCircleLeft />
              </Link>
              <div className="flex flex-shrink-0">
                <LightDarkToggle isPostOrAbout />
              </div>
            </div>
            <h1 className="text-center">{title}</h1>
          </div>
        );
      default:
        return defaultLayout;
    }
  };

  return (
    <div className="layout">
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
      <header role="banner">{generateHeader()}</header>
      <main className="main-content">{children}</main>
      <footer className="footer-content">
        <ul className="flex items-center my-0">
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
