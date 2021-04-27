import React from 'react';
import { graphql, Link } from 'gatsby';
import useSiteMetadata from 'hooks/useSiteMetadata';
import Layout from 'components/Layout';

export interface Node {
  id: string;
  excerpt: string;
  frontmatter: {
    title: string;
    date: string;
  };
  fields: {
    slug: string;
  };
}

export interface HomePagePropsWithData {
  data: {
    site: {
      siteMetadata: {
        title: string;
        description: string;
      };
    };
    allMdx: {
      nodes: Array<Node>;
    };
  };
}

export const query: void = graphql`
  query HomePageQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { published: { eq: true } } }) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date(formatString: "MMMM Do, YYYY")
        }
        fields {
          slug
        }
      }
    }
  }
`;

export default function HomePage({ data }: HomePagePropsWithData) {
  const { title, description } = useSiteMetadata();

  return (
    <Layout>
      <header role="banner">
        <h1>{title}</h1>
        <h2>{description}</h2>
      </header>
      <div>
        {data.allMdx.nodes.map((node: Node) => (
          <React.Fragment key={node.id}>
            <Link to={node.fields.slug}>
              <h3>{node.frontmatter.title}</h3>
            </Link>
            <p>{node.frontmatter.date}</p>
            <p>{node.excerpt}</p>
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
}
