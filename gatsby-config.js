const path = require('path');

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `Niggling Aspirations`,
    description: `Hopefully a headache helper.`,
    url: 'https://nigglingaspirations.com',
  },
  plugins: [
    'gatsby-plugin-typescript',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        components: path.join(__dirname, 'src/components'),
        constants: path.join(__dirname, 'src/constants'),
        hooks: path.join(__dirname, 'src/hooks'),
        pages: path.join(__dirname, 'src/pages'),
        posts: path.join(__dirname, 'src/posts'),
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-plugin-image',
    'gatsby-remark-images',
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts`,
      },
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `nigglingaspirations`,
      },
    },
    'gatsby-plugin-webpack-bundle-analyser-v2',
  ],
};
