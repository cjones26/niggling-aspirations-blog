import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import LayoutSources from 'constants/LayoutSources';
import { Helmet } from 'react-helmet';
import CodeBlock from './CodeBlock';
import Layout from './Layout';
import ThemeContextProvider from './ThemeContext';
import UtterancesWrapper from './UtterancesWrapper';

export interface PostPageTemplateWithData {
  data: {
    mdx: {
      id: string;
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
      <Helmet>
        <title>{frontmatter.title}</title>
      </Helmet>
      <Layout
        layoutSource={LayoutSources.POST}
        postTitle={frontmatter.title}
        postDate={frontmatter.date.toLocaleUpperCase()}
      >
        <article>
          <hr className="my-3" />
          <MDXProvider components={components}>
            <MDXRenderer>{body}</MDXRenderer>
          </MDXProvider>
        </article>
        <section className="mt-8" aria-label="Comments">
          <UtterancesWrapper />
        </section>
      </Layout>
    </ThemeContextProvider>
  );
}
