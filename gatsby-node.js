const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });
    const [month, day] = new Date(node.frontmatter.date)
      .toLocaleDateString('en-EN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        timeZone: 'UTC',
      })
      .split('/');
    const slug = value.replace('/posts/', '').replace(/\/$/, '');
    const url = `/posts/${month}/${day}${slug}`;

    createNodeField({
      name: `slug`,
      node,
      value: url,
    });
  }
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      query {
        allMdx {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Fetch posts from GraphQL
  const posts = result.data.allMdx.edges;

  // Create post index pages
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? '/' : `/${index + 1}`,
      component: path.resolve('./src/components/IndexTemplate.tsx'),
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        numPages,
        currentPage: index + 1,
      },
    });
  });

  // Create a page for each post
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/components/PostPageTempate.tsx'),
      context: { id: node.id },
    });
  });
};
