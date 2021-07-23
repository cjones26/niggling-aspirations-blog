import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from 'components/Layout';
import ThemeContextProvider from 'components/ThemeContext';
import LayoutSources from 'constants/LayoutSources';

export default function About() {
  return (
    <ThemeContextProvider>
      <Layout layoutSource={LayoutSources.ABOUT}>
        <article>
          <StaticImage
            className="about-image rounded-3xl"
            src="../../static/profile-image-large.jpg"
            alt="Charles Jones"
          />
          <p>
            Hello, my name is Charles Jones and I am a software engineer who currently resides in Charlotte, North
            Carolina.
          </p>
          <p>
            My fascination with computers began all the way back in 1994, when my father brought home a 486DX running
            MS-DOS 6.0. I began working with HTML in the late &lsquo;90s, tinkering away in Notepad before publishing to
            GeoCities and Tripod.
          </p>
          <p>
            Shortly thereafter, my interests moved toward desktop applications and I began developing in VB6 before my
            introduction to C# and the .NET world (thanks <a href="https://www.runuo.com">RunUO</a>). After working for
            a Managed Services provider from 2008 to 2013, I finally embraced my passion for development and began a
            full-time career in the field, specifically the JavaScript / Node.js ecosystem.
          </p>
          <p>I currently work for a Fortune 500 company as a Senior Software Engineer.</p>
        </article>
      </Layout>
    </ThemeContextProvider>
  );
}
