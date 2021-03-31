import React from 'react';
import { graphql, Link } from 'gatsby';

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
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, filter: { frontmatter: { published: { eq: true } } }) {
      nodes {
        id
        excerpt(pruneLength: 250)
        frontmatter {
          title
          date
        }
        fields {
          slug
        }
      }
    }
  }
`;

export default function HomePage({ data }: HomePagePropsWithData) {
  return (
    <>
      <div>
        <h1>{data.site.siteMetadata.title}</h1>
        <p>{data.site.siteMetadata.description}</p>
      </div>
      <div>
        {data.allMdx.nodes.map((node: Node) => (
          <React.Fragment key={node.id}>
            <Link to={node.fields.slug}>
              <h1>{node.frontmatter.title}</h1>
            </Link>
            <p>{node.frontmatter.date}</p>
            <p>{node.excerpt}</p>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
