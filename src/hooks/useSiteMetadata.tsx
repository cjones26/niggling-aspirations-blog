import { graphql, useStaticQuery } from 'gatsby';

export interface SiteMetadata {
  site: {
    siteMetadata: {
      title: string;
      description: string;
    };
  };
}

export default () => {
  const { site }: SiteMetadata = useStaticQuery(graphql`
    query SiteMetaData {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  return site.siteMetadata;
};
