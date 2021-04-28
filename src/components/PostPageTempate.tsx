import React from 'react';
import { graphql, Link } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import CodeBlock from './CodeBlock';
import Layout from './Layout';
import LightDarkToggle from './LightDarkToggle';
import ThemeContextProvider from './ThemeContext';

export interface PostPageTemplateWithData {
  data: {
    mdx: {
      body: string;
      frontmatter: {
        title: string;
        date: string;
      };
    };
  };
}

export const query: void = graphql`
  query PostsByID($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
    }
  }
`;

export const components = {
  pre: CodeBlock,
};

export default function PostPageTemplate({ data }: PostPageTemplateWithData) {
  const { frontmatter, body } = data.mdx;

  return (
    <ThemeContextProvider>
      <Layout>
        <div className="flex">
          <Link className="all-articles" to="/">
            All Articles
          </Link>
          <LightDarkToggle />
        </div>
        <article>
          <header>
            <h1 className="text-center">{frontmatter.title}</h1>
            <p className="published">{frontmatter.date.toLocaleUpperCase()}</p>
          </header>
          <hr className="post-header-divider" />
          <MDXProvider components={components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </article>
      </Layout>
    </ThemeContextProvider>
  );
}
