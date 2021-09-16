import React from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import { Disqus } from 'gatsby-plugin-disqus';
import useSiteMetadata from 'hooks/useSiteMetadata';
import LayoutSources from 'constants/LayoutSources';
import CodeBlock from './CodeBlock';
import Layout from './Layout';
import ThemeContextProvider from './ThemeContext';

export interface PostPageTemplateWithData {
  data: {
    mdx: {
      id: string;
      body: string;
      frontmatter: {
        title: string;
        date: string;
      };
      fields: {
        slug: string;
      };
    };
  };
}

export const query: void = graphql`
  query PostsByID($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
      }
      fields {
        slug
      }
    }
  }
`;

export const components = {
  pre: CodeBlock,
};

export default function PostPageTemplate({ data }: PostPageTemplateWithData) {
  const {
    id,
    frontmatter,
    body,
    fields: { slug },
  } = data.mdx;
  const { url } = useSiteMetadata();

  return (
    <ThemeContextProvider>
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
        <Disqus
          config={{
            url: `${url}${slug}`,
            identifier: id,
            title: frontmatter.title,
          }}
        />
      </Layout>
    </ThemeContextProvider>
  );
}
