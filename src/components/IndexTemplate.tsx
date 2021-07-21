import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/Layout';
import useSiteMetadata from 'hooks/useSiteMetadata';
import IndexPost from 'components/IndexPost';
import LightDarkToggle from 'components/LightDarkToggle';
import ThemeContextProvider from 'components/ThemeContext';

export interface Edge {
  node: {
    fields: {
      slug: string;
    };
    frontmatter: {
      title: string;
      date: string;
      tags: Array<string>;
    };
    excerpt: string;
  };
}

export interface HomePageProps {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
      };
    };
    allMdx: {
      edges: Array<Edge>;
    };
  };
  pageContext: {
    currentPage: number;
    limit: number;
    numPages: number;
    skip: number;
  };
}

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: $limit, skip: $skip) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM Do, YYYY")
            tags
          }
          excerpt(pruneLength: 250)
        }
      }
    }
  }
`;

export default function HomePage({ data, pageContext }: HomePageProps) {
  const { title, description } = useSiteMetadata();
  const posts = data.allMdx.edges;
  const generatePagination = () => {
    if (pageContext.currentPage === 1) {
      return (
        <a className="flex justify-center" href={`${pageContext.currentPage + 1}`}>
          Next page
        </a>
      );
    }

    if (pageContext.currentPage === pageContext.numPages) {
      return (
        <a className="flex justify-center" href={`/${pageContext.currentPage - 1}`}>
          Previous page
        </a>
      );
    }

    return (
      <div className="flex justify-between">
        {pageContext.currentPage > 1 ? (
          <a href={`/${pageContext.currentPage === 2 ? '' : pageContext.currentPage - 1}`}>Previous page</a>
        ) : null}
        {pageContext.currentPage < pageContext.numPages ? (
          <a href={`/${pageContext.currentPage + 1}`}>Next page</a>
        ) : null}
      </div>
    );
  };

  return (
    <ThemeContextProvider>
      <Layout>
        <header role="banner">
          <div>
            <div className="hidden lg:block lg:fixed lg:top-1 lg:left-8 lg:my-0">
              <img src="/profile-image.jpg" alt="Charles Jones" className="rounded-full" width="48" />
            </div>
            <div className="flex justify-between">
              <h1>{title}</h1>
              <LightDarkToggle />
            </div>
            <h3 className="m-0">{description}</h3>
          </div>
        </header>
        <div role="navigation" aria-label="Posts" className="mt-8">
          {posts.map(({ node }, index) => {
            const lastPost = index === posts.length - 1;

            return (
              <div key={node.fields.slug} className={lastPost ? 'mb-10' : ''}>
                <IndexPost post={node} />
                {lastPost ? null : <hr className="my-8" />}
              </div>
            );
          })}
          {generatePagination()}
        </div>
      </Layout>
    </ThemeContextProvider>
  );
}
<hr />;
